import { ADMIN_DESCRIPTION } from "../../constants/constants"
import { Link } from "react-router-dom"
import React from "react"

function AdminSeeMoreLink({ account }) {
  return (
    <Link
      to={{
        pathname: `/${account.id}/${ADMIN_DESCRIPTION}`,
        state: {
          ...account,
        },
      }}
      className="secondary-color more-button"
      style={{
        display: "inline-block",
        textDecoration: "none",
        float: "right",
        marginTop: "16px",
        marginBottom: "16px",
      }}
    >
      Ver mais
    </Link>
  )
}

export default AdminSeeMoreLink
