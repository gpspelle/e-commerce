import React from "react"

export default function DealWaterMark({ dealOffPercentage }) {
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
        className="helper-warning-background light-color font-face-poppins-bold"
        style={{
          padding: "5px",
        }}
      >
        {dealOffPercentage}% OFF
      </small>
    </div>
  )
}
