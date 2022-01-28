import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import axios from "axios"
import SendMessageWhatsAppButton from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import {
  ACCOUNTS_ENDPOINT,
  REST_API,
  PRODUCT_TYPES,
  PRODUCT_ENDPOINT,
} from "../../constants/constants"
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
    return () => {
      setIsFullScreen(false)
      allowScroll()
    }
  }, [])

  useEffect(() => {
    const fetchAccount = async () => {
      if (productData.productOwnerId) {
        const body = {
          productOwnerIds: [productData.productOwnerId],
        }

        const response = await axios.get(`${REST_API}/${ACCOUNTS_ENDPOINT}`, {
          params: body,
        })

        const { commercial_name, phone_number } = response.data[0]
        setProductData({
          ...productData,
          commercialName: commercial_name,
          phoneNumber: phone_number,
        })
      }
    }

    fetchAccount()
  }, [productData.productOwnerId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {
          id,
        }

        const response = await axios.get(`${REST_API}/${PRODUCT_ENDPOINT}`, {
          params: body,
        })

        setFailedToFetchProduct(false)
        const data = {}
        data.id = response.data.Item.id.S
        data.name = response.data.Item.PRODUCT_NAME.S
        data.description = response.data.Item.PRODUCT_DESCRIPTION.S
        data.price = response.data.Item.PRODUCT_PRICE.N
        data.images = response.data.Item.PRODUCT_IMAGES.L.map((item) => item.S)
        data.productImagesResized = response.data.Item.PRODUCT_IMAGES_RESIZED?.L.map(
          (item) => item.S
        )
        data.productOwnerId = response.data.Item.PRODUCT_OWNER_ID?.S
        data.tags = response.data.Item?.PRODUCT_TAGS?.SS
        data.productType = response.data.Item?.PRODUCT_TYPE?.S
        data.productStock = response.data.Item.PRODUCT_STOCK?.N
          ? parseInt(response.data.Item.PRODUCT_STOCK.N)
          : 1
        if (productType === PRODUCT_TYPES.DEAL) {
          data.dealPrice = response.data.Item.DEAL_PRICE.N
        } else if (productType === PRODUCT_TYPES.LIGHTING_DEAL) {
          data.dealPrice = response.data.Item.DEAL_PRICE.N
          data.lightingDealDuration = response.data.Item.LIGHTING_DEAL_DURATION.S
          data.lightingDealStartTime = response.data.Item.LIGHTING_DEAL_START_TIME.S
        }

        setProductData({ ...productData, ...data })
      } catch (e) {
        setFailedToFetchProduct(true)
      }
    }

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
      fetchData()
    }
  }, [id])

  if (failedToFetchProduct) {
    return <NoProductFoundMessage screenWidth={width} />
  }

  const {
    name,
    price,
    images,
    productStock,
    productImagesResized,
    description,
    phoneNumber,
    commercialName,
    tags,
    productType,
    dealPrice,
    lightingDealStartTime,
    lightingDealDuration,
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
                <h2 className="notranslate" style={{ marginBottom: "0px" }}>
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
                  isDeal={isDeal}
                  id={id}
                  name={name}
                  price={isDeal ? dealPrice : price}
                  phoneNumber={phoneNumber}
                  commercialName={commercialName}
                />
              </Col>
            </>
          )}
        </Row>
      </Container>
      <MemoizedSimilarProducts id={id} screenWidth={width} tags={tags} />
    </div>
  )
}
