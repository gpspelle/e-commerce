import React, { useEffect, useState } from "react"
import { useLocation, useHistory, useParams } from "react-router-dom"
import { Card, Carousel, Button, Container, ListGroup } from "react-bootstrap"
import axios from "axios"
import SendMessageWhatsAppButton from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import {
  ACCOUNTS_ENDPOINT,
  API,
  PRODUCT_TYPES,
  PRODUCT_ENDPOINT,
} from "../../constants/constants"
import SimilarProducts from "../SimilarProducts/SimilarProducts"
import LightingDealWaterMark from "../LightingDealWaterMark/LightingDealWaterMark"
import { pageStates } from "../ProductContainer/ProductContainer"
import {
  HomeButtonContent,
  DealsButtonContent,
} from "../ButtonContent/ButtonContent"
import LightingDealDuration from "../LightingDealDuration/LightingDealDuration"
import ImageCarousel from "../ImageCarousel/ImageCarousel"
import { getIsDeal } from "../../utils/DealUtils"
import { getIsLightingDeal } from "../../utils/LightingDealUtils"

export default function ProductDescription() {
  const location = useLocation()
  const history = useHistory()
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
  const { id } = useParams()

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
        setTags(response.data.Item.PRODUCT_TAGS.SS)

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
  return (
    <div>
      <Container>
        <div style={{ display: "flex" }}>
          <Button
            variant="success"
            style={{ margin: "0 auto" }}
            onClick={() =>
              history.push({
                pathname: pageStates.HOME.pathname,
                state: { isDeal: false },
              })
            }
          >
            <HomeButtonContent />
          </Button>
          <Button
            variant="success"
            style={{ margin: "0 auto" }}
            onClick={() =>
              history.push({
                pathname: pageStates.DEALS.pathname,
                state: { isDeal: true },
              })
            }
          >
            <DealsButtonContent />
          </Button>
        </div>
        <Card style={{ width: "20rem", margin: "0 auto" }}>
          {images &&
            (images.length > 1 ? (
              <ImageCarousel images={images} />
            ) : (
              <img className="w-100" height="256px" src={images[0]} alt="image" />
            ))}
          {isLightingDeal && <LightingDealWaterMark />}
          <Card.Header as="h4">Detalhes do produto</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item className="notranslate">Nome: {name}</ListGroup.Item>
            <ListGroup.Item className="notranslate">
              Descrição: {description}
            </ListGroup.Item>
            <ListGroup.Item className="notranslate">
              {isDeal ? (
                <div style={{ display: "block ruby" }}>
                  Preço:{" "}
                  <div
                    style={{ textDecoration: "line-through", color: "lightgray" }}
                  >
                    R$ {price}
                  </div>{" "}
                  R$ {dealPrice}
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
          style={{ paddingTop: "12px", width: "20rem", margin: "0 auto" }}
          id={id}
          name={name}
          price={isDeal ? dealPrice : price}
          phoneNumber={phoneNumber}
          isLightingDeal={isLightingDeal}
        />
      </Container>
      <SimilarProducts tags={tags} />
    </div>
  )
}
