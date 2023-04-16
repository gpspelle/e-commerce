import React from "react"
import { useHistory } from "react-router-dom"
import { Card } from "react-bootstrap"

import { PRODUCT_DESCRIPTION } from "../../constants/constants"
import LightningDealWaterMark from "../DealWaterMark/LightningDealWaterMark"
import LightningDealDuration from "../LightningDealDuration/LightningDealDuration"
import { getIsDeal } from "../../utils/DealUtils"
import { getIsLightningDeal } from "../../utils/LightningDealUtils"
import ProgressiveBlurryImageLoad from "../../basicBlocks/ProgressiveBlurryImageLoad"

// this is not used for now, waiting for the designer's work
export default function ProductMobile({
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
  screenWidth,
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
        isDeal: isDeal || isLightningDeal,
        dealPrice,
        lightningDealStartTime,
        lightningDealDuration,
        productOwnerId,
      },
    })
  }

  var productImageSize

  if (screenWidth > 512) {
    productImageSize = "20rem"
  } else if (screenWidth > 374) {
    productImageSize = "10rem"
  } else {
    productImageSize = "9rem"
  }

  return (
    <Card
      style={{
        width: productImageSize + "!important",
        cursor: "pointer",
      }}
      onClick={openDetailPage}
    >
      <ProgressiveBlurryImageLoad
        width={productImageSize}
        height={productImageSize}
        large={images[0]}
        largeFallback="/not-found.png"
      />
      {isLightningDeal && <LightningDealWaterMark />}
      <Card.Body
        style={{
          paddingTop: "0.2rem",
          paddingBottom: "0.2rem",
          paddingRight: "0.2rem",
          paddingLeft: "0.2rem",
        }}
      >
        <Card.Text
          style={{ fontSize: "12px", margin: "0px" }}
          className="notranslate"
        >
          {name}
        </Card.Text>
        <Card.Text
          style={{ fontSize: "12px", margin: "0px" }}
          className="notranslate"
        >
          {`Vendido por ${commercialName}`}
        </Card.Text>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            paddingBottom: "0.2rem",
          }}
        >
          <Card.Text
            className="notranslate"
            style={{
              textDecoration: isDeal || isLightningDeal ? "line-through" : "none",
              color: isDeal || isLightningDeal ? "lightgray" : "inherit",
              marginBottom: isDeal || isLightningDeal ? "0px" : "",
            }}
          >
            R$ {price}
          </Card.Text>
          {(isDeal || isLightningDeal) && (
            <Card.Text className="notranslate">&nbsp;R$ {dealPrice}</Card.Text>
          )}
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
