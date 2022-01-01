import React, { useState, useEffect } from "react"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import ImageZoomCursor from "../ImageZoomCursor/ImageZoomCursor"
import "./ImageCarousel.css"
import useWindowDimensions from "../../hooks/useWindowDimensions"

const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 1 },
}

export default function ImageCarousel({ images }) {
  const [originalImagesDimensions, setOriginalImagesDimensions] = useState()
  const [actualShowingImageNumber, setActualShowingImageNumber] = useState(0)
  const [items, setItems] = useState()
  const { width } = useWindowDimensions()

  useEffect(() => {
    const components = images?.map((item, i) => {
      return (
        <ImageZoomCursor key={i} src={item} imageHeight={256} imageWidth={319} />
      )
    })

    setItems(components)
  }, [])

  useEffect(() => {
    const asyncGetBase64ImageDimensions = async () => {
      const promises = []

      images.forEach((image) => {
        promises.push(getBase64ImageDimensions(image))
      })

      const result = await Promise.all(promises)
      setOriginalImagesDimensions(result)
    }

    if (images) {
      asyncGetBase64ImageDimensions()
    }
  }, [images])

  const getBase64ImageDimensions = (base64Image) => {
    return new Promise((resolved, rejected) => {
      var i = new Image()
      i.onload = () => {
        resolved({ w: i.width, h: i.height })
      }
      i.src = base64Image
    })
  }

  if (!images || !items) {
    return <></>
  }

  return (
    <div>
      <AliceCarousel
        mouseTracking={width < 1024 ? true : false}
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
        disableButtonsControls={true}
        onSlideChanged={(e) => setActualShowingImageNumber(e.item)}
      />
      {width > 1024 && (
        <ImageZoomCursor
          style={{ height: "0px" }}
          imageStyle={{ marginTop: "-332px" }}
          key={actualShowingImageNumber}
          src={images[actualShowingImageNumber]}
          imageHeight={256}
          imageWidth={319}
          originalWidth={
            originalImagesDimensions
              ? originalImagesDimensions[actualShowingImageNumber].w
              : undefined
          }
          originalHeight={
            originalImagesDimensions
              ? originalImagesDimensions[actualShowingImageNumber].h
              : undefined
          }
        />
      )}
    </div>
  )
}
