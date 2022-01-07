import React from "react"
import useProgressiveImageLoad from "../../hooks/useProgressiveImageLoad"

export default function ProgressiveBlurryImageLoad({
  small,
  large,
  height,
  width,
  onClick,
  style,
}) {
  const [src, { blur }] = useProgressiveImageLoad(small, large)

  return (
    <img
      src={src}
      style={{
        ...style,
        height,
        width,
        filter: blur ? "blur(5px)" : "none",
      }}
      alt=""
      onClick={onClick}
    />
  )
}
