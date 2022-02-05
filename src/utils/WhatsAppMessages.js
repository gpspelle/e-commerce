import {
  ADMIN_DESCRIPTION,
  APP_NAME,
  PRODUCT_DESCRIPTION,
} from "../constants/constants"

const getPageBase = () => {
  const pathArray = window.location.href.split("/")
  const protocol = pathArray[0]
  const host = pathArray[2]
  const pageBase = protocol + "//" + host

  return pageBase
}

export const buyMessage = ({
  id,
  name,
  commercialName,
  isDeal,
  price,
  phoneNumber,
}) => {
  const pageBase = getPageBase()
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

export const helloMessage = ({ accountId, commercialName, phoneNumber }) => {
  const pageBase = getPageBase()
  const pageLink = `Link da página: ${pageBase}/${accountId}/${ADMIN_DESCRIPTION}`
  const message = `${pageLink}\n\nOlá, ${commercialName}!\nEncontrei a sua página na ${APP_NAME}.`
  return (
    "https://api.whatsapp.com/send?phone=" +
    phoneNumber +
    "&text=" +
    encodeURIComponent(message)
  )
}
