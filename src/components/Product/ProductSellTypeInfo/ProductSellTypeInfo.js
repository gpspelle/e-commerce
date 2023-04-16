import React from "react"
import {
  PRODUCT_ORDER_SELL_TYPE,
  PRODUCT_STOCK_SELL_TYPE,
} from "../../../constants/constants"
import { ProductOrderInfo } from "./ProductOrderInfo"
import { ProductStockInfo } from "./ProductStockInfo"

export default function ProductSellTypeInfo({ productStock, productSellTypes }) {
  return (
    <>
      {productSellTypes.indexOf(PRODUCT_STOCK_SELL_TYPE) >= 0 && (
        <ProductStockInfo productStock={productStock} />
      )}
      {productSellTypes.indexOf(PRODUCT_ORDER_SELL_TYPE) >= 0 && (
        <ProductOrderInfo />
      )}
    </>
  )
}
