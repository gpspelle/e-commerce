import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Container } from "react-bootstrap"

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
import MemoizedSimilarProductsMobile from "../components/SimilarProductsMobile/SimilarProductsMobile"
import ProductSellTypeInfo from "../components/Product/ProductSellTypeInfo/ProductSellTypeInfo"
import NoProductFoundMessage from "../components/NoProductFoundMessage/NoProductFoundMessage"
import AboutAdmin from "../components/Admin/AboutAdmin"
import scrollToTop from "../utils/scrollToTop"
import NavigationBar from "../components/NavigationBar/NavigationBar"
import Footer from "../components/Footer/Footer"
import { getAccountFromDatabase, getProductFromDatabase } from "../actions/database"
import { getEmptyProduct } from "../entities/product"
import SearchBar from "../components/Search/SearchBar"

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
    if (
      !productData.phoneNumber ||
      !productData.commercialName ||
      !productData.cropProfilePhoto ||
      !productData.aboutMe ||
      !productData.aboutProducts
    ) {
      getAccountFromDatabase({
        accountId: productData.productOwnerId,
        productData,
        setProductData,
      })
    }
  }, [productData])

  useEffect(() => {
    scrollToTop()
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
    <div style={{ visibility: isFullScreen ? "hidden" : "" }}>
      <div
        style={{
          display: isFullScreen ? "none" : "",
        }}
      >
        <NavigationBar />
        <SearchBar />
      </div>
      <Container>
        <h6
          style={{ marginBottom: "16px", display: isFullScreen ? "none" : "" }}
          className="font-face-poppins-bold"
        >
          {name}
        </h6>
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
        {isDeal || isLightningDeal ? (
          <div className="notranslate">
            <h6
              className={
                isLightningDeal ? "helper-error-color" : "helper-warning-color"
              }
              style={{ textDecoration: "line-through", marginBottom: "0px" }}
            >
              R$ {price}
            </h6>
            <h4 style={{ marginBottom: isLightningDeal ? "5px" : "32px" }}>
              R$ {dealPrice}
            </h4>
          </div>
        ) : (
          <h4
            style={{
              marginTop: "32px",
              marginBottom: "32px",
            }}
          >
            R$ {price}
          </h4>
        )}
        {isLightningDeal && (
          <LightningDealDuration
            isProductDescription={true}
            lightningDealDuration={lightningDealDuration}
            lightningDealStartTime={lightningDealStartTime}
          />
        )}
        <h6
          style={{
            display: "flex",
            flexFlow: "row wrap",
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
          className="primary-background"
          style={{
            paddingTop: "16px",
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
            paddingTop: "16px",
            paddingBottom: "32px",
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
        <h6
          style={{ marginBottom: "16px" }}
          className="font-face-poppins-bold dark-dark-color"
        >
          Sobre o artesão
        </h6>
        <AboutAdmin isComplete={true} account={account} screenWidth={width} />
      </Container>
      <MemoizedSimilarProductsMobile id={id} tags={tags} />
      <Footer />
    </div>
  )
}
