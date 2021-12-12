import React from "react"
import { Button } from "react-bootstrap"

const phoneNumber = "+5519993955537"
const pageBase = "https://master.do9fyga9tdb2l.amplifyapp.com"

const sendWhatsAppMessage = (id, name, price) => {
  const message = `Olá! Estou interessado no produto ${name}, preço R$ ${price}.\n\nLink do produto: ${pageBase}/${id}/product-description`
  const url =
    "https://api.whatsapp.com/send?phone=" +
    phoneNumber +
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
