import React, { useState, useEffect } from "react"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import ImageZoom from "../ImageZoom/ImageZoom"
import "./ImageCarousel.css"

const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 1 },
}

export default function ImageCarousel({
  images,
  screenWidth,
  screenHeight,
  isFullScreen,
  setIsFullScreen,
}) {
  const [originalImagesDimensions, setOriginalImagesDimensions] = useState()
  const [actualShowingImageNumber, setActualShowingImageNumber] = useState(0)
  const [items, setItems] = useState()

  useEffect(() => {
    const components = images?.map((item, i) => {
      return (
        <ImageZoom
          key={i}
          src={item}
          imageHeight={256}
          imageWidth={319}
          screenWidth={screenWidth}
          screenHeight={screenHeight}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
      )
    })

    setItems(components)
  }, [isFullScreen, images])

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
        activeIndex={actualShowingImageNumber}
        mouseTracking={screenWidth < 1024 ? true : false}
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
        disableButtonsControls={true}
        onSlideChanged={(e) => setActualShowingImageNumber(e.item)}
      />
      {screenWidth > 1024 && (
        <ImageZoom
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
          screenWidth={screenWidth}
          screenHeight={screenHeight}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
      )}
    </div>
  )
}
