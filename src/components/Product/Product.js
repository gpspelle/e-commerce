import React from "react"
import { useHistory } from "react-router-dom"
import { Carousel, Button, Card, Badge } from "react-bootstrap"
import SendMessageWhatsAppButton from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"

export const PRODUCT_DESCRIPTION = "product-description"

export default function Product({ id, name, description, price, images }) {
  const history = useHistory()

  const openDetailPage = (event) => {
    history.push({
      pathname: `/${id}/${PRODUCT_DESCRIPTION}`,
      state: { name, description, price, images },
    })
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
        <Button
          style={{ width: "100%", marginBottom: "8%" }}
          variant="primary"
          onClick={(event) => openDetailPage(event)}
        >
          Mais detalhes
        </Button>
        <SendMessageWhatsAppButton id={id} name={name} price={price} />
        <Badge pill bg="success" style={{ width: "100%" }}>
          R$ {price}
        </Badge>
      </Card.Body>
    </Card>
  )
}
