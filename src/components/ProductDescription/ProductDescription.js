import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Card, Container, ListGroup } from "react-bootstrap"
import axios from "axios"
import SendMessageWhatsAppButton from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import {
  ACCOUNTS_ENDPOINT,
  API,
  PRODUCT_TYPES,
  PRODUCT_ENDPOINT,
} from "../../constants/constants"
import SimilarProductsMobile from "../SimilarProductsMobile/SimilarProductsMobile"
import SimilarProducts from "../SimilarProducts/SimilarProducts"
import LightingDealWaterMark from "../LightingDealWaterMark/LightingDealWaterMark"
import LightingDealDuration from "../LightingDealDuration/LightingDealDuration"
import ImageCarousel from "../ImageCarousel/ImageCarousel"
import { getIsDeal } from "../../utils/DealUtils"
import { getIsLightingDeal } from "../../utils/LightingDealUtils"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import useScrollBlock from "../../hooks/useScrollBlock"

export default function ProductDescription() {
  const location = useLocation()
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [images, setImages] = useState()
  const [description, setDescription] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [productOwnerId, setProductOwnerId] = useState()
  const [commercialName, setCommercialName] = useState()
  const [tags, setTags] = useState()
  const [productType, setProductType] = useState()
  const [dealPrice, setDealPrice] = useState()
  const [lightingDealDuration, setLightingDealDuration] = useState()
  const [lightingDealStartTime, setLightingDealStartTime] = useState()
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
      if (productOwnerId) {
        const body = {
          productOwnerIds: [productOwnerId],
        }

        const response = await axios.get(`${API}/${ACCOUNTS_ENDPOINT}`, {
          params: body,
        })

        setCommercialName(response.data[0].commercial_name)
        setPhoneNumber(response.data[0].phone_number)
      }
    }

    fetchAccount()
  }, [productOwnerId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {
          id,
        }

        const response = await axios.get(`${API}/${PRODUCT_ENDPOINT}`, {
          params: body,
        })

        setProductOwnerId(response.data.Item.PRODUCT_OWNER_ID.S)
        setName(response.data.Item.PRODUCT_NAME.S)
        setDescription(response.data.Item.PRODUCT_DESCRIPTION.S)
        setPrice(response.data.Item.PRODUCT_PRICE.N)
        setImages(response.data.Item.PRODUCT_IMAGES.L.map((item) => item.S))
        setTags(response.data.Item?.PRODUCT_TAGS?.SS)

        const productType = response.data.Item?.PRODUCT_TYPE?.S
        setProductType(productType)

        if (productType === PRODUCT_TYPES.DEAL) {
          setDealPrice(response.data.Item.DEAL_PRICE.N)
        } else if (productType === PRODUCT_TYPES.LIGHTING_DEAL) {
          setDealPrice(response.data.Item.DEAL_PRICE.N)
          setLightingDealDuration(response.data.Item.LIGHTING_DEAL_DURATION.S)
          setLightingDealStartTime(response.data.Item.LIGHTING_DEAL_START_TIME.S)
        }
      } catch (e) {
        console.error(e)
      }
    }

    if (location.state) {
      setName(location.state.name)
      setDescription(location.state.description)
      setPrice(location.state.price)
      setImages(location.state.images)
      setProductOwnerId(location.state.productOwnerId)
      if (location.state.phoneNumber) setPhoneNumber(location.state.phoneNumber)
      setTags(location.state.tags)
      if (location.state.commercialName)
        setCommercialName(location.state.commercialName)

      setProductType(location.state.productType)
      if (location.state.productType === PRODUCT_TYPES.DEAL) {
        setDealPrice(location.state.dealPrice)
      } else if (location.state.productType === PRODUCT_TYPES.LIGHTING_DEAL) {
        setDealPrice(location.state.dealPrice)
        setLightingDealDuration(location.state.lightingDealDuration)
        setLightingDealStartTime(location.state.lightingDealStartTime)
      }
    } else {
      fetchData()
    }
  }, [id])

  const isDeal = getIsDeal(productType)
  const isLightingDeal = getIsLightingDeal(productType)
  const imagesIsDefined = images && images.length > 0

  return (
    <div
      style={{
        visibility: isFullScreen ? "hidden" : "",
      }}
    >
      <Container style={{ paddingTop: "40px" }}>
        <Card style={{ width: "20rem", margin: "0 auto" }}>
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
          {isLightingDeal && <LightingDealWaterMark />}
          <Card.Header as="h4">Detalhes do produto</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item className="notranslate">Nome: {name}</ListGroup.Item>
            <ListGroup.Item className="notranslate">
              Descrição: {description}
            </ListGroup.Item>
            <ListGroup.Item className="notranslate">
              {isDeal ? (
                <div style={{ display: "flex" }}>
                  Preço:&nbsp;
                  <div
                    style={{ textDecoration: "line-through", color: "lightgray" }}
                  >
                    &nbsp;R$ {price}
                  </div>{" "}
                  &nbsp;R$ {dealPrice}
                </div>
              ) : (
                <div>Preço: R$ {price}</div>
              )}
            </ListGroup.Item>
            <ListGroup.Item className="notranslate">
              Vendido por: {commercialName}
            </ListGroup.Item>
            {isLightingDeal && (
              <ListGroup.Item className="notranslate">
                <div>Tempo restante da promoção:</div>
                <LightingDealDuration
                  lightingDealDuration={lightingDealDuration}
                  lightingDealStartTime={lightingDealStartTime}
                />{" "}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
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
          isLightingDeal={isLightingDeal}
        />
      </Container>
      <SimilarProducts id={id} screenWidth={width} tags={tags} />
    </div>
  )
}
