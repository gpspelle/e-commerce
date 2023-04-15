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

export default function Image({ src, fallbackSrc, style, onClick }) {
  const [status, setStatus] = useState({ error: false, src, fallbackSrc })
  return (
    <img
      style={style}
      src={status.src}
      onError={() => onError(status, setStatus)}
      onClick={onClick}
    />
  )
}
