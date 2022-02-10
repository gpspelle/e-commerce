import React from "react"
import { AiFillThunderbolt } from "react-icons/ai"

export default function LightningDealWaterMark({ isProductDescription }) {
  const top = isProductDescription ? "0px" : ""
  return (
    <>
      <AiFillThunderbolt
        style={{
          position: "absolute",
          margin: "19px",
          fontSize: "24px",
          zIndex: "1",
          color: "green",
          top,
          visibility: "visible",
        }}
      />
      <svg
        width="44"
        height="44"
        style={{
          position: "absolute",
          margin: "8px",
          zIndex: "0",
          top,
          border: "1.25px solid green",
          borderRadius: "10px",
          visibility: "visible",
        }}
      >
        <rect width="44" height="44" fill="white" rx="10" />
      </svg>
    </>
  )
}
