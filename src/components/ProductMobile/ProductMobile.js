import React from "react"
import { useHistory } from "react-router-dom"
import { Card } from "react-bootstrap"
import { PRODUCT_DESCRIPTION } from "../../constants/constants"
import LightingDealWaterMark from "../LightingDealWaterMark/LightingDealWaterMark"
import LightingDealDuration from "../LightingDealDuration/LightingDealDuration"
import { getIsDeal } from "../../utils/DealUtils"
import { getIsLightingDeal } from "../../utils/LightingDealUtils"
import ProgressiveBlurryImageLoad from "../ProgressiveBlurryImageLoad.js/ProgressiveBlurryImageLoad"

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
  lightingDealStartTime,
  lightingDealDuration,
  screenWidth,
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
      {isLightingDeal && <LightingDealWaterMark />}
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
              textDecoration: isDeal ? "line-through" : "none",
              color: isDeal ? "lightgray" : "inherit",
              marginBottom: isDeal ? "0" : "",
            }}
          >
            R$ {price}
          </Card.Text>
          {isDeal && (
            <Card.Text className="notranslate">&nbsp;R$ {dealPrice}</Card.Text>
          )}
        </div>
        <LightingDealDuration
          isProductDescription={false}
          lightingDealDuration={lightingDealDuration}
          lightingDealStartTime={lightingDealStartTime}
        />
      </Card.Body>
    </Card>
  )
}
