import { PRODUCT_TYPES } from "../constants/constants"

export const getIsDeal = (productType) => productType === PRODUCT_TYPES.DEAL
