import React from "react"
import { Button } from "react-bootstrap"
import { PRODUCT_DESCRIPTION } from "../../constants/constants"

const sendWhatsAppMessage = ({
  isDeal,
  id,
  name,
  price,
  phoneNumber,
  commercialName,
}) => {
  const pathArray = window.location.href.split("/")
  const protocol = pathArray[0]
  const host = pathArray[2]
  const pageBase = protocol + "//" + host
  const message = `Link do produto: ${pageBase}/${id}/${PRODUCT_DESCRIPTION}\n\nOlá, ${commercialName}!\nTenho interesse no produto ${name}, preço ${
    isDeal ? "promocional" : ""
  } R$ ${price}.`
  const url =
    "https://api.whatsapp.com/send?phone=" +
    phoneNumber +
    "&text=" +
    encodeURIComponent(message)
  window.open(url, "_blank")
}

export default function SendMessageWhatsAppButton({
  isDeal,
  style,
  id,
  name,
  price,
  phoneNumber,
  marginBottom,
  commercialName,
}) {
  return (
    <div style={style} className="notranslate">
      <Button
        disabled={phoneNumber && commercialName ? false : true}
        variant="success"
        style={{ width: "100%", marginBottom, height: "38px" }}
        onClick={() =>
          sendWhatsAppMessage({
            isDeal,
            id,
            name,
            price,
            phoneNumber,
            commercialName,
          })
        }
      >
        Gostei desse
      </Button>
    </div>
  )
}
