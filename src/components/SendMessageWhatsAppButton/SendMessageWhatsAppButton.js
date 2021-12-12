import React from "react"
import { Button } from "react-bootstrap"

const phoneNumber = "+5519993955537"

const sendWhatsAppMessage = (id, name, price) => {
  const message = `Olá! Estou interessado no produto ${name}, preço R$ ${price}.\n\nLink do produto: <fake_link>`
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
        style={{ width: "100%", marginBottom: "8%" }}
        onClick={() => sendWhatsAppMessage(id, name, price)}
      >
        Gostei desse
      </Button>
    </div>
  )
}
