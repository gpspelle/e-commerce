import React from "react"
import { MdOutlineSwipe } from "react-icons/md"

export default function SwipeToSeeMore() {
  return (
    <div
      className="notranslate"
      style={{ marginTop: "8px", display: "flex", justifyContent: "center" }}
    >
      <MdOutlineSwipe></MdOutlineSwipe>
      <p>Deslize para o lado para ver mais</p>
    </div>
  )
}
