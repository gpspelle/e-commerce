import React from "react"
import Carousel from "react-bootstrap/Carousel"
import Breadcrumb from "react-bootstrap/Breadcrumb"
import { useLocation } from "react-router-dom"

export default function ProductDescription() {
  const location = useLocation()

  const name = location.state.identifier
  const images = location.state.images
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>{name}</Breadcrumb.Item>
      </Breadcrumb>
      <h3>{name}</h3>
      <Carousel>
        {images?.map((item, i) => {
          return (
            <Carousel.Item key={i}>
              <img className="d-block w-100" src={item} alt={`${i} image`} />
            </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  )
}
