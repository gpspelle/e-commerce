import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Container } from "react-bootstrap"
import axios from "axios"
import SendMessageWhatsAppButton from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import {
  ACCOUNTS_ENDPOINT,
  API,
  PRODUCT_TYPES,
  PRODUCT_ENDPOINT,
} from "../../constants/constants"
import SimilarProductsMobile from "../SimilarProductsMobile/SimilarProductsMobile"
import LightingDealWaterMark from "../LightingDealWaterMark/LightingDealWaterMark"
import LightingDealDuration from "../LightingDealDuration/LightingDealDuration"
import ImageCarousel from "../ImageCarousel/ImageCarousel"
import { getIsDeal } from "../../utils/DealUtils"
import { getIsLightingDeal } from "../../utils/LightingDealUtils"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import useScrollBlock from "../../hooks/useScrollBlock"

export default function ProductDescriptionMobile() {
  const location = useLocation()
  const [productData, setProductData] = useState({
    name: undefined,
    price: undefined,
    images: [],
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
  const { id } = useParams()
  const { width, height } = useWindowDimensions()
  const [blockScroll, allowScroll] = useScrollBlock()

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

        const response = await axios.get(`${API}/${ACCOUNTS_ENDPOINT}`, {
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

        const response = await axios.get(`${API}/${PRODUCT_ENDPOINT}`, {
          params: body,
        })

        const data = {}
        data.name = response.data.Item.PRODUCT_NAME.S
        data.description = response.data.Item.PRODUCT_DESCRIPTION.S
        data.price = response.data.Item.PRODUCT_PRICE.N
        data.images = response.data.Item.PRODUCT_IMAGES.L.map((item) => item.S)
        data.productOwnerId = response.data.Item.PRODUCT_OWNER_ID.S
        data.tags = response.data.Item?.PRODUCT_TAGS?.SS
        data.productType = response.data.Item?.PRODUCT_TYPE?.S

        if (productType === PRODUCT_TYPES.DEAL) {
          data.dealPrice = response.data.Item.DEAL_PRICE.N
        } else if (productType === PRODUCT_TYPES.LIGHTING_DEAL) {
          data.dealPrice = response.data.Item.DEAL_PRICE.N
          data.lightingDealDuration = response.data.Item.LIGHTING_DEAL_DURATION.S
          data.lightingDealStartTime = response.data.Item.LIGHTING_DEAL_START_TIME.S
        }

        setProductData({ ...productData, ...data })
      } catch (e) {
        console.error(e)
      }
    }

    if (location.state) {
      const data = {}
      data.name = location.state.name
      data.description = location.state.description
      data.price = location.state.price
      data.images = location.state.images
      data.productOwnerId = location.state.productOwnerId

      data.tags = location.state.tags
      data.productType = location.state.productType

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

  const {
    name,
    price,
    images,
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
          />
        )}
        {isLightingDeal && <LightingDealWaterMark isProductDescription={true} />}
        {<h2>{name}</h2>}
        {isDeal ? (
          <div className="notranslate" style={{ display: "flex" }}>
            Preço:&nbsp;
            <div style={{ textDecoration: "line-through", color: "lightgray" }}>
              &nbsp;R$ {price}
            </div>{" "}
            &nbsp;R$ {dealPrice}
          </div>
        ) : (
          <div className="notranslate">Preço: R$ {price}</div>
        )}
        <SendMessageWhatsAppButton
          style={{
            paddingTop: "12px",
            paddingBottom: "12px",
            width: "20rem",
            margin: "0 auto",
          }}
          id={id}
          name={name}
          price={isDeal ? dealPrice : price}
          phoneNumber={phoneNumber}
          commercialName={commercialName}
        />
        {isLightingDeal && (
          <LightingDealDuration
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
        </div>
        <hr
          style={{
            color: "gray",
            backgroundColor: "gray",
            height: 1,
          }}
        />
      </Container>
      <SimilarProductsMobile id={id} screenWidth={width} tags={tags} />
    </div>
  )
}
