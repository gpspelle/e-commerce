import ProgressiveBlurryImageLoad from "../Image/ProgressiveBlurryImageLoad"
import React from "react"

const fallbackSrc = "/not-found.png"

function ProductImage({ productImageSize, image }) {
  return (
    <ProgressiveBlurryImageLoad
      width={productImageSize}
      height={productImageSize}
      large={image}
      largeFallback={fallbackSrc}
    />
  )
}

export default ProductImage
