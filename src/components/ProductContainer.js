import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Product from "./Product"

const api = "https://qbhf2c9996.execute-api.us-east-1.amazonaws.com/dev"
const endpoint = "products"

export default function ProductContainer() {
  const [products, setProducts] = useState()

  useEffect(() => {
    async function getProductsFromDatabase() {
      const data = await fetch(`${api}/${endpoint}`)
      const json = await data.json()
      setProducts(json)
    }

    getProductsFromDatabase()
  }, [])

  return (
    <Container>
      <Row>
        {products?.map((item, i) => {
          return (
            <Col key={i}>
              <Product
                identifier={item.PRODUCT_NAME}
                description={item.PRODUCT_DESCRIPTION}
                price={item.PRODUCT_PRICE}
                images={item.PRODUCT_IMAGES}
              ></Product>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}
