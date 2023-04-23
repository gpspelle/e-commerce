import React from "react"
import { useHistory } from "react-router-dom"

import { ADMIN_DESCRIPTION } from "../../constants/constants"
import Image from "../Image/Image"

export const openAdminDetailPage = (event, history, account) => {
  if (event.target.type === "button") return

  history.push({
    pathname: `/${account.id}/${ADMIN_DESCRIPTION}`,
    state: account,
  })
}

export default function AdminAvatar({ account }) {
  const history = useHistory()
  return (
    <Image
      style={{
        width: 120,
        height: 120,
        objectFit: "contain",
        backgroundColor: "#F4F4F4",
        cursor: "pointer",
        borderRadius: 500,
      }}
      src={account.crop_profile_photo}
      fallbackSrc="/user.png"
      onClick={(e) => openAdminDetailPage(e, history, account)}
      key={account.crop_profile_photo}
    />
  )
}
