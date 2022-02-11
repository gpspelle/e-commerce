import React from "react"
import { useHistory } from "react-router-dom"
import { Card, Row, Col } from "react-bootstrap"

import { PRODUCT_DESCRIPTION } from "../../constants/constants"
import LightningDealWaterMark from "../LightningDeal/LightningDealWaterMark"
import LightningDealDuration from "../LightningDeal/LightningDealDuration"
import { getIsDeal } from "../../utils/dealUtils"
import { getIsLightningDeal } from "../../utils/lightningDealUtils"
import ProgressiveBlurryImageLoad from "../ProgressiveBlurryImageLoad/ProgressiveBlurryImageLoad"

export default function Product({
  id,
  name,
  description,
  price,
  images,
  productImagesResized,
  coverImage,
  phoneNumber,
  tags,
  productOwnerId,
  commercialName,
  productType,
  dealPrice,
  lightningDealStartTime,
  lightningDealDuration,
  productStock,
  productSellTypes,
}) {
  const history = useHistory()
  const isDeal = getIsDeal(productType)
  const isLightningDeal = getIsLightningDeal(productType)

  const openDetailPage = (event) => {
    if (event.target.type === "button") return
    history.push({
      pathname: `/${id}/${PRODUCT_DESCRIPTION}`,
      state: {
        id,
        name,
        description,
        price,
        images,
        productImagesResized,
        phoneNumber,
        tags,
        commercialName,
        productType,
        isDeal,
        dealPrice,
        lightningDealStartTime,
        lightningDealDuration,
        productOwnerId,
        productStock,
        productSellTypes,
      },
    })
  }

  var productImageSize = "258px"
  var productCardSize = "260px"
  return (
    <Card
      style={{
        maxWidth: productCardSize,
        cursor: "pointer",
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
          style={{
            width: productImageSize,
            height: productImageSize,
            objectFit: "contain",
            backgroundColor: "#F4F4F4",
          }}
          src={images[0]}
        />
      )}
      {isLightningDeal && <LightningDealWaterMark />}
      <Card.Body>
        <div>
          <Row>
            <Col style={{ display: "flex" }}>
              <Card.Title
                className="notranslate"
                style={{
                  textDecoration: isDeal ? "line-through" : "none",
                  color: isDeal ? "lightgray" : "inherit",
                  marginBottom: "0",
                }}
              >
                R$ {price}
              </Card.Title>
              {isDeal && (
                <Card.Title className="notranslate">&nbsp;R$ {dealPrice}</Card.Title>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text
                style={{
                  fontSize: "15px",
                  marginBottom: "0.25rem",
                  overflowX: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="notranslate"
              >
                {name}
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Card.Text
              style={{
                fontSize: "12px",
                overflowX: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              className="notranslate"
            >
              {`Vendido por ${commercialName ? commercialName : "..."}`}
            </Card.Text>
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
