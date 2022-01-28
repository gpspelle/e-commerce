import React from "react"
import { GiHandTruck } from "react-icons/gi"
import { MdOutlineEditNote } from "react-icons/md"

export default function ProductStockInfo({ productStock }) {
  if (productStock === undefined) {
    return (
      <div>
        <p style={{ marginBottom: "0px" }}>
          <GiHandTruck /> Em estoque
        </p>
        <p style={{ marginLeft: "1.25rem" }}>Quantidade: {productStock} unidade</p>
      </div>
    )
  }

  const isPlural = productStock > 1

  if (productStock > 0) {
    return (
      <div>
        <p style={{ marginBottom: "0px" }}>
          <GiHandTruck /> Em estoque
        </p>
        <p style={{ marginLeft: "1.25rem" }}>
          Quantidade: {productStock} unidade{isPlural ? "s" : ""}
        </p>
      </div>
    )
  }

  return (
    <p>
      <MdOutlineEditNote /> Sob encomenda
    </p>
  )
}
