import React, { useState, useEffect } from "react"
import axios from "axios"
import { Container, Row, Col } from "react-bootstrap"
import { ACCOUNTS_ENDPOINT, API, PRODUCTS_ENDPOINT } from "../../constants/constants"
import Product from "../Product/Product"
import "./ProductContainer.css"

export default function ProductContainer() {
  const [products, setProducts] = useState()
  const [productOwnerIds, setProductOwnerIds] = useState()
  const [accounts, setAccounts] = useState()

  useEffect(() => {
    async function getProductsFromDatabase() {
      const data = await fetch(`${API}/${PRODUCTS_ENDPOINT}`)
      const productsJson = await data.json()
      productsJson.sort((a, b) => (a.PRODUCT_NAME > b.PRODUCT_NAME ? 1 : -1))

      const ownerIds = {}
      const productOwnerIdsSet = new Set(
        productsJson.map((product) => product.PRODUCT_OWNER_ID)
      )

      setProducts(productsJson)
      setProductOwnerIds([...productOwnerIdsSet])
    }

    getProductsFromDatabase()
  }, [])

  useEffect(() => {
    async function getAccountsFromDatabase() {
      const body = {
        productOwnerIds,
      }
      const response = await axios.get(`${API}/${ACCOUNTS_ENDPOINT}`, {
        params: body,
      })

      setAccounts(response.data)
    }

    if (productOwnerIds) {
      getAccountsFromDatabase()
    }
  }, [productOwnerIds])

  var productOwnerIdToPhoneNumber = {}
  if (accounts) {
    accounts.forEach((account) => {
      productOwnerIdToPhoneNumber[account.id] = account.phone_number
    })
  }

  return (
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
                phoneNumber={
                  Object.keys(productOwnerIdToPhoneNumber).length !== 0
                    ? productOwnerIdToPhoneNumber[item.PRODUCT_OWNER_ID]
                    : false
                }
              ></Product>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}
