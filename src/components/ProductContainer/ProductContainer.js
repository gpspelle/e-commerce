import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { API, PHONE_NUMBER, PRODUCTS_ENDPOINT } from "../../constants/constants"
import Product from "../Product/Product"
import "./ProductContainer.css"

export default function ProductContainer() {
  const [products, setProducts] = useState()

  useEffect(() => {
    async function getProductsFromDatabase() {
      const data = await fetch(`${API}/${PRODUCTS_ENDPOINT}`)
      const json = await data.json()
      json.sort((a, b) => (a.PRODUCT_NAME > b.PRODUCT_NAME ? 1 : -1))

      setProducts(json)
    }

    getProductsFromDatabase()
  }, [])

  return (
    <div>
      <a
        href={`https://wa.me/${PHONE_NUMBER}`}
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
              <Col
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "30px",
                }}
              >
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
