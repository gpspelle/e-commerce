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
  const halfSizeY = size / 2
  const halfSizeX = (size + size * 0.4) / 2
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
        top: y,
        left: x,
        width: size + size * 0.4,
        height: size,
        marginLeft: -halfSizeX + cursorOffset.x,
        marginTop: -halfSizeY + cursorOffset.y,
        backgroundColor: "white",
        boxShadow: "1px 1px 6px rgba(0,0,0,0.3)",
        zIndex: 9999,
      }}
    >
      {pointerStyle && (
        <div className={"cursor-zoom-pointer"} style={pointerStyle} />
      )}
      <div
        className={"cursor-zoom-magnifier"}
        style={{
          width: size + size * 0.8,
          height: size * 1.4,
          backgroundImage: "url(" + zoomImage.src + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: bgX + "px " + bgY + "px",
          border: borderSize + " solid " + borderColor,
        }}
      />
    </div>
  )
}
