import React, { useState, useEffect } from "react"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"

import LightningDealWaterMark from "../LightningDeal/LightningDealWaterMark"
import OnClickImageZoom from "../OnClickImageZoom/OnClickImageZoom"
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
  isLightningDeal,
}) {
  const [originalImagesDimensions, setOriginalImagesDimensions] = useState()
  const [actualShowingImageNumber, setActualShowingImageNumber] = useState(0)
  const [items, setItems] = useState()

  if (isFullScreen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = ""
  }

  useEffect(() => {
    const components = images?.map((item, i) => {
      if (screenWidth > 1024) {
        return (
          <div>
            <OnClickImageZoom
              src={item}
              actualShowingImageNumber={i}
              screenHeight={screenHeight}
              screenWidth={screenWidth}
              imageHeight={screenWidth * 0.3}
              isFullScreen={isFullScreen}
              setIsFullScreen={setIsFullScreen}
              allowScroll={allowScroll}
              blockScroll={blockScroll}
            />
            {isLightningDeal && (
              <LightningDealWaterMark isProductDescription={true} />
            )}
          </div>
        )
      }

      return (
        <div>
          <OnClickImageZoom
            src={item}
            actualShowingImageNumber={i}
            screenHeight={screenHeight}
            screenWidth={screenWidth}
            imageHeight={screenHeight * 0.55}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
            allowScroll={allowScroll}
            blockScroll={blockScroll}
          />
          {isLightningDeal && <LightningDealWaterMark isProductDescription={true} />}
        </div>
      )
    })

    setItems(components)
  }, [isFullScreen, images, originalImagesDimensions])

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
    </div>
  )
}
