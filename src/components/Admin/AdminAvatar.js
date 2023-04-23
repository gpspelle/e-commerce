import AdminOpenDescription from "./AdminOpenDescription"
import Image from "../Image/Image"
import React from "react"

function AdminAvatar({ src, account, imageSize }) {
  return (
    <Image
      style={{
        width: imageSize,
        height: imageSize,
        objectFit: "contain",
        backgroundColor: "#F4F4F4",
        cursor: "pointer",
        borderRadius: 500,
      }}
      src={src}
      fallbackSrc="/user.png"
      onClick={AdminOpenDescription({ account })}
      key={src}
    />
  )
}

export default AdminAvatar
