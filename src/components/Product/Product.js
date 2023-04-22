import React from "react"
import { useHistory } from "react-router-dom"
import { Card, Row, Col } from "react-bootstrap"

import { PRODUCT_DESCRIPTION } from "../../constants/constants"
import LightningDealWaterMark from "../Deals/WaterMarks/LightningDealWaterMark"
import LightningDealDuration from "../Deals/LightningDealDuration"
import { getIsLightningDeal } from "../../utils/lightningDealUtils"
import { getIsDeal } from "../../utils/dealUtils"
import DealWaterMark from "../Deals/WaterMarks/DealWaterMark"
import Image from "../Image/Image"

function Product({
  productEntity,
  phoneNumber,
  commercialName,
  productImageSize,
  productCardSize,
  isRelatedProduct,
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
      <Image
        src={images[0]}
        fallbackSrc="/not-found.png"
        style={{
          width: productImageSize,
          height: productImageSize,
          filter: "none",
          objectFit: "contain",
        }}
        alt=""
        className="light-dark-background"
        key={images[0] + productImageSize}
      />
      {isLightningDeal && <LightningDealWaterMark />}
      {isDeal && (
        <DealWaterMark dealOffPercentage={(100 * (1 - dealPrice / price)) >> 0} />
      )}
      <Card.Body
        className="light-background"
        style={{ paddingTop: "0px", paddingBottom: "0px" }}
      >
        <div>
          <Row>
            <Col style={{ display: "flex" }}>
              {isDeal || isLightningDeal ? (
                <div className="notranslate" style={{ display: "block" }}>
                  <small
                    className={
                      isLightningDeal ? "helper-error-color" : "helper-warning-color"
                    }
                    style={{
                      fontSize: "11px",
                      textDecoration: "line-through",
                      lineHeight: "16px",
                    }}
                  >
                    R$ {price}
                  </small>
                  <h5 style={{ marginBottom: "4px" }}>R$ {dealPrice}</h5>
                </div>
              ) : (
                <h5 style={{ marginTop: "24px", marginBottom: "4px" }}>
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
                  marginBottom: isRelatedProduct ? "7.86px" : "4.39px",
                }}
                className="notranslate"
              >
                {name}
              </p>
            </Col>
          </Row>
          {!isRelatedProduct && (
            <Row>
              <small
                style={{
                  fontSize: "12px",
                  overflowX: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginBottom: isLightningDeal ? "4px" : "22.7px",
                }}
                className="notranslate"
              >
                {`Vendido por ${commercialName ? commercialName : "..."}`}
              </small>
            </Row>
          )}
        </div>
        {!isRelatedProduct && isLightningDeal && (
          <LightningDealDuration
            isProductDescription={false}
            lightningDealDuration={lightningDealDuration}
            lightningDealStartTime={lightningDealStartTime}
          />
        )}
      </Card.Body>
    </Card>
  )
}

export default Product
