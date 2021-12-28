import React from "react"
import { useHistory } from "react-router-dom"
import { Button, Card } from "react-bootstrap"
import SendMessageWhatsAppButton from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import { PRODUCT_DESCRIPTION } from "../../constants/constants"
import LightingDealWaterMark from "../LightingDealWaterMark/LightingDealWaterMark"

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
  lightingDealPrice,
  lightingDealStartTime,
  lightingDealDuration,
}) {
  const history = useHistory()

  const isLightingDeal =
    lightingDealPrice && lightingDealPrice && lightingDealDuration

  const openDetailPage = () => {
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
        isLightingDeal,
        lightingDealPrice,
        lightingDealStartTime,
        lightingDealDuration,
      },
    })
  }

  return (
    <Card style={{ width: "18rem" }}>
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
        <Card.Text className="notranslate">{description}</Card.Text>
        <Button
          style={{ width: "100%", marginBottom: "8%" }}
          variant="outline-primary"
          onClick={(event) => openDetailPage(event)}
        >
          Mais detalhes
        </Button>
        <SendMessageWhatsAppButton
          id={id}
          name={name}
          price={isLightingDeal ? lightingDealPrice : price}
          phoneNumber={phoneNumber}
          marginBottom="8%"
        />
        <Card.Text style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="notranslate"
            style={{
              textAlign: "center",
              textDecoration: isLightingDeal ? "line-through" : "none",
              color: isLightingDeal ? "lightgray" : "inherit",
            }}
          >
            R$ {price}
          </div>
          {isLightingDeal && (
            <div
              className="notranslate"
              style={{
                textAlign: "center",
                paddingLeft: "6px",
              }}
            >
              R$ {lightingDealPrice}
            </div>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
