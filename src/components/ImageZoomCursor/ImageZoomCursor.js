import React from "react"
import CursorZoom from "./CursorZoom"

export default function ImageZoomCursor({
  src,
  imageHeight,
  imageWidth,
  originalWidth,
  originalHeight,
  imageStyle,
  style,
  screenWidth,
}) {
  if (!src) {
    return <></>
  }

  if (
    (imageStyle && !imageStyle.marginTop) ||
    screenWidth < 1024 ||
    !originalWidth ||
    !originalHeight
  ) {
    return (
      <div style={style}>
        <img
          width={`${imageWidth}px`}
          height={`${imageHeight}px`}
          src={src}
          alt="image"
          style={imageStyle}
        />
      </div>
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
