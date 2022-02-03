import { PRODUCT_DESCRIPTION } from "../constants/constants"

export const buyMessage = ({
  id,
  name,
  commercialName,
  isDeal,
  price,
  phoneNumber,
}) => {
  const pathArray = window.location.href.split("/")
  const protocol = pathArray[0]
  const host = pathArray[2]
  const pageBase = protocol + "//" + host
  const message = `Link do produto: ${pageBase}/${id}/${PRODUCT_DESCRIPTION}\n\nOlá, ${commercialName}!\nTenho interesse no produto ${name}, preço ${
    isDeal ? "promocional" : ""
  } R$ ${price}.`
  return (
    "https://api.whatsapp.com/send?phone=" +
    phoneNumber +
    "&text=" +
    encodeURIComponent(message)
  )
}

export const helloMessage = ({ commercialName, phoneNumber }) => {
  const message = `Olá, ${commercialName}!\nEncontrei a sua página e gostei muito dos seus produtos.`
  return (
    "https://api.whatsapp.com/send?phone=" +
    phoneNumber +
    "&text=" +
    encodeURIComponent(message)
  )
}
