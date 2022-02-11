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
import "./ProductDescriptionMobile.css"

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
            isLightningDeal={isLightningDeal}
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
        <ProductSellTypeInfo
          productStock={productStock}
          productSellTypes={productSellTypes}
        />
        {isLightningDeal && (
          <LightningDealDuration
            isProductDescription={true}
            lightningDealDuration={lightningDealDuration}
            lightningDealStartTime={lightningDealStartTime}
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
