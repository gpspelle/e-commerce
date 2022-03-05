import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Container } from "react-bootstrap"

import useWindowDimensions from "../../hooks/useWindowDimensions"
import useScrollBlock from "../../hooks/useScrollBlock"
import SendMessageWhatsAppButton, {
  sendBuyWhatsAppMessage,
} from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import LightningDealDuration from "../LightningDeal/LightningDealDuration"
import ImageCarousel from "../ImageCarousel/ImageCarousel"
import { getIsDeal } from "../../utils/dealUtils"
import { getIsLightningDeal } from "../../utils/lightningDealUtils"
import MemoizedSimilarProductsMobile from "../SimilarProductsMobile/SimilarProductsMobile"
import ProductSellTypeInfo from "../ProductSellTypeInfo/ProductSellTypeInfo"
import NoProductFoundMessage from "../NoProductFoundMessage/NoProductFoundMessage"
import AboutAdmin from "../AdminDescription/AboutAdmin"
import scrollToTop from "../../utils/scrollToTop"
import NavigationBar from "../NavigationBar/NavigationBar"
import Footer from "../Footer/Footer"
import {
  getAccountFromDatabase,
  getProductFromDatabase,
} from "../../actions/database"
import { getEmptyProduct } from "../../entities/product"
import SearchBar from "../SearchBar/SearchBar"

export default function ProductDescriptionMobile() {
  const location = useLocation()
  const [productData, setProductData] = useState(getEmptyProduct())
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
      setProductData({ ...productData, ...location.state })
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
        <SearchBar />
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
    lightningDealStartTime,
    lightningDealDuration,
    productStock,
    productSellTypes,
  } = productData

  const isDeal = getIsDeal(productType)
  const isLightningDeal = getIsLightningDeal(productType)
  const imagesIsDefined = images.length > 0

  return (
    <div
      style={{
        visibility: isFullScreen ? "hidden" : "",
      }}
    >
      <NavigationBar />
      <SearchBar />

      <Container>
        <h6 style={{ marginBottom: "16px" }} className="font-face-poppins-bold">
          {name}
        </h6>
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
            isLightningDeal={isLightningDeal}
          />
        )}
        {isDeal ? (
          <div className="notranslate">
            <h7
              className={
                isLightningDeal ? "helper-error-color" : "helper-warning-color"
              }
              style={{ textDecoration: "line-through", marginBottom: "0px" }}
            >
              R$ {price}
            </h7>
            <h4 style={{ marginBottom: "32px" }}>R$ {dealPrice}</h4>
          </div>
        ) : (
          <h4 style={{ marginTop: "32px", marginBottom: "32px" }}>R$ {price}</h4>
        )}
        <h6
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-around",
            marginBottom: "16px",
            justifyContent: "left",
          }}
        >
          {description}
        </h6>
        <ProductSellTypeInfo
          productStock={productStock}
          productSellTypes={productSellTypes}
        />
        <SendMessageWhatsAppButton
          style={{
            paddingTop: "16px",
            paddingBottom: "32px",
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
        {isLightningDeal && (
          <LightningDealDuration
            isProductDescription={true}
            lightningDealDuration={lightningDealDuration}
            lightningDealStartTime={lightningDealStartTime}
          />
        )}
        <h6
          style={{ marginBottom: "16px" }}
          className="font-face-poppins-bold dark-dark-color"
        >
          Sobre o artesão
        </h6>
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
