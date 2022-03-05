import React from "react"
import { Button } from "react-bootstrap"

import { buyMessage, helloMessage } from "../../utils/whatsAppMessages"

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

export const sendHelloWhatsAppMessage = ({
  accountId,
  phoneNumber,
  commercialName,
}) => {
  const url = helloMessage({ accountId, phoneNumber, commercialName })
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
        className="primary-background no-border font-face-poppins-bold"
        disabled={phoneNumber && commercialName ? false : true}
        style={{
          width: "100%",
          height: "44px",
          fontSize: "12px",
          lineHeight: "18px",
          padding: "13px 16px",
          borderRadius: "8px",
        }}
        onClick={messageFunction}
      >
        {text}
      </Button>
    </div>
  )
}
