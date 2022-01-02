import React, { useEffect, useRef, useState } from "react"
import Magnifier from "./Magnifier"

export default function CursorZoom({
  size = 200,
  image,
  zoomImage,
  cursorOffset = { x: 0, y: 0 },
  borderSize,
  borderColor,
  pointerStyle,
  style,
}) {
  const imageRef = useRef()
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
    offsetX: -1,
    offsetY: -1,
  })

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  const onMouseMove = (e) => {
    var offset = getOffset(imageRef.current)

    var scrollX =
      window.pageXOffset !== undefined
        ? window.pageXOffset
        : (document.documentElement || document.body.parentNode || document.body)
            .scrollLeft
    var scrollY =
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement || document.body.parentNode || document.body)
            .scrollTop

    setCoordinates({
      x: e.clientX + scrollX, //(window.scrollX || window.pageXOffset),
      y: e.clientY + scrollY, //(window.scrollY || window.pageYOffset),
      offsetX: e.clientX - offset.x,
      offsetY: e.clientY - offset.y,
    })
  }

  const getOffset = (el) => {
    var x = 0
    var y = 0

    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      // FF & IE don't support body's scrollTop - use window instead
      x +=
        el.offsetLeft - (el.tagName === "BODY" ? window.pageXOffset : el.scrollLeft)
      y += el.offsetTop - (el.tagName === "BODY" ? window.pageYOffset : el.scrollTop)
      el = el.offsetParent
    }

    return { x, y }
  }

  const magnifierProps = {
    size,
    smallImage: image,
    zoomImage,
    cursorOffset,
    borderSize,
    borderColor,
    pointerStyle,
    x: coordinates.x,
    y: coordinates.y,
    offsetX: coordinates.offsetX,
    offsetY: coordinates.offsetY,
  }

  return (
    <div style={style}>
      <img
        ref={imageRef}
        width={image.width}
        height={image.height}
        src={image.src}
        style={image.style}
      />
      <Magnifier {...magnifierProps} />
    </div>
  )
}
