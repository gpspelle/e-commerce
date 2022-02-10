import React, { useState, useEffect, memo, useRef } from "react"
import { Container, Row, Col } from "react-bootstrap"

import useWindowDimensions from "../../hooks/useWindowDimensions"
import useQuery from "../../hooks/useQuery"
import useIsMounted from "../../hooks/useIsMounted"
import { PRODUCT_TYPES } from "../../constants/constants"
import Product from "../Product/Product"
import {
  isLightningDealValid,
  processLightningDealInformation,
} from "../../utils/lightningDealUtils"
import NoProductFoundMessage from "../NoProductFoundMessage/NoProductFoundMessage"
import MemoizedProductPagination from "../ProductPagination/ProductPagination"
import {
  getAccountsFromDatabase,
  getProductsFromDatabase,
} from "../../actions/database"
import scrollToTop from "../../utils/scrollToTop"

const ProductContainer = ({ isDeals, paddingTop, filterByAdmin }) => {
  const query = useQuery()
  const productContainerRef = useRef()
  const [productData, setProductData] = useState({
    products: [],
    allProducts: [],
    pagination: { key: undefined, fetch: true },
  })
  const [productOwnerIds, setProductOwnerIds] = useState([])
  const [accounts, setAccounts] = useState([])
  const { width, height } = useWindowDimensions()
  const isMounted = useIsMounted()

  const { products, allProducts, pagination } = productData
  const searchBarValue = query.get("q")

  useEffect(() => {
    scrollToTop()
  }, [])

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
    if (productOwnerIds.length > 0) {
      if (isMounted.current) {
        getAccountsFromDatabase({ setAccounts, productOwnerIds })
      }
    }
  }, [productOwnerIds])

  useEffect(() => {
    if (pagination.fetch) {
      getProductsFromDatabase({
        setProductData,
        setProductOwnerIds,
        pagination,
        products,
      })
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
        product.PRODUCT_TYPE?.S === PRODUCT_TYPES.DEAL ||
        product.PRODUCT_TYPE?.S === PRODUCT_TYPES.LIGHTNING_DEAL
    )

    displayProducts = displayProducts.filter((product) => {
      const isLightningDeal =
        product.PRODUCT_TYPE?.S === PRODUCT_TYPES.LIGHTNING_DEAL
      if (isLightningDeal) {
        const { miliseconds } = processLightningDealInformation({
          now: new Date(),
          lightningDealDuration: product.LIGHTNING_DEAL_DURATION.S,
          lightningDealStartTime: product.LIGHTNING_DEAL_START_TIME.S,
        })
        return isLightningDealValid(miliseconds)
      }

      return true
    })
  } else if (products.length > 0) {
    displayProducts = products
  }

  if (filterByAdmin !== undefined) {
    displayProducts =
      displayProducts &&
      displayProducts.filter(
        (product) => product.PRODUCT_OWNER_ID?.S === filterByAdmin
      )
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
            productImagesResized={item.PRODUCT_IMAGES_RESIZED?.L.map(
              (image) => image.S
            )}
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
            productOwnerId={item.PRODUCT_OWNER_ID?.S}
            tags={item.PRODUCT_TAGS?.SS || []}
            productType={item.PRODUCT_TYPE?.S}
            dealPrice={item.DEAL_PRICE?.N}
            lightningDealDuration={item.LIGHTNING_DEAL_DURATION?.S}
            lightningDealStartTime={item.LIGHTNING_DEAL_START_TIME?.S}
            productStock={item.PRODUCT_STOCK?.N ? parseInt(item.PRODUCT_STOCK.N) : 1}
            hasMoreDataToFetch={pagination.fetch}
          />
        </Col>
      )
    })

  var containerHeight

  if (items && items.length > 0) {
    containerHeight = Math.min(items.length * 380.5, 0.99 * height)
  } else {
    containerHeight = 0.99 * height
  }

  return (
    <Container ref={productContainerRef} style={{ minHeight: containerHeight }}>
      <Row style={{ paddingTop: width < 1024 ? paddingTop : "12px" }}>
        {items && items.length > 0 ? (
          <MemoizedProductPagination
            scrollFunction={() =>
              window.scrollTo(0, productContainerRef.current.offsetTop)
            }
            products={items}
            screenWidth={width}
          />
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
  )
}

const MemoizedProductContainer = memo(ProductContainer)
export default MemoizedProductContainer
