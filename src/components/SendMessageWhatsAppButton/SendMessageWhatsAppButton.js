import React from "react"
import { Button } from "react-bootstrap"
import { PAGE_BASE, PHONE_NUMBER } from "../../constants/constants"

const sendWhatsAppMessage = (id, name, price) => {
  const message = `Olá! Estou interessado no produto ${name}, preço R$ ${price}.\n\nLink do produto: ${PAGE_BASE}/${id}/product-description`
  const url =
    "https://api.whatsapp.com/send?phone=" +
    PHONE_NUMBER +
    "&text=" +
    encodeURIComponent(message)
  window.open(url, "_blank")
}

export default function SendMessageWhatsAppButton({ id, name, price }) {
  return (
    <div>
      <Button
        variant="success"
        style={{ width: "100%", marginBottom: "8%" }}
        onClick={() => sendWhatsAppMessage(id, name, price)}
      >
        Gostei desse
      </Button>
    </div>
  )
}
