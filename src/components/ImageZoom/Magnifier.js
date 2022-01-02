import React from "react"

export default function Magnifier({
  size,
  smallImage,
  zoomImage,
  cursorOffset,
  borderSize,
  borderColor,
  pointerStyle,
  x,
  y,
  offsetX,
  offsetY,
}) {
  const halfSizeY = (size * 1.4) / 2
  const halfSizeX = (size * 1.4) / 2
  const magX = zoomImage.width / smallImage.width
  const magY = zoomImage.height / smallImage.height
  const bgX = -(offsetX * magX - halfSizeX)
  const bgY = -(offsetY * magY - halfSizeY)
  const isVisible =
    offsetX < smallImage.width &&
    offsetY < smallImage.height &&
    offsetY > 0 &&
    offsetX > 0

  return (
    <div
      className={"cursor-zoom-magnifier-container"}
      style={{
        position: "absolute",
        display: isVisible ? "block" : "none",
        top: 0,
        left: 0,
        width: smallImage.width,
        height: smallImage.height,
        marginLeft: smallImage.width,
        backgroundColor: "white",
        boxShadow: "1px 1px 6px rgba(0,0,0,0.3)",
        zIndex: 999999,
      }}
    >
      {pointerStyle && (
        <div className={"cursor-zoom-pointer"} style={pointerStyle} />
      )}
      <div
        className={"cursor-zoom-magnifier"}
        style={{
          width: smallImage.width,
          height: smallImage.height,
          backgroundImage: "url(" + zoomImage.src + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: bgX + "px " + bgY + "px",
          border: borderSize + " solid " + borderColor,
          zIndex: 999999,
          top: 0,
          left: 0,
          position: "absolute",
        }}
      />
    </div>
  )
}
