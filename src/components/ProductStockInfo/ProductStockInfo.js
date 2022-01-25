import React from "react"
import { GiHandTruck } from "react-icons/gi"
import { MdOutlineEditNote } from "react-icons/md"

export default function ProductStockInfo({ productStock }) {
  if (productStock === undefined) {
    return (
      <div>
        <GiHandTruck /> Em Estoque
      </div>
    )
  }

  if (productStock > 0) {
    return (
      <div>
        <GiHandTruck /> Em Estoque
      </div>
    )
  }

  return (
    <div>
      <MdOutlineEditNote /> Sob Encomenda
    </div>
  )
}
