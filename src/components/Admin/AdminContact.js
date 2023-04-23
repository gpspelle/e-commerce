import SocialMediaIcon from "../Image/SocialMediaIcon"
import { sendHelloWhatsAppMessage } from "../SendMessageWhatsAppButton/SendMessageWhatsAppButton"
import React from "react"

function AdminContact({ account }) {
  return (
    <>
      <SocialMediaIcon
        socialMediaLink={account.phone_number}
        src="/whatsapp.svg"
        onClick={() =>
          sendHelloWhatsAppMessage({
            accountId: account.id,
            phoneNumber: account.phone_number,
            commercialName: account.commercial_name,
          })
        }
        alt="whatsapp icon"
      />
      <SocialMediaIcon
        socialMediaLink={account.facebook_link}
        src="/facebook.svg"
        onClick={() => window.open(account.facebook_link, "_blank")}
        alt="facebook icon"
      />
      <SocialMediaIcon
        socialMediaLink={account.instagram_link}
        src="/instagram.svg"
        onClick={() => window.open(account.instagram_link, "_blank")}
        alt="instagram icon"
      />
    </>
  )
}

export default AdminContact
