import { ADMIN_DESCRIPTION } from "../../constants/constants"
import { Link } from "react-router-dom"
import React from "react"

function AdminSeeMoreLink({
  productOwnerId,
  productOwnerName,
  phoneNumber,
  commercialName,
  cropProfilePhoto,
  aboutMe,
  aboutProducts,
  facebookLink,
  instagramLink,
}) {
  return (
    <Link
      to={{
        pathname: `/${productOwnerId}/${ADMIN_DESCRIPTION}`,
        state: {
          name: productOwnerName,
          phone_number: phoneNumber,
          commercial_name: commercialName,
          crop_profile_photo: cropProfilePhoto,
          about_me: aboutMe,
          about_products: aboutProducts,
          facebook_link: facebookLink,
          instagram_link: instagramLink,
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
