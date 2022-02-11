import { PRODUCT_STOCK_SELL_TYPE } from "../constants/constants"

export const convertProductFromDatabaseToProductEntity = ({ product }) => {
  return {
    id: product.id.S,
    name: product.PRODUCT_NAME.S,
    description: product.PRODUCT_DESCRIPTION.S,
    price: product.PRODUCT_PRICE.N,
    images: product.PRODUCT_IMAGES.L.map((image) => image.S),
    productImagesResized: product.PRODUCT_IMAGES_RESIZED?.L.map((image) => image.S),
    coverImage: product.PRODUCT_COVER_IMAGE?.S,
    productOwnerId: product.PRODUCT_OWNER_ID?.S,
    tags: product.PRODUCT_TAGS?.SS || [],
    productType: product.PRODUCT_TYPE?.S,
    dealPrice: product.DEAL_PRICE?.N,
    lightningDealDuration: product.LIGHTNING_DEAL_DURATION?.S,
    lightningDealStartTime: product.LIGHTNING_DEAL_START_TIME?.S,
    productStock: product.PRODUCT_STOCK?.N ? parseInt(product.PRODUCT_STOCK.N) : 1,
    productSellTypes: product.PRODUCT_SELL_TYPES?.L.map(
      (sellType) => sellType.S
    ) || [PRODUCT_STOCK_SELL_TYPE],
  }
}
