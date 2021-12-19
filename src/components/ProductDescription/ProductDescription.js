import React, { useEffect, useState } from "react"
import { useLocation, useHistory, useParams } from "react-router-dom"
import { Card, Carousel, Button } from "react-bootstrap"
import axios from "axios"
import SendMessageWhatsAppButton from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import { API, PRODUCT_ENDPOINT } from "../../constants/constants"

export default function ProductDescription() {
  const location = useLocation()
  const history = useHistory()
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [images, setImages] = useState()
  const [description, setDescription] = useState()
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {
          id,
        }

        const response = await axios.get(`${API}/${PRODUCT_ENDPOINT}`, {
          params: body,
        })

        setName(response.data.Item.PRODUCT_NAME.S)
        setDescription(response.data.Item.PRODUCT_DESCRIPTION.S)
        setPrice(response.data.Item.PRODUCT_PRICE.S)
        setImages(response.data.Item.PRODUCT_IMAGES.L.map((item) => item.S))
      } catch (e) {
        console.error(e)
      }
    }

    if (location.state) {
      setName(location.state.name)
      setDescription(location.state.description)
      setPrice(location.state.price)
      setImages(location.state.images)
    } else {
      fetchData()
    }
  }, [])

  return (
    <Card style={{ width: "50%", margin: "0 auto" }}>
      <div style={{ display: "flex" }}>
        <Button onClick={() => history.push("/")}>Voltar</Button>
        <h3 style={{ margin: "0 auto" }}>{name}</h3>
        <SendMessageWhatsAppButton id={id} name={name} price={price} />
      </div>
      <Carousel interval={null}>
        {images?.map((item, i) => {
          return (
            <Carousel.Item key={i}>
              <img width="100%" height="100%" src={item} alt={`${i} image`} />
            </Carousel.Item>
          )
        })}
      </Carousel>
    </Card>
  )
}
