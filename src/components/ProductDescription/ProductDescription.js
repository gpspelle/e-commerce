import React, { useEffect, useState } from "react"
import { useLocation, useHistory, useParams } from "react-router-dom"
import { Card, Carousel, Button, Container } from "react-bootstrap"
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
    } else {
      fetchData()
    }
  }, [id])

  return (
    <Container>
      <Card style={{ width: "50%", margin: "0 auto" }}>
        <div style={{ display: "flex" }}>
          <Button onClick={() => history.push("/")}>Voltar</Button>
          <h3 style={{ margin: "0 auto" }}>{name}</h3>
          <SendMessageWhatsAppButton
            id={id}
            name={name}
            price={price}
            phoneNumber={phoneNumber}
          />
        </div>
        {images &&
          (images.length > 1 ? (
            <Carousel interval={null}>
              {images?.map((item, i) => {
                return (
                  <Carousel.Item key={i}>
                    <img width="100%" height="100%" src={item} alt={`${i} image`} />
                  </Carousel.Item>
                )
              })}
            </Carousel>
          ) : (
            <img width="100%" height="100%" src={images[0]} alt="image" />
          ))}
      </Card>
      <SimilarProducts tags={tags} />
    </Container>
  )
}
