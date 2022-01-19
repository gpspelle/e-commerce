import React, { useState, useEffect, memo } from "react"
import axios from "axios"
import { Container, Row, Col } from "react-bootstrap"
import {
  ACCOUNTS_ENDPOINT,
  REST_API,
  PRODUCTS_ENDPOINT,
  PRODUCT_TYPES,
} from "../../constants/constants"
import Product from "../Product/Product"
import {
  isLightingDealValid,
  processLightingDealInformation,
} from "../../utils/LightingDealUtils"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import useQuery from "../../hooks/useQuery"
import NoProductFoundMessage from "../NoProductFoundMessage/NoProductFoundMessage"
import MemoizedProductPagination from "../ProductPagination/ProductPagination"
import useIsMounted from "../../hooks/useIsMounted"

const ProductContainer = ({ isDeals }) => {
  const query = useQuery()
  const [productData, setProductData] = useState({
    products: [],
    allProducts: [],
    pagination: { key: undefined, fetch: true },
  })
  const [productOwnerIds, setProductOwnerIds] = useState([])
  const [accounts, setAccounts] = useState([])
  const { width } = useWindowDimensions()
  const isMounted = useIsMounted()

  const { products, allProducts, pagination } = productData
  const searchBarValue = query.get("q")

  useEffect(() => {
    if (searchBarValue && allProducts.length > 0) {
      const filteredProducts = allProducts.filter((product) => {
        const lowerCaseSearchBarValue = searchBarValue.toLowerCase()
        if (product.PRODUCT_NAME.S.toLowerCase().includes(lowerCaseSearchBarValue)) {
          return true
        }

        if (
          product.PRODUCT_DESCRIPTION.S.toLowerCase().includes(
            lowerCaseSearchBarValue
          )
        ) {
          return true
        }

        const match = product.PRODUCT_TAGS?.SS.find((element) => {
          if (element.includes(lowerCaseSearchBarValue)) {
            return true
          }
        })

        if (match) {
          return true
        }

        return false
      })

      setProductData({ ...productData, products: filteredProducts })
    } else if (productData.products.length !== allProducts.length) {
      setProductData({ ...productData, products: allProducts })
    }
  }, [searchBarValue, allProducts])

  useEffect(() => {
    const getAccountsFromDatabase = async (productOwnerIds) => {
      const body = {
        productOwnerIds,
      }

      if (productOwnerIds.length === 0) {
        return
      }

      const response = await axios.get(`${REST_API}/${ACCOUNTS_ENDPOINT}`, {
        params: body,
      })

      setAccounts(response.data)
    }

    if (productOwnerIds.length > 0) {
      if (isMounted.current) {
        getAccountsFromDatabase(productOwnerIds)
      }
    }
  }, [productOwnerIds])

  useEffect(() => {
    async function getProductsFromDatabase() {
      const body = {
        key: pagination.key,
      }

      const config = {
        params: {
          body,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }

      const res = await axios.get(`${REST_API}/${PRODUCTS_ENDPOINT}`, config)
      const { data, key } = res.data
      const concatProducts = products.length > 0 ? products.concat(data) : data

      concatProducts.sort((a, b) => (a.PRODUCT_NAME.S > b.PRODUCT_NAME.S ? 1 : -1))

      const productOwnerIdsSet = new Set(
        concatProducts.map((product) => product.PRODUCT_OWNER_ID.S)
      )

      setProductOwnerIds([...productOwnerIdsSet])

      setProductData({
        products: concatProducts,
        allProducts: concatProducts,
        pagination: { key, fetch: key ? true : false },
      })
    }

    if (pagination.fetch) {
      getProductsFromDatabase()
    }
  }, [pagination.key])

  var productOwnerIdToOwnerData = {}
  if (accounts.length > 0) {
    accounts.forEach((account) => {
      productOwnerIdToOwnerData[account.id] = {
        phoneNumber: account.phone_number,
        commercialName: account.commercial_name,
      }
    })
  }

  var displayProducts
  if (isDeals && products.length > 0) {
    displayProducts = products.filter(
      (product) =>
        product.PRODUCT_TYPE.S === PRODUCT_TYPES.DEAL ||
        product.PRODUCT_TYPE.S === PRODUCT_TYPES.LIGHTING_DEAL
    )

    displayProducts = displayProducts.filter((product) => {
      const isLightingDeal = product.PRODUCT_TYPE.S === PRODUCT_TYPES.LIGHTING_DEAL
      if (isLightingDeal) {
        const { miliseconds } = processLightingDealInformation({
          now: new Date(),
          lightingDealDuration: product.LIGHTING_DEAL_DURATION.S,
          lightingDealStartTime: product.LIGHTING_DEAL_START_TIME.S,
        })
        return isLightingDealValid(miliseconds)
      }

      return true
    })
  } else if (products.length > 0) {
    displayProducts = products
  }

  const items =
    displayProducts &&
    displayProducts.map((item) => {
      return (
        <Col
          key={
            item.id.S +
            productOwnerIdToOwnerData[item.PRODUCT_OWNER_ID.S]?.phoneNumber
          }
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "20px",
          }}
        >
          <Product
            id={item.id.S}
            name={item.PRODUCT_NAME.S}
            description={item.PRODUCT_DESCRIPTION.S}
            price={item.PRODUCT_PRICE.N}
            images={item.PRODUCT_IMAGES.L.map((image) => image.S)}
            coverImage={item.PRODUCT_COVER_IMAGE?.S}
            phoneNumber={
              Object.keys(productOwnerIdToOwnerData).length !== 0
                ? productOwnerIdToOwnerData[item.PRODUCT_OWNER_ID.S]["phoneNumber"]
                : false
            }
            commercialName={
              Object.keys(productOwnerIdToOwnerData).length !== 0
                ? productOwnerIdToOwnerData[item.PRODUCT_OWNER_ID.S][
                    "commercialName"
                  ]
                : false
            }
            productOwnerId={item.PRODUCT_OWNER_ID.S}
            tags={item.PRODUCT_TAGS?.SS || []}
            productType={item.PRODUCT_TYPE?.S}
            dealPrice={item.DEAL_PRICE?.N}
            lightingDealDuration={item.LIGHTING_DEAL_DURATION?.S}
            lightingDealStartTime={item.LIGHTING_DEAL_START_TIME?.S}
            hasMoreDataToFetch={pagination.fetch}
          />
        </Col>
      )
    })

  return (
    <div>
      <Container>
        <Row style={{ paddingTop: width < 1024 ? "64px" : "12px" }}>
          {items && items.length > 0 ? (
            <MemoizedProductPagination products={items} screenWidth={width} />
          ) : (
            <NoProductFoundMessage
              screenWidth={width}
              hasMoreDataToFetch={pagination.fetch}
              searchBarValue={searchBarValue}
              isDeals={isDeals}
            />
          )}
        </Row>
      </Container>
    </div>
  )
}

const MemoizedProductContainer = memo(ProductContainer)
export default MemoizedProductContainer
