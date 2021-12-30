import React from "react"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import CursorZoom from "./CursorZoom"

export default function ImageZoomCursor({
  src,
  imageHeight,
  imageWidth,
  originalWidth,
  originalHeight,
  imageStyle,
  style,
}) {
  const { width } = useWindowDimensions()

  if (!src) {
    return <></>
  }

  if (
    (imageStyle && !imageStyle.marginTop) ||
    width < 1024 ||
    !originalWidth ||
    !originalHeight
  ) {
    return (
      <img
        width={`${imageWidth}px`}
        height={`${imageHeight}px`}
        src={src}
        alt="image"
      />
    )
  }

  return (
    <CursorZoom
      image={{
        src,
        width: imageWidth,
        height: imageHeight,
        style: imageStyle,
      }}
      zoomImage={{
        src,
        width: originalWidth,
        height: originalHeight,
      }}
      borderColor="white"
      borderSize="5px"
      cursorOffset={{
        x: 300,
        y: 0,
      }}
      style={style}
    />
  )
}
