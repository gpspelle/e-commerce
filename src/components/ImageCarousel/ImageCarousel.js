import React, { useState, useEffect } from "react"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import ImageZoom from "../ImageZoom/ImageZoom"
import OtherImagesZoom from "../OtherImagesZoom/OtherImagesZoom"
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
  allowScroll,
  blockScroll,
  productImagesResized,
}) {
  const [originalImagesDimensions, setOriginalImagesDimensions] = useState()
  const [actualShowingImageNumber, setActualShowingImageNumber] = useState(0)
  const [items, setItems] = useState()

  useEffect(() => {
    const components = images?.map((item, i) => {
      return (
        <ImageZoom
          key={i}
          actualShowingImageNumber={i}
          src={item}
          imageHeight={screenWidth < 1024 ? screenHeight * 0.55 : 256}
          imageWidth={screenWidth < 1024 ? screenWidth : 319}
          screenWidth={screenWidth}
          screenHeight={screenHeight}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
          allowScroll={allowScroll}
          blockScroll={blockScroll}
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
    return new Promise((resolved) => {
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
      {isFullScreen && (
        <div
          style={{
            position: "fixed",
            bottom: "8px",
            visibility: "visible",
            width: "100%",
            left: "12px",
          }}
        >
          <OtherImagesZoom
            productImages={images}
            productImagesResized={productImagesResized}
            actualShowingImageNumber={actualShowingImageNumber}
            setActualShowingImageNumber={setActualShowingImageNumber}
          />
        </div>
      )}
      {screenWidth > 1024 && (
        <ImageZoom
          style={{ height: "0px" }}
          imageStyle={{ marginTop: "-332px" }}
          key={actualShowingImageNumber}
          actualShowingImageNumber={actualShowingImageNumber}
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
          allowScroll={allowScroll}
          blockScroll={blockScroll}
        />
      )}
    </div>
  )
}
