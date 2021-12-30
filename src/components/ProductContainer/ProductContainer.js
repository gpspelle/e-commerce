import React, { useState, useEffect } from "react"
import axios from "axios"
import { Container, Row, Col } from "react-bootstrap"
import {
  ACCOUNTS_ENDPOINT,
  API,
  DEALS,
  PRODUCTS_ENDPOINT,
  PRODUCT_TYPES,
} from "../../constants/constants"
import Product from "../Product/Product"
import SearchBar from "../SearchBar/SearchBar"
import { useLocation } from "react-router-dom"
import {
  isLightingDealValid,
  processLightingDealInformation,
} from "../../utils/LightingDealUtils"

export const pageStates = {
  HOME: { name: "HOME", pathname: "/" },
  DEALS: { name: "DEALS", pathname: `/${DEALS}` },
}

export default function ProductContainer() {
  const location = useLocation()
  const [products, setProducts] = useState()
  const [productOwnerIds, setProductOwnerIds] = useState()
  const [allProducts, setAllProducts] = useState()
  const [accounts, setAccounts] = useState()
  const [searchBarValue, setSearchBarValue] = useState("")
  const [switchPage, setSwitchPage] = useState(pageStates.HOME)
  const [paginationToken, setPaginationToken] = useState(undefined)
  const [hasMoreDataToFetch, setHasMoreDataToFetch] = useState(true)

  useEffect(() => {
    if (location.state) {
      setSwitchPage(location.state.isDeal ? pageStates.DEALS : pageStates.HOME)
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
      const body = {
        key: paginationToken,
      }

      const config = {
        params: {
          body,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }

      const res = await axios.get(`${API}/${PRODUCTS_ENDPOINT}`, config)
      const { data, key } = res.data

      data.sort((a, b) => (a.PRODUCT_NAME > b.PRODUCT_NAME ? 1 : -1))

      const productOwnerIdsSet = new Set(
        data.map((product) => product.PRODUCT_OWNER_ID)
      )

      setProducts(data)
      setAllProducts(data)
      setProductOwnerIds([...productOwnerIdsSet])
      setPaginationToken(key)
      setHasMoreDataToFetch(key ? true : false)
    }

    if (hasMoreDataToFetch) {
      getProductsFromDatabase()
    }
  }, [paginationToken, hasMoreDataToFetch])

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
  if (switchPage.name === "DEALS") {
    displayProducts = products?.filter(
      (product) =>
        product.PRODUCT_TYPE === PRODUCT_TYPES.DEAL ||
        product.PRODUCT_TYPE === PRODUCT_TYPES.LIGHTING_DEAL
    )

    displayProducts = displayProducts?.filter((product) => {
      const isLightingDeal = product.PRODUCT_TYPE === PRODUCT_TYPES.LIGHTING_DEAL
      if (isLightingDeal) {
        const { miliseconds } = processLightingDealInformation({
          now: new Date(),
          lightingDealDuration: product.LIGHTING_DEAL_DURATION,
          lightingDealStartTime: product.LIGHTING_DEAL_START_TIME,
        })
        return isLightingDealValid(miliseconds)
      }

      return true
    })
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
                  productOwnerId={item.PRODUCT_OWNER_ID}
                  tags={item.PRODUCT_TAGS}
                  productType={item.PRODUCT_TYPE}
                  dealPrice={item.DEAL_PRICE}
                  lightingDealDuration={item.LIGHTING_DEAL_DURATION}
                  lightingDealStartTime={item.LIGHTING_DEAL_START_TIME}
                />
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
