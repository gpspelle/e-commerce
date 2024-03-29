import React from "react"

import Image from "./Image"
import useProgressiveImageLoad from "../../hooks/useProgressiveImageLoad"

function ProgressiveBlurryImageLoad({
  small,
  large,
  largeFallback,
  height,
  width,
  onClick,
  style,
}) {
  const [src, { blur }] = useProgressiveImageLoad(small, large)
  return (
    <Image
      fallbackSrc={largeFallback}
      src={src}
      className="light-dark-background"
      style={{
        ...style,
        height,
        width,
        filter: blur ? "blur(5px)" : "none",
        objectFit: "contain",
      }}
      alt=""
      onClick={onClick}
      key={small + large + blur}
    />
  )
}

export default ProgressiveBlurryImageLoad
