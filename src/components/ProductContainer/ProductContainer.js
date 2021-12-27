import React, { useState, useEffect } from "react"
import axios from "axios"
import { Container, Row, Col, Form } from "react-bootstrap"
import { ACCOUNTS_ENDPOINT, API, PRODUCTS_ENDPOINT } from "../../constants/constants"
import Product from "../Product/Product"
import "./ProductContainer.css"
import SearchBar from "../SearchBar/SearchBar"

export default function ProductContainer() {
  const [products, setProducts] = useState()
  const [productOwnerIds, setProductOwnerIds] = useState()
  const [allProducts, setAllProducts] = useState()
  const [accounts, setAccounts] = useState()
  const [searchBarValue, setSearchBarValue] = useState("")

  useEffect(() => {
    if (searchBarValue) {
      const filteredProducts = allProducts.filter((product) => {
        const lowerCaseSearchBarValue = searchBarValue.toLowerCase()
        if (product.PRODUCT_NAME.toLowerCase().includes(lowerCaseSearchBarValue)) {
          return true
        }

        if (
          product.PRODUCT_DESCRIPTION.toLowerCase().includes(lowerCaseSearchBarValue)
        ) {
          return true
        }

        const match = product?.PRODUCT_TAGS?.find((element) => {
          if (element.includes(lowerCaseSearchBarValue)) {
            return true
          }
        })

        if (match) {
          return true
        }

        return false
      })

      setProducts(filteredProducts)
    } else {
      setProducts(allProducts)
    }
  }, [searchBarValue])

  useEffect(() => {
    async function getProductsFromDatabase() {
      const data = await fetch(`${API}/${PRODUCTS_ENDPOINT}`)
      const productsJson = await data.json()
      productsJson.sort((a, b) => (a.PRODUCT_NAME > b.PRODUCT_NAME ? 1 : -1))

      const productOwnerIdsSet = new Set(
        productsJson.map((product) => product.PRODUCT_OWNER_ID)
      )

      setProducts(productsJson)
      setAllProducts(productsJson)
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

  var productOwnerIdToOwnerData = {}
  if (accounts) {
    accounts.forEach((account) => {
      productOwnerIdToOwnerData[account.id] = {
        phoneNumber: account.phone_number,
        commercialName: account.commercial_name,
      }
    })
  }

  return (
    <div>
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
                    Object.keys(productOwnerIdToOwnerData).length !== 0
                      ? productOwnerIdToOwnerData[item.PRODUCT_OWNER_ID][
                          "phoneNumber"
                        ]
                      : false
                  }
                  commercialName={
                    Object.keys(productOwnerIdToOwnerData).length !== 0
                      ? productOwnerIdToOwnerData[item.PRODUCT_OWNER_ID][
                          "commercialName"
                        ]
                      : false
                  }
                  tags={item.PRODUCT_TAGS}
                ></Product>
              </Col>
            )
          })}
        </Row>
      </Container>
      <SearchBar
        searchBarValue={searchBarValue}
        setSearchBarValue={setSearchBarValue}
      />
    </div>
  )
}
