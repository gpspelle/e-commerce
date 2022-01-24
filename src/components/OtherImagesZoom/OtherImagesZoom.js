import React from "react"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import { Spinner, Container } from "react-bootstrap"
import ProgressiveBlurryImageLoad from "../ProgressiveBlurryImageLoad.js/ProgressiveBlurryImageLoad"

const OtherImagesZoom = ({
  productImages,
  productImagesResized,
  actualShowingImageNumber,
  setActualShowingImageNumber,
}) => {
  const responsive = {
    0: { items: 3 },
    568: { items: 5 },
    820: { items: 7 },
    1024: { items: 9 },
    1420: { items: 12 },
  }

  const hasCoverImage =
    productImagesResized && productImagesResized.length === productImages.length
  const components = productImages.map((productImage, i) => {
    const firstImage = productImage

    return hasCoverImage ? (
      <ProgressiveBlurryImageLoad
        width={100}
        height={100}
        small={`data:image/jpeg;base64,${productImagesResized[i]}`}
        large={firstImage}
        onClick={() => setActualShowingImageNumber(i)}
        style={{
          cursor: "pointer",
          border:
            productImages[actualShowingImageNumber] === productImage
              ? "2.5px solid orange"
              : "",
        }}
      />
    ) : (
      <img
        style={{
          width: 100,
          height: 100,
          cursor: "pointer",
          border:
            productImages[actualShowingImageNumber] === productImage
              ? "2.5px solid orange"
              : "",
        }}
        src={firstImage}
        onClick={() => setActualShowingImageNumber(i)}
      />
    )
  })

  return (
    <Container style={{ marginLeft: "0px", paddingLeft: "0px" }}>
      {components.length === 0 ? (
        <Spinner
          style={{ margin: "auto", display: "flex", color: "#212529" }}
          animation="border"
        />
      ) : (
        <AliceCarousel
          activeIndex={actualShowingImageNumber}
          mouseTracking={true}
          items={components}
          responsive={responsive}
          controlsStrategy="responsive"
          disableButtonsControls={true}
          disableDotsControls={true}
        />
      )}
    </Container>
  )
}

export default OtherImagesZoom
