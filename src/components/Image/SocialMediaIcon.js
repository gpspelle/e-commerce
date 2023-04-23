import React from "react"

function SocialMediaIcon({ socialMediaLink, src, onClick, alt }) {
  if (!socialMediaLink) {
    return <></>
  }

  return (
    <img
      height="16px"
      width="16px"
      src={src}
      style={{ cursor: "pointer", marginRight: "16px" }}
      onClick={onClick}
      alt={alt}
    />
  )
}

export default SocialMediaIcon
