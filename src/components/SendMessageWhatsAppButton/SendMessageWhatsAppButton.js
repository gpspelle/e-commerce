import React from "react"
import { Button } from "react-bootstrap"
import { PRODUCT_DESCRIPTION } from "../../constants/constants"
import { useLocation } from "react-router-dom"

const sendWhatsAppMessage = ({ id, name, price, phoneNumber, commercialName }) => {
  const location = useLocation()
  console.log(location)
  console.log(window.location.href) //yields: "https://stacksnippets.net/js"
  const PAGE_BASE = "hi" // "https://master.do9fyga9tdb2l.amplifyapp.com"
  const message = `Link do produto: ${PAGE_BASE}/${id}/${PRODUCT_DESCRIPTION}\n\nOlá, ${commercialName}!\nTenho interesse no produto ${name}, preço R$ ${price}.`
  const url =
    "https://api.whatsapp.com/send?phone=" +
    phoneNumber +
    "&text=" +
    encodeURIComponent(message)
  window.open(url, "_blank")
}

export default function SendMessageWhatsAppButton({
  style,
  id,
  name,
  price,
  phoneNumber,
  marginBottom,
  commercialName,
}) {
  return (
    <div style={style}>
      <Button
        disabled={phoneNumber && commercialName ? false : true}
        variant="success"
        style={{ width: "100%", marginBottom }}
        onClick={() =>
          sendWhatsAppMessage({ id, name, price, phoneNumber, commercialName })
        }
      >
        Gostei desse
      </Button>
    </div>
  )
}
