import React from "react"
import { useHistory } from "react-router-dom"
import { Card } from "react-bootstrap"
import SendMessageWhatsAppButton from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import { PRODUCT_DESCRIPTION } from "../../constants/constants"
import LightingDealWaterMark from "../LightingDealWaterMark/LightingDealWaterMark"
import LightingDealDuration from "../LightingDealDuration/LightingDealDuration"
import { getIsDeal } from "../../utils/DealUtils"
import { getIsLightingDeal } from "../../utils/LightingDealUtils"

export default function Product({
  id,
  name,
  description,
  price,
  images,
  coverImage,
  phoneNumber,
  tags,
  productOwnerId,
  commercialName,
  productType,
  dealPrice,
  lightingDealStartTime,
  lightingDealDuration,
}) {
  const history = useHistory()
  const isDeal = getIsDeal(productType)
  const isLightingDeal = getIsLightingDeal(productType)

  const openDetailPage = (event) => {
    if (event.target.type === "button") return
    history.push({
      pathname: `/${id}/${PRODUCT_DESCRIPTION}`,
      state: {
        name,
        description,
        price,
        images,
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

  return (
    <Card style={{ width: "18rem", cursor: "pointer" }} onClick={openDetailPage}>
      <img
        width="286px"
        height="256px"
        src={coverImage ? `data:image/jpeg;base64,${coverImage}` : images[0]}
        alt={`319x256`}
      />
      {isLightingDeal && <LightingDealWaterMark />}
      <Card.Body>
        <Card.Title className="notranslate">{name}</Card.Title>
        <SendMessageWhatsAppButton
          id={id}
          name={name}
          price={isDeal ? dealPrice : price}
          phoneNumber={phoneNumber}
          marginBottom="4%"
        />
        <div style={{ justifyContent: "center", display: "flex" }}>
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
          <LightingDealDuration
            lightingDealDuration={lightingDealDuration}
            lightingDealStartTime={lightingDealStartTime}
          />
        </div>
      </Card.Body>
    </Card>
  )
}
