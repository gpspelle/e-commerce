import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"

import useWindowDimensions from "../hooks/useWindowDimensions"
import useScrollBlock from "../hooks/useScrollBlock"
import SendMessageWhatsAppButton, {
  sendBuyWhatsAppMessage,
  sendMakeOrderWhatsAppMessage,
} from "../components/SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import LightningDealDuration from "../components/Deals/LightningDealDuration"
import ImageCarousel from "../components/Image/ImageCarousel/ImageCarousel"
import { getIsDeal } from "../utils/dealUtils"
import { getIsLightningDeal } from "../utils/lightningDealUtils"
import MemoizedSimilarProducts from "../components/Product/SimilarProducts/SimilarProducts"
import NoProductFoundMessage from "../components/NoProductFoundMessage/NoProductFoundMessage"
import ProductSellTypeInfo from "../components/Product/ProductSellTypeInfo/ProductSellTypeInfo"
import scrollToTop from "../utils/scrollToTop"
import AboutAdmin from "../components/Admin/AboutAdmin"
import Footer from "../components/Footer/Footer"
import NavigationBar from "../components/NavigationBar/NavigationBar"
import { getAccountFromDatabase, getProductFromDatabase } from "../actions/database"
import { getEmptyProduct } from "../entities/product"
import "../hooks/ProductDescription.css"
import SearchBar from "../components/Search/SearchBar"

export default function ProductDescription() {
  const location = useLocation()
  const { id } = useParams()
  const [productData, setProductData] = useState(getEmptyProduct())
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
    tags,
    productType,
    dealPrice,
    lightningDealStartTime,
    lightningDealDuration,
    productStock,
    productSellTypes,
    facebookLink,
    instagramLink,
  } = productData

  const account = {
    id: productOwnerId,
    name: productOwnerName,
    commercial_name: commercialName,
    crop_profile_photo: cropProfilePhoto,
    phone_number: phoneNumber,
    about_me: aboutMe,
    about_products: aboutProducts,
    facebook_link: facebookLink,
    instagram_link: instagramLink,
  }

  const isDeal = getIsDeal(productType)
  const isLightningDeal = getIsLightningDeal(productType)
  const imagesIsDefined = images.length > 0

  return (
    <div
      style={{
        visibility: isFullScreen ? "hidden" : "",
      }}
    >
      <div style={{ display: isFullScreen ? "none" : "" }}>
        <NavigationBar />
        <SearchBar />
      </div>
      <Container>
        <Row>
          {isFullScreen ? (
            <Col>
              {imagesIsDefined && (
                <div style={{ marginTop: isFullScreen ? "32px" : "" }}>
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
                    isDeal={isDeal}
                    price={price}
                    dealPrice={dealPrice}
                  />
                </div>
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
                    isLightningDeal={isLightningDeal}
                    isDeal={isDeal}
                    price={price}
                    dealPrice={dealPrice}
                    key={images}
                  />
                )}
              </Col>
              <Col style={{ maxWidth: "40%" }}>
                <h2
                  className="notranslate"
                  style={{ marginBottom: isLightningDeal ? "0px" : "1rem" }}
                >
                  {name}
                </h2>
                {isLightningDeal && (
                  <LightningDealDuration
                    isProductDescription={true}
                    lightningDealDuration={lightningDealDuration}
                    lightningDealStartTime={lightningDealStartTime}
                  />
                )}
                {isDeal || isLightningDeal ? (
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
                  style={{ marginTop: "1rem", marginBottom: "0" }}
                  className="notranslate"
                >
                  <ProductSellTypeInfo
                    productStock={productStock}
                    productSellTypes={productSellTypes}
                  />
                </h6>
                <SendMessageWhatsAppButton
                  className="primary-background"
                  style={{
                    paddingTop: "16px",
                    paddingBottom: "16px",
                    width: "20rem",
                    margin: "0 auto",
                  }}
                  messageFunction={() =>
                    sendBuyWhatsAppMessage({
                      isDeal: isDeal || isLightningDeal,
                      id,
                      name,
                      price: isDeal || isLightningDeal ? dealPrice : price,
                      phoneNumber,
                      commercialName,
                    })
                  }
                  phoneNumber={phoneNumber}
                  commercialName={commercialName}
                  text={"Gostei desse"}
                />
                <SendMessageWhatsAppButton
                  className="secondary-background"
                  style={{
                    paddingBottom: "32px",
                    width: "20rem",
                    margin: "0 auto",
                  }}
                  messageFunction={() =>
                    sendMakeOrderWhatsAppMessage({
                      isDeal: isDeal || isLightningDeal,
                      id,
                      name,
                      price: isDeal || isLightningDeal ? dealPrice : price,
                      phoneNumber,
                      commercialName,
                    })
                  }
                  phoneNumber={phoneNumber}
                  commercialName={commercialName}
                  text={"Encomendar similar"}
                />
              </Col>
              <h5 style={{ marginBottom: "16px" }}>Sobre o artesão</h5>
              <AboutAdmin isComplete={true} account={account} screenWidth={width} />
            </>
          )}
        </Row>
      </Container>
      <MemoizedSimilarProducts id={id} screenWidth={width} tags={tags} />
      <Footer />
    </div>
  )
}
