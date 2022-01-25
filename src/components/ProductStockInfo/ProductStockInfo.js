import React from "react"
import { GiHandTruck } from "react-icons/gi"
import { MdOutlineEditNote } from "react-icons/md"

export default function ProductStockInfo({ productStock }) {
  if (productStock === undefined) {
    return (
      <div>
        <GiHandTruck /> Em estoque
      </div>
    )
  }

  if (productStock > 0) {
    return (
      <div>
        <GiHandTruck /> Em estoque
      </div>
    )
  }

  return (
    <div>
      <MdOutlineEditNote /> Sob encomenda
    </div>
  )
}
