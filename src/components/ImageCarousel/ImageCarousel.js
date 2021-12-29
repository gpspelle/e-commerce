import React from "react"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import "./ImageCarousel.css"

const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 1 },
}

export default function ImageCarousel({ images }) {
  const items = images?.map((item, i) => {
    return (
      <div className="item" data-value={i} key={i}>
        <img className="w-100" height="256px" src={item} alt={`${i} image`} />
      </div>
    )
  })

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      responsive={responsive}
      controlsStrategy="alternate"
      disableButtonsControls={true}
    />
  )
}
