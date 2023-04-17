import React, { useState, useEffect } from "react"
import { LARGE_SCREEN } from "../../constants/constants"
import useWindowDimensions from "../../hooks/useWindowDimensions"

import {
  msToTime,
  processLightningDealInformation,
} from "../../utils/lightningDealUtils"

export default function LightningDealDuration({
  isProductDescription,
  lightningDealDuration,
  lightningDealStartTime,
}) {
  const { width } = useWindowDimensions()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!lightningDealDuration || !lightningDealStartTime) {
    return <></>
  }

  const { miliseconds } = processLightningDealInformation({
    now,
    lightningDealDuration,
    lightningDealStartTime,
  })
  const displayLeftDuration = msToTime(miliseconds)

  if (isProductDescription) {
    return (
      <p className="helper-error-color" style={{ textAlign: "left" }}>
        <img src="/alert.svg" height="12px" />
        &nbsp;&nbsp;Termina em&nbsp;
        {displayLeftDuration}
      </p>
    )
  }

  return (
    <p
      className="helper-error-color"
      style={{
        fontSize: width < LARGE_SCREEN ? "8.5px" : "12px",
        lineHeight: "18.5px",
        textAlign: "left",
        marginBottom: "0px",
      }}
    >
      Termina em&nbsp;
      {displayLeftDuration}
    </p>
  )
}
