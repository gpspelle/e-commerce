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
  const x = document.getElementsByClassName("card")
  if (isFullScreen) {
    if (screenWidth > 1024) {
      x[0].style.width = "40rem"
    } else if (screenWidth > 800) {
      x[0].style.width = "30rem"
    } else if (screenWidth > 568) {
      x[0].style.width = "25rem"
    } else {
      x[0].style.width = "20rem"
    }
    blockScroll()
  } else {
    x[0].style.width = "20rem"
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
          alt="image"
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
          alt="image"
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
