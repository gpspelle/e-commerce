import React from "react"
import { useHistory } from "react-router-dom"
import { Card, Row, Col } from "react-bootstrap"

import { PRODUCT_DESCRIPTION } from "../../constants/constants"
import LightningDealWaterMark from "../LightningDeal/LightningDealWaterMark"
import LightningDealDuration from "../LightningDeal/LightningDealDuration"
import { getIsLightningDeal } from "../../utils/lightningDealUtils"
import { getIsDeal } from "../../utils/dealUtils"
import ProgressiveBlurryImageLoad from "../ProgressiveBlurryImageLoad/ProgressiveBlurryImageLoad"

export default function Product({
  productEntity,
  phoneNumber,
  commercialName,
  productImageSize,
  productCardSize,
  isProductOfferHome,
}) {
  const history = useHistory()

  const {
    id,
    name,
    price,
    images,
    productType,
    dealPrice,
    lightningDealStartTime,
    lightningDealDuration,
    coverImage,
  } = productEntity

  const isDeal = getIsDeal(productType)
  const isLightningDeal = getIsLightningDeal(productType)

  const openDetailPage = (event) => {
    if (event.target.type === "button") return
    history.push({
      pathname: `/${id}/${PRODUCT_DESCRIPTION}`,
      state: { ...productEntity, phoneNumber, commercialName },
    })
  }

  return (
    <Card
      style={{
        maxWidth: productCardSize,
        cursor: "pointer",
        border: "1px solid #AFC1D3",
        boxSizing: "border-box",
        borderRadius: "0px",
      }}
      onClick={openDetailPage}
    >
      {coverImage ? (
        <ProgressiveBlurryImageLoad
          width={productImageSize}
          height={productImageSize}
          small={`data:image/jpeg;base64,${coverImage}`}
          large={images[0]}
        />
      ) : (
        <img
          className="light-dark-background"
          style={{
            width: productImageSize,
            height: productImageSize,
            objectFit: "contain",
          }}
          src={images[0]}
        />
      )}
      {isLightningDeal && <LightningDealWaterMark />}
      <Card.Body style={{ paddingTop: "8px" }}>
        <div>
          <Row>
            <Col style={{ display: "flex" }}>
              {isDeal ? (
                <div className="notranslate" style={{ display: "flex" }}>
                  <small
                    className={
                      lightningDealDuration && lightningDealStartTime
                        ? "helper-error-color"
                        : "helper-warning-color"
                    }
                    style={{
                      textDecoration: "line-through",
                      lineHeight: "30px",
                    }}
                  >
                    R$ {price}
                  </small>
                  <h5 style={{ marginBottom: "4px" }}>
                    &nbsp;&nbsp;&nbsp;R$ {dealPrice}
                  </h5>
                </div>
              ) : (
                <h5 style={{ marginTop: "16px", marginBottom: "4px" }}>
                  R$ {price}
                </h5>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <p
                style={{
                  overflowX: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginBottom: "4.39px",
                }}
                className="notranslate"
              >
                {name}
              </p>
            </Col>
          </Row>
          <Row>
            <small
              style={{
                fontSize: "12px",
                overflowX: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                marginBottom: "4px",
              }}
              className="notranslate"
            >
              {`Vendido por ${commercialName ? commercialName : "..."}`}
            </small>
          </Row>
        </div>
        <LightningDealDuration
          isProductDescription={false}
          lightningDealDuration={lightningDealDuration}
          lightningDealStartTime={lightningDealStartTime}
        />
      </Card.Body>
    </Card>
  )
}
