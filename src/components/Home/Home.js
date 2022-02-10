import React, { useState, useEffect } from "react"
import { Col, Container, Row, Spinner } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"

import { ABOUT_US, DEALS, PRODUCT_TYPES } from "../../constants/constants"
import useIsMounted from "../../hooks/useIsMounted"
import useQuery from "../../hooks/useQuery"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import ProductOfferHomeMobile from "../ProductOfferHomeMobile/ProductOfferHomeMobile"
import AdminHome from "../AdminHome/AdminHome"
import {
  isLightningDealValid,
  processLightningDealInformation,
} from "../../utils/lightningDealUtils"
import { getRandomFromArray, getRandomFromRangeArray } from "../../utils/randomUtils"
import SwipeToSeeMore from "../SwipeToSeeMore/SwipeToSeeMore"
import { LateralCard } from "../Blocks/LateralCard"
import {
  getAccountsFromDatabase,
  getProductsFromDatabase,
} from "../../actions/database"
import scrollToTop from "../../utils/scrollToTop"
import Footer from "../Footer/Footer"
import NavigationBar from "../NavigationBar/NavigationBar"
import { range } from "../../utils/range"

const RANGE = range(1000)
const randomIndexes = getRandomFromRangeArray(RANGE)

export default function Home() {
  const query = useQuery()
  const history = useHistory()
  const [productData, setProductData] = useState({
    products: [],
    allProducts: [],
    pagination: { key: undefined, fetch: true },
  })
  const [accounts, setAccounts] = useState([])
  const isMounted = useIsMounted()
  const { width, height } = useWindowDimensions()
  const { products, allProducts, pagination } = productData
  const searchBarValue = query.get("q")
  const productDealsResponsive = {
    0: { items: 2 },
    574: { items: 3 },
    991: { items: 4 },
  }

  const adminsResponsive = {
    0: { items: 2 },
    400: { items: 3 },
    568: { items: 4 },
    700: { items: 5 },
  }

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
    scrollToTop()

    if (isMounted.current) {
      getAccountsFromDatabase({ setAccounts })
    }
  }, [])

  useEffect(() => {
    if (pagination.fetch) {
      getProductsFromDatabase({ setProductData, pagination, products })
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
  if (products.length > 0) {
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

    displayProducts = getRandomFromArray(displayProducts, randomIndexes)
  }

  var multiplier = 0.45
  if (width > 574) {
    multiplier = 0.21
  }

  const productImageSize = width * multiplier
  const productCardSize = productImageSize + 2.5
  const items =
    displayProducts &&
    displayProducts.map((item) => {
      return (
        <Col
          key={
            item.id.S +
            productOwnerIdToOwnerData[item.PRODUCT_OWNER_ID.S]?.phoneNumber
          }
        >
          <ProductOfferHomeMobile
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
            productImageSize={productImageSize}
            productCardSize={productCardSize}
          />
        </Col>
      )
    })

  const admins =
    accounts &&
    getRandomFromArray(accounts, randomIndexes).map((account) => {
      return (
        <Col
          key={account.id}
          style={{
            minHeight: 120,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "12px",
            paddingBottom: "12px",
            paddingRight: "0px",
            paddingLeft: "0px",
          }}
        >
          <AdminHome account={account} />
        </Col>
      )
    })

  const extra = width < 1024 ? 0 : 6

  return (
    <>
      <NavigationBar />
      <Container style={{ minHeight: height * 0.99, paddingTop: "72px" }}>
        <Row className="my-2">
          <Col style={{ maxWidth: "70%" }}>
            <h2>Nossas ofertas</h2>
          </Col>
          <Col
            style={{
              maxWidth: "30%",
              justifyContent: "right",
              display: "flex",
            }}
          >
            <p
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() =>
                history.push({
                  pathname: `/${DEALS}`,
                })
              }
            >
              Ver todas
            </p>
          </Col>
        </Row>
        {items === undefined ? (
          <div
            /* TODO: crazy math to get the vertical size of the items */
            style={{
              minHeight: productCardSize + 76.5 + 47.5 + extra,
              height: productCardSize + 76.5 + 47.5 + extra,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spinner
              style={{
                margin: "auto",
                display: "flex",
                color: "#212529",
              }}
              animation="border"
            />
          </div>
        ) : (
          <>
            <AliceCarousel
              mouseTracking={width < 1024 ? true : false}
              items={items}
              responsive={productDealsResponsive}
              controlsStrategy={width < 1024 ? "responsive" : "alternate"}
              disableDotsControls={true}
              disableButtonsControls={width < 1024}
            />
            {width < 1024 && <SwipeToSeeMore />}
          </>
        )}
        <Row className="my-3">
          <Col style={{ maxWidth: "70%" }}>
            <h2>Nossos Artesãos</h2>
          </Col>
          <Col
            style={{
              maxWidth: "30%",
              justifyContent: "right",
              display: "flex",
            }}
          >
            <p
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() =>
                history.push({
                  pathname: `/${ABOUT_US}`,
                  state: {
                    accounts,
                  },
                })
              }
            >
              Ver todos
            </p>
          </Col>
        </Row>
        {admins.length === 0 ? (
          <div
            style={{
              minHeight: 200,
              height: 200,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spinner
              style={{
                margin: "auto",
                display: "flex",
                color: "#212529",
              }}
              animation="border"
            />
          </div>
        ) : (
          <>
            <AliceCarousel
              mouseTracking={width < 1024 ? true : false}
              items={admins}
              responsive={adminsResponsive}
              controlsStrategy={width < 1024 ? "responsive" : "alternate"}
              disableDotsControls={true}
              disableButtonsControls={width < 1024}
            />
            {width < 1024 && <SwipeToSeeMore />}
          </>
        )}
        <Row className="my-3">
          <Col style={{ maxWidth: "70%" }}>
            <h2>Nossas vantagens</h2>
          </Col>
        </Row>
        <Row>
          <LateralCard
            imageSize={120}
            imagePosition="left"
            smallSrc="/small-advantage-1.png"
            src="/advantage-1.png"
            title="Feito para você"
            text="Comercializamos apenas produtos artesanais, pensados e sob medida para você"
          />
        </Row>
        <Row>
          <LateralCard
            imageSize={120}
            imagePosition="left"
            smallSrc="/small-advantage-2.png"
            src="/advantage-2.png"
            title="Qualidade sem igual"
            text="Nossos produtos são feitos somente com materiais de primeira linha"
          />
        </Row>
        <Row>
          <LateralCard
            imageSize={120}
            imagePosition="left"
            smallSrc="/small-advantage-2.png"
            src="/advantage-3.png"
            title="Toque de carinho"
            text="Comprar produtos artesanais cria uma relação mais próxima com quem desenvolve seus produtos"
          />
        </Row>
      </Container>
      <Footer />
    </>
  )
}
