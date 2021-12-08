import React from "react"
import { useHistory } from "react-router-dom"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Badge from "react-bootstrap/Badge"
import { Carousel } from "react-bootstrap"

export const PRODUCT_DESCRIPTION = "product-description"

export default function Product({ identifier, description, price, images }) {
  const history = useHistory()

  const openDetailPage = (event) => {
    history.push({
      pathname: `${PRODUCT_DESCRIPTION}/${identifier}`,
      state: { identifier, description, price, images },
    })
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Carousel interval={null}>
        {images?.map((item, i) => {
          return (
            <Carousel.Item key={i}>
              <img className="d-block w-100" src={item} alt={`${i}`} />
            </Carousel.Item>
          )
        })}
      </Carousel>
      <Card.Body>
        <Card.Title>{identifier}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" onClick={(event) => openDetailPage(event)}>
          Mais detalhes
        </Button>
        <Badge pill bg="success">
          {price} R$
        </Badge>
      </Card.Body>
    </Card>
  )
}
