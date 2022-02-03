import React from "react"
import { Button } from "react-bootstrap"
import { buyMessage, helloMessage } from "../../utils/WhatsAppMessages"

export const sendBuyWhatsAppMessage = ({
  isDeal,
  id,
  name,
  price,
  phoneNumber,
  commercialName,
}) => {
  const url = buyMessage({ isDeal, id, name, price, phoneNumber, commercialName })
  window.open(url, "_blank")
}

export const sendHelloWhatsAppMessage = ({ phoneNumber, commercialName }) => {
  const url = helloMessage({ phoneNumber, commercialName })
  window.open(url, "_blank")
}

export default function SendMessageWhatsAppButton({
  style,
  phoneNumber,
  commercialName,
  text,
  messageFunction,
}) {
  return (
    <div style={style} className="notranslate">
      <Button
        disabled={phoneNumber && commercialName ? false : true}
        variant="success"
        style={{ width: "100%", height: "38px" }}
        onClick={messageFunction}
      >
        {text}
      </Button>
    </div>
  )
}
