import React, { useState, useEffect } from "react"
import { Col, Container, Row, Spinner } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"

import { ABOUT_US, DEALS, LARGE_SCREEN, PRODUCTS } from "../../constants/constants"
import useIsMounted from "../../hooks/useIsMounted"
import useQuery from "../../hooks/useQuery"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import AdminHome from "../AdminHome/AdminHome"
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
import HeroHeader from "../HeroHeader/HeroHeader"
import { convertProductArrayToDisplayProduct } from "../../utils/convertProductArrayToDisplayProduct"
import { filterDealsAndLightningDealsFromProductArray } from "../../utils/filterDealsAndLightningDealsFromProductArray"

const RANGE = range(1000)
const randomIndexes = getRandomFromRangeArray(RANGE)

export default function Home() {
  const query = useQuery()
  const history = useHistory()
  const [productData, setProductData] = useState({
    products: [],
    allProducts: [],
    productPagination: { key: undefined, fetch: true },
  })

  const [accountsData, setAccountsData] = useState({
    accountsPagination: { key: undefined, fetch: true },
    accounts: [],
  })
  const [offersCarouselActiveIndex, setOffersCarouselActiveIndex] = useState(0)
  const [productsCarouselActiveIndex, setProductsCarouselActiveIndex] = useState(0)
  const [accountsCarouselActiveIndex, setAccountsCarouselActiveIndex] = useState(0)
  const isMounted = useIsMounted()
  const { width, height } = useWindowDimensions()
  const { products, allProducts, productPagination } = productData
  const { accounts, accountsPagination } = accountsData
  const searchBarValue = query.get("q")
  const productDealsResponsive = {
    0: { items: 1 },
    359: { items: 2 },
    999: { items: 3 },
  }

  const adminsResponsive = {
    0: { items: 2 },
    400: { items: 3 },
    568: { items: 4 },
    700: { items: 5 },
  }

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
    if (accountsPagination.fetch) {
      if (isMounted.current) {
        getAccountsFromDatabase({
          setAccountsData,
        })
      }
    }
  }, [accountsPagination.key])

  useEffect(() => {
    if (productPagination.fetch) {
      getProductsFromDatabase({
        setProductData,
        productPagination,
        products,
      })
    }
  }, [productPagination.key])

  var productOwnerIdToOwnerData = {}
  if (accounts.length > 0) {
    accounts.forEach((account) => {
      productOwnerIdToOwnerData[account.id] = {
        phoneNumber: account.phone_number,
        commercialName: account.commercial_name,
      }
    })
  }

  var displayDealProducts = filterDealsAndLightningDealsFromProductArray({
    products,
    randomIndexes,
  })

  var displayProducts = []
  if (products.length > 0) {
    displayProducts = getRandomFromArray(products, randomIndexes)
  }

  var multiplier
  if (width > LARGE_SCREEN) {
    multiplier = 0.28
  } else if (width > 359) {
    multiplier = 0.42
  } else {
    multiplier = 0.9
  }

  const productImageSize = width * multiplier
  const productCardSize = productImageSize + 2.5

  const dealItems = convertProductArrayToDisplayProduct({
    productArray: displayDealProducts,
    productOwnerIdToOwnerData,
    productImageSize,
    productCardSize,
  })

  const items = convertProductArrayToDisplayProduct({
    productArray: displayProducts,
    productOwnerIdToOwnerData,
    productImageSize,
    productCardSize,
  })

  const admins = getRandomFromArray(accounts, randomIndexes).map((account) => {
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

  const extra = width < LARGE_SCREEN ? 0 : 6

  const isLoadedProducts = productPagination.fetch ? (
    <Spinner
      style={{
        margin: "auto",
        display: "flex",
      }}
      animation="border"
    />
  ) : (
    <p
      style={{
        margin: "auto",
        display: "flex",
      }}
    >
      Não foram encontradas produtos nesse momento
    </p>
  )

  const isLoadedAdmins = accountsPagination.fetch ? (
    <Spinner
      style={{
        margin: "auto",
        display: "flex",
      }}
      animation="border"
    />
  ) : (
    <p
      style={{
        margin: "auto",
        display: "flex",
      }}
    >
      Não foram encontrados artesãos nesse momento
    </p>
  )

  return (
    <>
      <NavigationBar />
      <HeroHeader />
      <Container style={{ minHeight: height * 0.99 }}>
        <Row className="my-2">
          <Col style={{ maxWidth: "70%" }}>
            <h6 className="font-face-poppins-bold" style={{ marginBottom: "16px" }}>
              Nossas promoções
            </h6>
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
        {dealItems.length === 0 ? (
          <div
            /* TODO: crazy math to get the vertical size of the items */
            style={{
              minHeight: productCardSize + 76.5 + 47.5 + extra + 40.5,
              height: productCardSize + 76.5 + 47.5 + extra + 40.5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {isLoadedProducts}
          </div>
        ) : (
          <>
            <AliceCarousel
              activeIndex={offersCarouselActiveIndex}
              onSlideChanged={(e) => setOffersCarouselActiveIndex(e.item)}
              mouseTracking={width < LARGE_SCREEN ? true : false}
              items={dealItems}
              responsive={productDealsResponsive}
              controlsStrategy={width < LARGE_SCREEN ? "responsive" : "alternate"}
              disableDotsControls={true}
              disableButtonsControls={width < LARGE_SCREEN}
            />
            {width < LARGE_SCREEN && <SwipeToSeeMore />}
          </>
        )}
        <Row className="my-2">
          <Col style={{ maxWidth: "70%" }}>
            <h6 className="font-face-poppins-bold" style={{ marginBottom: "16px" }}>
              Nossos produtos
            </h6>
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
                  pathname: `/${PRODUCTS}`,
                })
              }
            >
              Ver todos
            </p>
          </Col>
        </Row>
        {items.length === 0 ? (
          <div
            /* TODO: crazy math to get the vertical size of the items */
            style={{
              minHeight: productCardSize + 76.5 + 47.5 + extra + 40.5,
              height: productCardSize + 76.5 + 47.5 + extra + 40.5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {isLoadedProducts}
          </div>
        ) : (
          <>
            <AliceCarousel
              activeIndex={productsCarouselActiveIndex}
              onSlideChanged={(e) => setProductsCarouselActiveIndex(e.item)}
              mouseTracking={width < LARGE_SCREEN ? true : false}
              items={items}
              responsive={productDealsResponsive}
              controlsStrategy={width < LARGE_SCREEN ? "responsive" : "alternate"}
              disableDotsControls={true}
              disableButtonsControls={width < LARGE_SCREEN}
            />
            {width < LARGE_SCREEN && <SwipeToSeeMore />}
          </>
        )}
        <Row className="my-3">
          <Col style={{ maxWidth: "70%" }}>
            <h6 className="font-face-poppins-bold" style={{ marginBottom: "16px" }}>
              Nossos artesãos
            </h6>
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
            {isLoadedAdmins}
          </div>
        ) : (
          <>
            <AliceCarousel
              activeIndex={accountsCarouselActiveIndex}
              onSlideChanged={(e) => setAccountsCarouselActiveIndex(e.item)}
              mouseTracking={width < LARGE_SCREEN ? true : false}
              items={admins}
              responsive={adminsResponsive}
              controlsStrategy={width < LARGE_SCREEN ? "responsive" : "alternate"}
              disableDotsControls={true}
              disableButtonsControls={width < LARGE_SCREEN}
            />
            {width < LARGE_SCREEN && <SwipeToSeeMore />}
          </>
        )}
        <Row className="my-3">
          <Col style={{ maxWidth: "70%" }}>
            <h6 className="font-face-poppins-bold" style={{ marginBottom: "16px" }}>
              Nossas vantagens
            </h6>
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
