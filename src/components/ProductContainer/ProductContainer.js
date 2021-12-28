import React, { useState, useEffect } from "react"
import axios from "axios"
import { Container, Row, Col } from "react-bootstrap"
import {
  ACCOUNTS_ENDPOINT,
  API,
  LIGHTING_DEALS,
  PRODUCTS_ENDPOINT,
} from "../../constants/constants"
import Product from "../Product/Product"
import "./ProductContainer.css"
import SearchBar from "../SearchBar/SearchBar"
import { useLocation } from "react-router-dom"

export const pageStates = {
  HOME: { name: "HOME", pathname: "/" },
  LIGHTING_DEALS: { name: "LIGHTING_DEALS", pathname: `/${LIGHTING_DEALS}` },
}

export default function ProductContainer() {
  const location = useLocation()
  const [products, setProducts] = useState()
  const [productOwnerIds, setProductOwnerIds] = useState()
  const [allProducts, setAllProducts] = useState()
  const [accounts, setAccounts] = useState()
  const [searchBarValue, setSearchBarValue] = useState("")
  const [switchPage, setSwitchPage] = useState(pageStates.HOME)

  useEffect(() => {
    if (location.state) {
      setSwitchPage(
        location.state.isLightingDeal ? pageStates.LIGHTING_DEALS : pageStates.HOME
      )
    }
  }, [location])

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
      var productsJson = await data.json()

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

      if (productOwnerIds.length === 0) {
        return
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

  var displayProducts
  if (switchPage.name === "LIGHTING_DEALS") {
    displayProducts = products?.filter(
      (product) => product.PRODUCT_TYPE === "LIGHTING_DEAL"
    )
  } else {
    displayProducts = products
  }

  return (
    <div>
      <Container>
        <Row>
          {displayProducts?.map((item, i) => {
            return (
              <Col
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "30px",
                  paddingTop: "62px",
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
                  productType={item.PRODUCT_TYPE}
                  lightingDealPrice={item.LIGHTING_DEAL_PRICE}
                  lightingDealDuration={item.LIGHTING_DEAL_DURATION}
                  lightingDealStartTime={item.LIGHTING_DEAL_START_TIME}
                ></Product>
              </Col>
            )
          })}
        </Row>
      </Container>
      <SearchBar
        switchPage={switchPage}
        setSwitchPage={setSwitchPage}
        searchBarValue={searchBarValue}
        setSearchBarValue={setSearchBarValue}
      />
    </div>
  )
}
