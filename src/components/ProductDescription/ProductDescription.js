import React, { useEffect, useState } from "react"
import { useLocation, useHistory, useParams } from "react-router-dom"
import { Card, Carousel, Button, Container, ListGroup } from "react-bootstrap"
import axios from "axios"
import SendMessageWhatsAppButton from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import { ACCOUNTS_ENDPOINT, API, PRODUCT_ENDPOINT } from "../../constants/constants"
import SimilarProducts from "../SimilarProducts/SimilarProducts"
import LightingDealWaterMark from "../LightingDealWaterMark/LightingDealWaterMark"
import { pageStates } from "../ProductContainer/ProductContainer"
import {
  HomeButtonContent,
  LightingDealsButtonContent,
} from "../ButtonContent/ButtonContent"

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
  const [lightingDealPrice, setLightingDealPrice] = useState()
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
        setPrice(
          response.data.Item.PRODUCT_PRICE.N || response.data.Item.PRODUCT_PRICE.S
        )
        setImages(response.data.Item.PRODUCT_IMAGES.L.map((item) => item.S))
        setTags(response.data.Item.PRODUCT_TAGS.SS)

        const productType = response.data.Item?.PRODUCT_TYPE?.S
        setProductType(productType)

        if (productType === "LIGHTING_DEAL") {
          setLightingDealPrice(response.data.Item.LIGHTING_DEAL_PRICE.S)
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
      if (location.state.productType === "LIGHTING_DEAL") {
        setLightingDealPrice(location.state.lightingDealPrice)
        setLightingDealDuration(location.state.lightingDealDuration)
        setLightingDealStartTime(location.state.lightingDealStartTime)
      }
    } else {
      fetchData()
    }
  }, [id])

  const isLightingDeal =
    lightingDealPrice && lightingDealDuration && lightingDealStartTime

  return (
    <div>
      <Container>
        <div style={{ display: "flex" }}>
          <Button
            style={{ margin: "0 auto" }}
            onClick={() =>
              history.push({
                pathname: pageStates.HOME.pathname,
                state: { isLightingDeal: false },
              })
            }
          >
            <HomeButtonContent />
          </Button>
          <Button
            style={{ margin: "0 auto" }}
            onClick={() =>
              history.push({
                pathname: pageStates.LIGHTING_DEALS.pathname,
                state: { isLightingDeal: true },
              })
            }
          >
            <LightingDealsButtonContent />
          </Button>
        </div>
        <Card style={{ width: "22rem", margin: "0 auto" }}>
          {images &&
            (images.length > 1 ? (
              <Carousel interval={null}>
                {images?.map((item, i) => {
                  return (
                    <Carousel.Item key={i}>
                      <img
                        className="w-100"
                        height="256px"
                        src={item}
                        alt={`${i} image`}
                      />
                    </Carousel.Item>
                  )
                })}
              </Carousel>
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
              {isLightingDeal ? (
                <div style={{ display: "block ruby" }}>
                  Preço:{" "}
                  <div
                    style={{ textDecoration: "line-through", color: "lightgray" }}
                  >
                    R$ {price}
                  </div>{" "}
                  R$ {lightingDealPrice}
                </div>
              ) : (
                <div>R$ {price}</div>
              )}
            </ListGroup.Item>
            <ListGroup.Item className="notranslate">
              Vendido por: {commercialName}
            </ListGroup.Item>
          </ListGroup>
          <SendMessageWhatsAppButton
            id={id}
            name={name}
            price={isLightingDeal ? lightingDealPrice : price}
            phoneNumber={phoneNumber}
          />
        </Card>
      </Container>
      <SimilarProducts tags={tags} />
    </div>
  )
}
