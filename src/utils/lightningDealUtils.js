import { PRODUCT_TYPES } from "../constants/constants"

export const processLightningDealInformation = ({
  now,
  lightningDealDuration,
  lightningDealStartTime,
}) => {
  const hoursDuration = lightningDealDuration.substring(0, 2)
  var endLightningDealTime = new Date(lightningDealStartTime)
  endLightningDealTime.setHours(
    endLightningDealTime.getHours() + parseInt(hoursDuration)
  )

  return {
    miliseconds: endLightningDealTime.getTime() - now.getTime(),
    hoursDuration,
  }
}

export const isLightningDealValid = (miliseconds) => miliseconds > 0

export const msToTime = (ms) => {
  var seconds = Math.floor((ms / 1000) % 60),
    minutes = Math.floor((ms / (1000 * 60)) % 60),
    hours = Math.floor(ms / (1000 * 60 * 60))

  hours = hours < 10 ? "0" + hours : hours
  minutes = minutes < 10 ? "0" + minutes : minutes
  seconds = seconds < 10 ? "0" + seconds : seconds

  return hours + "h " + minutes + "min " + seconds + "s"
}

export const getIsLightningDeal = (productType) =>
  productType === PRODUCT_TYPES.LIGHTNING_DEAL
