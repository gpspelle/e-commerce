import React from "react"
import OnClickImageZoom from "../OnClickImageZoom/OnClickImageZoom"
import CursorZoom from "./CursorZoom"

export default function ImageZoom({
  src,
  imageHeight,
  imageWidth,
  originalWidth,
  originalHeight,
  imageStyle,
  style,
  screenWidth,
  screenHeight,
  isFullScreen,
  setIsFullScreen,
  shouldBeDisplayed,
}) {
  if (isFullScreen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = ""
  }

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
      <OnClickImageZoom
        src={src}
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        style={style}
        imageStyle={imageStyle}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        shouldBeDisplayed={shouldBeDisplayed}
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
