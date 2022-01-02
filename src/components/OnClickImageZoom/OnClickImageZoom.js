import React from "react"
import { CloseButton } from "react-bootstrap"

export default function OnClickImageZoom({
  src,
  screenHeight,
  imageWidth,
  imageHeight,
  style,
  imageStyle,
  isFullScreen,
  setIsFullScreen,
  shouldBeDisplayed,
}) {
  return (
    <div
      style={{
        ...style,
        cursor: isFullScreen ? "" : "pointer",
        height: isFullScreen ? screenHeight : "",
        visibility: "visible",
        zIndex: shouldBeDisplayed ? "11" : "0",
        position: "relative",
        display: "flex",
        justifyContent: "right",
      }}
      onClick={(e) => {
        if (e.target.type === "button") return
        setIsFullScreen(true)
      }}
    >
      {isFullScreen ? (
        <img
          width="100%"
          height={`${screenHeight}px`}
          src={src}
          alt="image"
          style={{
            zIndex: "10",
            position: "fixed",
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
          position: "fixed",
          zIndex: "11",
          backgroundColor: "white",
          border: "3px solid",
          fontSize: "32px",
        }}
      />
    </div>
  )
}