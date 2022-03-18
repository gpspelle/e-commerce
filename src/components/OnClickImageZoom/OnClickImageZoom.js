import React from "react"
import { CloseButton } from "react-bootstrap"
import { LARGE_SCREEN } from "../../constants/constants"

export default function OnClickImageZoom({
  src,
  screenHeight,
  screenWidth,
  imageHeight,
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
        cursor: isFullScreen ? "" : "pointer",
        height: isFullScreen ? screenHeight - 120 : "",
        width: screenWidth >= LARGE_SCREEN ? "100%" : "",
        visibility: "visible",
        display: "flex",
        justifyContent: "center",
      }}
      onClick={(e) => {
        if (e.target.type === "button") return
        setIsFullScreen(true)
      }}
    >
      {isFullScreen ? (
        <img
          src={src}
          alt=""
          style={{
            objectFit: "contain",
            width: "100%",
            height: screenHeight - 230,
            backgroundColor: "#F4F4F4",
          }}
        />
      ) : (
        <img
          width={"100%"}
          height={`${imageHeight}px`}
          src={src}
          alt=""
          style={{ backgroundColor: "#F4F4F4" }}
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
