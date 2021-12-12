import React from "react"
import { useHistory } from "react-router-dom"
import { Carousel, Button, Card, Badge } from "react-bootstrap"

export const PRODUCT_DESCRIPTION = "product-description"
const phoneNumber = "+5519993955537"

export default function Product({ id, name, description, price, images }) {
  const history = useHistory()

  const openDetailPage = (event) => {
    history.push({
      pathname: `/${id}/${PRODUCT_DESCRIPTION}`,
      state: { name, description, price, images },
    })
  }

  const sendWhatsAppMessage = () => {
    const message = `Olá! Estou interessado no produto ${name}, preço R$ ${price}.\n\nLink do produto: <fake_link>`
    const url =
      "https://api.whatsapp.com/send?phone=" +
      phoneNumber +
      "&text=" +
      encodeURIComponent(message)
    window.open(url, "_blank")
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Carousel interval={null}>
        {images?.map((item, i) => {
          return (
            <Carousel.Item key={i}>
              <img
                className="d-block w-100"
                width="256px"
                height="256px"
                src={item}
                alt={`${i}`}
              />
            </Carousel.Item>
          )
        })}
      </Carousel>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" onClick={(event) => openDetailPage(event)}>
          Mais detalhes
        </Button>
        <Button onClick={() => sendWhatsAppMessage()}>Gostei desse</Button>
        <Badge pill bg="success">
          R$ {price}
        </Badge>
      </Card.Body>
    </Card>
  )
}
