import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Product from "./Product"

export default function ProductContainer() {
  return (
    <Container>
      <Row>
        <Col>
          <Product
            identifier="Product 1"
            description="Product 1 small description"
            price="10"
          />
        </Col>
        <Col>
          <Product
            identifier="Product 2"
            description="Product 2 small description"
            price="20"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Product
            identifier="Product 3"
            description="Product 3 small description"
            price="30"
          />
        </Col>
        <Col>
          <Product
            identifier="Product 4"
            description="Product 4 small description"
            price="40"
          />
        </Col>
      </Row>
    </Container>
  )
}
