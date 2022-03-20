import { PRODUCT_TYPES } from "../constants/constants"
import {
  isLightningDealValid,
  processLightningDealInformation,
} from "./lightningDealUtils"
import { getRandomFromArray } from "./randomUtils"

export const filterDealsAndLightningDealsFromProductArray = ({
  products,
  randomIndexes,
}) => {
  if (products.length > 0) {
    var displayDealProducts = products.filter(
      (product) =>
        product.PRODUCT_TYPE?.S === PRODUCT_TYPES.DEAL ||
        product.PRODUCT_TYPE?.S === PRODUCT_TYPES.LIGHTNING_DEAL
    )

    displayDealProducts = displayDealProducts.filter((product) => {
      const isLightningDeal =
        product.PRODUCT_TYPE?.S === PRODUCT_TYPES.LIGHTNING_DEAL
      if (isLightningDeal) {
        const { miliseconds } = processLightningDealInformation({
          now: new Date(),
          lightningDealDuration: product.LIGHTNING_DEAL_DURATION.S,
          lightningDealStartTime: product.LIGHTNING_DEAL_START_TIME.S,
        })
        return isLightningDealValid(miliseconds)
      }

      return true
    })

    return getRandomFromArray(displayDealProducts, randomIndexes)
  }

  return []
}
