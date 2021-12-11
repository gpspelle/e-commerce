import React from "react"
import { useLocation, useHistory } from "react-router-dom"
import { Card, Carousel, Button } from "react-bootstrap"

export default function ProductDescription() {
  const location = useLocation()
  const history = useHistory()
  const name = location.state.name
  const images = location.state.images
  return (
    <Card style={{ width: "50%", margin: "0 auto" }}>
      <div style={{ display: "flex" }}>
        <Button onClick={() => history.goBack()}>Voltar</Button>
        <h3 style={{ margin: "0 auto" }}>{name}</h3>
      </div>
      <Carousel interval={null}>
        {images?.map((item, i) => {
          return (
            <Carousel.Item key={i} style={{ height: "100vh" }}>
              <img width="100%" height="100%" src={item} alt={`${i} image`} />
            </Carousel.Item>
          )
        })}
      </Carousel>
    </Card>
  )
}
