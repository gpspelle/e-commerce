import React from "react"
import { useHistory } from "react-router-dom"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Badge from "react-bootstrap/Badge"

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
      <Card.Img variant="top" src={images[0]} />
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
