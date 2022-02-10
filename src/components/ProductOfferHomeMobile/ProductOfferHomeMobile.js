import React from "react"
import { useHistory } from "react-router-dom"
import { Card, Row, Col } from "react-bootstrap"

import { PRODUCT_DESCRIPTION } from "../../constants/constants"
import LightingDealWaterMark from "../LightingDealWaterMark/LightingDealWaterMark"
import { getIsDeal } from "../../utils/DealUtils"
import { getIsLightingDeal } from "../../utils/LightingDealUtils"
import ProgressiveBlurryImageLoad from "../ProgressiveBlurryImageLoad/ProgressiveBlurryImageLoad"

export default function ProductOfferHomeMobile({
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
  lightingDealStartTime,
  lightingDealDuration,
  productStock,
  productImageSize,
  productCardSize,
}) {
  const history = useHistory()
  const isDeal = getIsDeal(productType)
  const isLightingDeal = getIsLightingDeal(productType)

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
        lightingDealStartTime,
        lightingDealDuration,
        productOwnerId,
        productStock,
      },
    })
  }

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
          style={{ marginLeft: "0.5px" }}
          width={productImageSize}
          height={productImageSize}
          small={`data:image/jpeg;base64,${coverImage}`}
          large={images[0]}
        />
      ) : (
        <img
          style={{
            marginLeft: "0.5px",
            width: productImageSize,
            height: productImageSize,
            objectFit: "contain",
            backgroundColor: "#F4F4F4",
          }}
          src={images[0]}
        />
      )}
      {isLightingDeal && <LightingDealWaterMark />}
      <Card.Body>
        <Row>
          <Col style={{ display: "flex" }}>
            <Card.Title
              className="notranslate"
              style={{
                fontSize: "15px",
                textDecoration: "line-through",
                color: "lightgray",
              }}
            >
              R$ {price}
            </Card.Title>
            <Card.Title
              style={{
                fontSize: "15px",
              }}
              className="notranslate"
            >
              &nbsp;R$ {dealPrice}
            </Card.Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Text
              style={{
                fontSize: "15px",
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
      </Card.Body>
    </Card>
  )
}
