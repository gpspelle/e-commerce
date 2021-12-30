import React from "react"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import CursorZoom from "./CursorZoom"

export default function ImageZoomCursor({
  src,
  imageHeight,
  imageWidth,
  originalWidth,
  originalHeight,
}) {
  const { width } = useWindowDimensions()

  if (width < 568) {
    return <img className="w-100" height="256px" src={src} alt="image" />
  }

  return (
    <CursorZoom
      image={{
        src,
        width: imageWidth,
        height: imageHeight,
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
    />
  )
}
