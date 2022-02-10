import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Container } from "react-bootstrap"

import useWindowDimensions from "../../hooks/useWindowDimensions"
import useScrollBlock from "../../hooks/useScrollBlock"
import SendMessageWhatsAppButton, {
  sendBuyWhatsAppMessage,
} from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import { PRODUCT_TYPES } from "../../constants/constants"
import LightingDealDuration from "../LightingDealDuration/LightingDealDuration"
import ImageCarousel from "../ImageCarousel/ImageCarousel"
import { getIsDeal } from "../../utils/dealUtils"
import { getIsLightingDeal } from "../../utils/lightingDealUtils"
import MemoizedSimilarProductsMobile from "../SimilarProductsMobile/SimilarProductsMobile"
import ProductStockInfo from "../ProductStockInfo/ProductStockInfo"
import NoProductFoundMessage from "../NoProductFoundMessage/NoProductFoundMessage"
import AboutAdmin from "../AdminDescription/AboutAdmin"
import scrollToTop from "../../utils/scrollToTop"
import NavigationBar from "../NavigationBar/NavigationBar"
import Footer from "../Footer/Footer"
import {
  getAccountFromDatabase,
  getProductFromDatabase,
} from "../../actions/database"
import "./ProductDescriptionMobile.css"

export default function ProductDescriptionMobile() {
  const location = useLocation()
  const [productData, setProductData] = useState({
    name: undefined,
    price: undefined,
    images: [],
    productStock: undefined,
    description: undefined,
    phoneNumber: undefined,
    productOwnerId: undefined,
    productOwnerName: undefined,
    commercialName: undefined,
    cropProfilePhoto: undefined,
    aboutMe: undefined,
    aboutProducts: undefined,
    email: undefined,
    tags: [],
    productType: undefined,
    dealPrice: undefined,
    lightingDealDuration: undefined,
    lightingDealStartTime: undefined,
  })
  const [isFullScreen, setIsFullScreen] = useState(false)
  const { id } = useParams()
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
      <Container style={{ paddingTop: "82px" }}>
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
        <h2>{name}</h2>
        {isDeal ? (
          <div className="notranslate" style={{ display: "flex" }}>
            &nbsp;
            <div style={{ textDecoration: "line-through", color: "lightgray" }}>
              &nbsp;R$ {price}
            </div>{" "}
            &nbsp;R$ <div className="display-price">{dealPrice}</div>
          </div>
        ) : (
          <div className="notranslate" style={{ display: "flex" }}>
            <span> R$&nbsp;</span>
            <span className="display-price">{price}</span>
          </div>
        )}
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
        <ProductStockInfo productStock={productStock} />
        {isLightingDeal && (
          <LightingDealDuration
            isProductDescription={true}
            lightingDealDuration={lightingDealDuration}
            lightingDealStartTime={lightingDealStartTime}
          />
        )}
        <hr
          style={{
            color: "gray",
            backgroundColor: "gray",
            height: 1,
          }}
        />
        <h5>Detalhes do produto</h5>
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-around",
          }}
        >
          <div style={{ width: "30%" }}>Descrição</div>
          <div
            className="notranslate"
            style={{ width: "70%", wordWrap: "break-word" }}
          >
            {description}
          </div>
          <div style={{ width: "30%" }}>Vendido por</div>
          <div
            className="notranslate"
            style={{ width: "70%", wordWrap: "break-word" }}
          >
            {commercialName}
          </div>
          <div style={{ width: "30%" }}>Estoque</div>
          <div
            className="notranslate"
            style={{ width: "70%", wordWrap: "break-word" }}
          >
            {productStock !== undefined &&
              productStock > 1 &&
              `${productStock} unidades`}
            {(productStock === undefined || productStock === 1) && "1 unidade"}
            {productStock === 0 && "Sob encomenda"}
          </div>
        </div>
        <hr
          style={{
            color: "gray",
            backgroundColor: "gray",
            height: 1,
          }}
        />
        <h5 style={{ marginBottom: "22px" }}>Sobre o artesão</h5>
        <AboutAdmin
          isComplete={true}
          phoneNumber={phoneNumber}
          productOwnerName={productOwnerName}
          commercialName={commercialName}
          productOwnerId={productOwnerId}
          cropProfilePhoto={cropProfilePhoto}
          aboutMe={aboutMe}
          screenWidth={width}
          aboutProducts={aboutProducts}
        />
      </Container>
      <MemoizedSimilarProductsMobile id={id} tags={tags} />
      <Footer />
    </div>
  )
}
