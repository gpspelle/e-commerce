import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Product from "../Product/Product"
import "./ProductContainer.css"

const api = "https://qbhf2c9996.execute-api.us-east-1.amazonaws.com/dev"
const endpoint = "products"
const phoneNumber = "+5519993955537"

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
    <div>
      <a
        href={`https://wa.me/${phoneNumber}`}
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-whatsapp whatsapp-icon"></i>
      </a>
      <Container>
        <Row>
          {products?.map((item, i) => {
            return (
              <Col key={i}>
                <Product
                  id={item.id}
                  name={item.PRODUCT_NAME}
                  description={item.PRODUCT_DESCRIPTION}
                  price={item.PRODUCT_PRICE}
                  images={item.PRODUCT_IMAGES}
                ></Product>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}
