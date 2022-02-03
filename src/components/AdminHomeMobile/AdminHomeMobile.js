import React from "react"
import { useHistory } from "react-router-dom"
import { ADMIN_DESCRIPTION } from "../../constants/constants"

export const openAdminDetailPage = (event, history, account) => {
  if (event.target.type === "button") return

  history.push({
    pathname: `/${account.id}/${ADMIN_DESCRIPTION}`,
    state: account,
  })
}

export default function AdminHomeMobile({ account }) {
  const history = useHistory()

  return (
    <img
      style={{
        width: 120,
        height: 120,
        objectFit: "contain",
        backgroundColor: "#F4F4F4",
        cursor: "pointer",
        borderRadius: 500,
      }}
      src={account.crop_profile_photo || "/user.jpeg"}
      onClick={(e) => openAdminDetailPage(e, history, account)}
    />
  )
}
