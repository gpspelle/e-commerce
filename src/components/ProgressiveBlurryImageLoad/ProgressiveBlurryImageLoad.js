import React from "react"

import Image from "../../basicBlocks/Image"
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
  if (small) {
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
      />
    )
  }

  return (
    <Image
      fallbackSrc={largeFallback}
      src={large}
      className="light-dark-background"
      style={{
        ...style,
        height,
        width,
        filter: "none",
        objectFit: "contain",
      }}
      alt=""
      onClick={onClick}
      key={large}
    />
  )
}

export default ProgressiveBlurryImageLoad
