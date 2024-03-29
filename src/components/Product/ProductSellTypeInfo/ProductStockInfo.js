import React from "react"
import { GiHandTruck } from "react-icons/gi"

export const ProductStockInfo = ({ productStock }) => {
  const isPlural = productStock > 1 ? "s" : ""

  return (
    <>
      <p style={{ marginBottom: "0px" }}>
        <GiHandTruck />
        &nbsp;&nbsp;Em estoque
      </p>
      <p style={{ marginLeft: "1rem" }}>
        &nbsp;Quantidade: {productStock} unidade{isPlural}
      </p>
    </>
  )
}
