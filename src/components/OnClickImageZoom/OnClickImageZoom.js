import React from "react"
import { CloseButton } from "react-bootstrap"

export default function OnClickImageZoom({
  src,
  screenHeight,
  screenWidth,
  imageWidth,
  imageHeight,
  style,
  imageStyle,
  isFullScreen,
  setIsFullScreen,
  allowScroll,
  blockScroll,
}) {
  if (isFullScreen) {
    blockScroll()
  } else {
    allowScroll()
  }

  return (
    <div
      style={{
        ...style,
        cursor: isFullScreen ? "" : "pointer",
        height: isFullScreen ? screenHeight : "",
        width: screenWidth > 1024 ? "100%" : "",
        visibility: "visible",
        position: "relative",
        display: "flex",
      }}
      onClick={(e) => {
        if (e.target.type === "button") return
        setIsFullScreen(true)
      }}
    >
      {isFullScreen ? (
        <img
          width="100%"
          height="90%"
          src={src}
          alt=""
          style={{
            paddingBottom: "12vh",
            paddingTop: "2vh",
          }}
        />
      ) : (
        <img
          width={`${imageWidth}px`}
          height={`${imageHeight}px`}
          src={src}
          alt=""
          style={imageStyle}
        />
      )}
      <CloseButton
        onClick={() => setIsFullScreen(false)}
        style={{
          display: isFullScreen ? "" : "none",
          position: "absolute",
          zIndex: "11",
          backgroundColor: "white",
          border: "3px solid",
          fontSize: "32px",
          right: "0px",
        }}
      />
    </div>
  )
}
