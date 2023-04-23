import SocialMediaIcon from "../Image/SocialMediaIcon"
import { sendHelloWhatsAppMessage } from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import React from "react"

function AdminContact({
  phoneNumber,
  productOwnerId,
  commercialName,
  facebookLink,
  instagramLink,
}) {
  return (
    <>
      <SocialMediaIcon
        socialMediaLink={phoneNumber}
        src="/whatsapp.svg"
        onClick={() =>
          sendHelloWhatsAppMessage({
            accountId: productOwnerId,
            phoneNumber,
            commercialName,
          })
        }
        alt="whatsapp icon"
      />
      <SocialMediaIcon
        socialMediaLink={facebookLink}
        src="/facebook.svg"
        onClick={() => window.open(facebookLink, "_blank")}
        alt="facebook icon"
      />
      <SocialMediaIcon
        socialMediaLink={instagramLink}
        src="/instagram.svg"
        onClick={() => window.open(instagramLink, "_blank")}
        alt="instagram icon"
      />
    </>
  )
}

export default AdminContact
