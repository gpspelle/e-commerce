import React, { useEffect, useState } from "react"
import { useLocation, useHistory, useParams } from "react-router-dom"
import { Card, Carousel, Button, Container, ListGroup } from "react-bootstrap"
import axios from "axios"
import SendMessageWhatsAppButton from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import { ACCOUNTS_ENDPOINT, API, PRODUCT_ENDPOINT } from "../../constants/constants"
import SimilarProducts from "../SimilarProducts/SimilarProducts"

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

        console.log(response.data[0])
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
        setPrice(response.data.Item.PRODUCT_PRICE.S)
        setImages(response.data.Item.PRODUCT_IMAGES.L.map((item) => item.S))
        setTags(response.data.Item.PRODUCT_TAGS.SS)
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
    } else {
      fetchData()
    }
  }, [id])

  return (
    <Container>
      <div style={{ display: "flex" }}>
        <Button onClick={() => history.push("/")}>Voltar</Button>
      </div>
      <Card>
        {images &&
          (images.length > 1 ? (
            <Carousel interval={null}>
              {images?.map((item, i) => {
                return (
                  <Carousel.Item key={i}>
                    <img
                      className="d-block w-100"
                      width="256px"
                      height="256px"
                      src={item}
                      alt={`${i} image`}
                    />
                  </Carousel.Item>
                )
              })}
            </Carousel>
          ) : (
            <img
              className="d-block w-100"
              width="256px"
              height="256px"
              src={images[0]}
              alt="image"
            />
          ))}
        <Card.Header as="h4">Detalhes do produto</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Nome: {name}</ListGroup.Item>
          <ListGroup.Item>Descrição: {description}</ListGroup.Item>
          <ListGroup.Item>Preço: {price}</ListGroup.Item>
          <ListGroup.Item>Vendido por: {commercialName}</ListGroup.Item>
        </ListGroup>
        <SendMessageWhatsAppButton
          id={id}
          name={name}
          price={price}
          phoneNumber={phoneNumber}
        />
      </Card>
      <SimilarProducts tags={tags} />
    </Container>
  )
}
