import React, { useState } from "react"

const onError = (status, setStatus) => {
  if (!status.error) {
    setStatus({
      ...status,
      src: status.fallbackSrc,
      error: true,
    })
  }
}

function Image({ src, fallbackSrc, style, onClick, alt, className }) {
  const [status, setStatus] = useState({
    error: false,
    src,
    fallbackSrc,
  })
  return (
    <img
      style={style}
      src={status.src}
      onError={() => onError(status, setStatus)}
      onClick={onClick}
      alt={alt}
      className={className}
      key={src + fallbackSrc + style + onClick}
    />
  )
}

export default Image
