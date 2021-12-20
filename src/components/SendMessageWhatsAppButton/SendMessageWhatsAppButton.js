import React from "react"
import { Button } from "react-bootstrap"
import { PAGE_BASE } from "../../constants/constants"

const sendWhatsAppMessage = (id, name, price, phoneNumber) => {
  const message = `Olá! Estou interessado no produto ${name}, preço R$ ${price}.\n\nLink do produto: ${PAGE_BASE}/${id}/product-description`
  const url =
    "https://api.whatsapp.com/send?phone=" +
    phoneNumber +
    "&text=" +
    encodeURIComponent(message)
  window.open(url, "_blank")
}

export default function SendMessageWhatsAppButton({ id, name, price, phoneNumber }) {
  return (
    <div>
      <Button
        disabled={phoneNumber ? false : true}
        variant="success"
        style={{ width: "100%", marginBottom: "8%" }}
        onClick={() => sendWhatsAppMessage(id, name, price, phoneNumber)}
      >
        Gostei desse
      </Button>
    </div>
  )
}
