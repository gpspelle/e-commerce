import React from "react"
import { useHistory } from "react-router-dom"
import { Button, Card } from "react-bootstrap"
import SendMessageWhatsAppButton from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"

export const PRODUCT_DESCRIPTION = "product-description"

export default function Product({ id, name, description, price, images }) {
  /*const history = useHistory()

  const openDetailPage = (event) => {
    history.push({
      pathname: `/${id}/${PRODUCT_DESCRIPTION}`,
      state: { name, description, price, images },
    })
  }*/

  return (
    <Card style={{ width: "18rem" }}>
      <img
        className="d-block w-100"
        width="256px"
        height="256px"
        src={images[0]}
        alt={`256x256`}
      />
      <Card.Body>
        <Card.Title className="notranslate">{name}</Card.Title>
        <Card.Text className="notranslate">{description}</Card.Text>
        {/* <Button
          style={{ width: "100%", marginBottom: "8%" }}
          variant="outline-primary"
          onClick={(event) => openDetailPage(event)}
        >
          Mais detalhes
        </Button>
        */}
        <SendMessageWhatsAppButton id={id} name={name} price={price} />
        <Card.Text className="notranslate" style={{ textAlign: "center" }}>
          R$ {price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
