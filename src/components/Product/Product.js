import React from "react"
import { useHistory } from "react-router-dom"
import { Card } from "react-bootstrap"
import SendMessageWhatsAppButton from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import { PRODUCT_DESCRIPTION } from "../../constants/constants"
import LightingDealWaterMark from "../LightingDealWaterMark/LightingDealWaterMark"
import LightingDealDuration from "../LightingDealDuration/LightingDealDuration"

export default function Product({
  id,
  name,
  description,
  price,
  images,
  phoneNumber,
  tags,
  commercialName,
  productType,
  dealPrice,
  lightingDealStartTime,
  lightingDealDuration,
}) {
  const history = useHistory()

  const isDeal = productType === "DEAL" || productType === "LIGHTING_DEAL"
  const isLightingDeal = productType === "LIGHTING_DEAL"
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
      },
    })
  }

  return (
    <Card style={{ width: "18rem", cursor: "pointer" }} onClick={openDetailPage}>
      <img
        className="d-block w-100"
        width="256px"
        height="256px"
        src={images[0]}
        alt={`256x256`}
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
        <Card.Text style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="notranslate"
            style={{
              textAlign: "center",
              textDecoration: isDeal ? "line-through" : "none",
              color: isDeal ? "lightgray" : "inherit",
            }}
          >
            R$ {price}
          </div>
          {isDeal && (
            <div
              className="notranslate"
              style={{
                textAlign: "center",
                paddingLeft: "6px",
              }}
            >
              R$ {dealPrice}
            </div>
          )}
        </Card.Text>
        <LightingDealDuration
          lightingDealDuration={lightingDealDuration}
          lightingDealStartTime={lightingDealStartTime}
        />
      </Card.Body>
    </Card>
  )
}
