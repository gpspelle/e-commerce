import React from "react"
import { AiFillThunderbolt } from "react-icons/ai"

export default function LightningDealWaterMark() {
  return (
    <div
      style={{
        height: "34px",
        position: "absolute",
        top: "2px",
        right: "0px",
      }}
    >
      <small
        className="helper-error-background light-color font-face-poppins-bold"
        style={{
          padding: "5px",
        }}
      >
        OFERTA&nbsp;
        <AiFillThunderbolt />
      </small>
    </div>
  )
}
