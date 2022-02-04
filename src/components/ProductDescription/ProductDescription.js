import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import SendMessageWhatsAppButton, {
  sendBuyWhatsAppMessage,
} from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import { PRODUCT_TYPES } from "../../constants/constants"
import LightingDealDuration from "../LightingDealDuration/LightingDealDuration"
import ImageCarousel from "../ImageCarousel/ImageCarousel"
import { getIsDeal } from "../../utils/DealUtils"
import { getIsLightingDeal } from "../../utils/LightingDealUtils"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import useScrollBlock from "../../hooks/useScrollBlock"
import MemoizedSimilarProducts from "../SimilarProducts/SimilarProducts"
import NoProductFoundMessage from "../NoProductFoundMessage/NoProductFoundMessage"
import ProductStockInfo from "../ProductStockInfo/ProductStockInfo"
import "./ProductDescription.css"
import scrollToTop from "../../utils/scrollToTop"
import AboutAdmin from "../AdminDescription/AboutAdmin"
import Footer from "../Footer/Footer"
import NavigationBar from "../NavigationBar/NavigationBar"
import {
  getAccountFromDatabase,
  getProductFromDatabase,
} from "../../actions/database"

export default function ProductDescription() {
  const location = useLocation()
  const { id } = useParams()
  const [productData, setProductData] = useState({
    name: undefined,
    price: undefined,
    images: [],
    productStock: undefined,
    description: undefined,
    phoneNumber: undefined,
    productOwnerId: undefined,
    commercialName: undefined,
    tags: [],
    productType: undefined,
    dealPrice: undefined,
    lightingDealDuration: undefined,
    lightingDealStartTime: undefined,
  })
  const [isFullScreen, setIsFullScreen] = useState(false)
  const { width, height } = useWindowDimensions()
  const [blockScroll, allowScroll] = useScrollBlock()
  const [failedToFetchProduct, setFailedToFetchProduct] = useState(false)

  useEffect(() => {
    scrollToTop()
    return () => {
      setIsFullScreen(false)
      allowScroll()
    }
  }, [])

  useEffect(() => {
    getAccountFromDatabase({
      accountId: productData.productOwnerId,
      productData,
      setProductData,
    })
  }, [productData.productOwnerId])

  useEffect(() => {
    if (location.state) {
      const data = {}
      data.id = location.state.id
      data.name = location.state.name
      data.description = location.state.description
      data.price = location.state.price
      data.images = location.state.images
      data.productImagesResized = location.state.productImagesResized
      data.productOwnerId = location.state.productOwnerId

      data.tags = location.state.tags
      data.productType = location.state.productType
      data.productStock = location.state.productStock

      if (location.state.phoneNumber) data.phoneNumber = location.state.phoneNumber
      if (location.state.commercialName)
        data.commercialName = location.state.commercialName

      if (location.state.productType === PRODUCT_TYPES.DEAL) {
        data.dealPrice = location.state.dealPrice
      } else if (location.state.productType === PRODUCT_TYPES.LIGHTING_DEAL) {
        data.dealPrice = location.state.dealPrice
        data.lightingDealDuration = location.state.lightingDealDuration
        data.lightingDealStartTime = location.state.lightingDealStartTime
      }

      setProductData({ ...productData, ...data })
    } else {
      getProductFromDatabase({
        productId: id,
        setFailedToFetchProduct,
        productData,
        setProductData,
      })
    }
  }, [id])

  if (failedToFetchProduct) {
    return (
      <>
        <NavigationBar />
        <NoProductFoundMessage screenWidth={width} />
        <Footer />
      </>
    )
  }

  const {
    name,
    price,
    images,
    productImagesResized,
    description,
    phoneNumber,
    commercialName,
    productOwnerName,
    cropProfilePhoto,
    productOwnerId,
    aboutMe,
    aboutProducts,
    email,
    tags,
    productType,
    dealPrice,
    lightingDealStartTime,
    lightingDealDuration,
    productStock,
  } = productData

  const isDeal = getIsDeal(productType)
  const isLightingDeal = getIsLightingDeal(productType)
  const imagesIsDefined = images.length > 0

  return (
    <div
      style={{
        visibility: isFullScreen ? "hidden" : "",
      }}
    >
      <NavigationBar />
      <Container style={{ paddingTop: "40px" }}>
        <Row>
          {isFullScreen ? (
            <Col>
              {imagesIsDefined && (
                <ImageCarousel
                  isFullScreen={isFullScreen}
                  setIsFullScreen={setIsFullScreen}
                  images={images}
                  screenWidth={width}
                  screenHeight={height}
                  allowScroll={allowScroll}
                  blockScroll={blockScroll}
                  productImagesResized={productImagesResized}
                  isLightingDeal={isLightingDeal}
                />
              )}
            </Col>
          ) : (
            <>
              <Col style={{ maxWidth: "60%" }}>
                {imagesIsDefined && (
                  <ImageCarousel
                    isFullScreen={isFullScreen}
                    setIsFullScreen={setIsFullScreen}
                    images={images}
                    screenWidth={width}
                    screenHeight={height}
                    allowScroll={allowScroll}
                    blockScroll={blockScroll}
                    productImagesResized={productImagesResized}
                    isLightingDeal={isLightingDeal}
                  />
                )}
              </Col>
              <Col style={{ maxWidth: "40%" }}>
                <h2
                  className="notranslate"
                  style={{ marginBottom: isLightingDeal ? "0px" : "1rem" }}
                >
                  {name}
                </h2>
                {isLightingDeal && (
                  <LightingDealDuration
                    isProductDescription={true}
                    lightingDealDuration={lightingDealDuration}
                    lightingDealStartTime={lightingDealStartTime}
                  />
                )}
                {isDeal ? (
                  <div className="notranslate my-4" style={{ display: "flex" }}>
                    <h5
                      style={{ textDecoration: "line-through", color: "lightgray" }}
                    >
                      &nbsp;R$ {price}
                    </h5>{" "}
                    &nbsp;
                    <div style={{ display: "flex" }}>
                      <h5>R$ </h5>
                      <h1 className="display-price">{dealPrice}</h1>
                    </div>
                  </div>
                ) : (
                  <div className="notranslate" style={{ display: "flex" }}>
                    <h5> R$&nbsp;</h5>
                    <h1 className="display-price">{price}</h1>
                  </div>
                )}
                <h5 className="notranslate my-4">{description}</h5>
                <h6
                  className="notranslate"
                  style={{ marginTop: "1rem", marginBottom: "0" }}
                >
                  Vendido por
                </h6>
                <h6 className="notranslate">{commercialName}</h6>
                <h6
                  style={{ marginTop: "1rem", marginBottom: "0" }}
                  className="notranslate"
                >
                  <ProductStockInfo productStock={productStock} />
                </h6>
                <SendMessageWhatsAppButton
                  style={{
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    width: "20rem",
                    margin: "0 auto",
                  }}
                  messageFunction={() =>
                    sendBuyWhatsAppMessage({
                      isDeal,
                      id,
                      name,
                      price: isDeal ? dealPrice : price,
                      phoneNumber,
                      commercialName,
                    })
                  }
                  phoneNumber={phoneNumber}
                  commercialName={commercialName}
                  text={"Gostei desse"}
                />
              </Col>
              <h5 style={{ marginBottom: "22px" }}>Sobre o artesão</h5>
              <AboutAdmin
                isComplete={true}
                productOwnerName={productOwnerName}
                commercialName={commercialName}
                productOwnerId={productOwnerId}
                cropProfilePhoto={cropProfilePhoto}
                aboutMe={aboutMe}
                screenWidth={width}
                aboutProducts={aboutProducts}
              />
            </>
          )}
        </Row>
      </Container>
      <MemoizedSimilarProducts id={id} screenWidth={width} tags={tags} />
      <Footer />
    </div>
  )
}
