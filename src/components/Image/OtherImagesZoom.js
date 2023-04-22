import React from "react"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import { Container, Spinner } from "react-bootstrap"
import { LARGE_SCREEN } from "../../constants/constants"
import Image from "./Image"

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
    [LARGE_SCREEN]: { items: 9 },
    1420: { items: 12 },
  }

  const components = productImages.map((productImage, i) => {
    return (
      <Image
        style={{
          width: 100,
          height: 100,
          cursor: "pointer",
          border:
            productImages[actualShowingImageNumber] === productImage
              ? "2.5px solid orange"
              : "",
        }}
        fallbackSrc="/not-found.png"
        src={productImage}
        onClick={() => setActualShowingImageNumber(i)}
      />
    )
  })

  return (
    <Container style={{ marginLeft: "0px", paddingLeft: "0px" }}>
      {components.length === 0 ? (
        <Spinner style={{ margin: "auto", display: "flex" }} animation="border" />
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
