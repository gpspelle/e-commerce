import React, { useState, useEffect } from "react"
import {
  msToTime,
  processLightingDealInformation,
} from "../../utils/LightingDealUtils"
import { AiOutlineClockCircle } from "react-icons/ai"

export default function LightingDealDuration({
  isProductDescription,
  lightingDealDuration,
  lightingDealStartTime,
}) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!lightingDealDuration || !lightingDealStartTime) {
    return <></>
  }

  const { miliseconds } = processLightingDealInformation({
    now,
    lightingDealDuration,
    lightingDealStartTime,
  })
  const displayLeftDuration = msToTime(miliseconds)

  if (isProductDescription) {
    return (
      <p style={{ textAlign: "left", color: "#BE464C" }}>
        <AiOutlineClockCircle />
        &nbsp;Oferta acaba em&nbsp;
        {displayLeftDuration}
      </p>
    )
  }

  return (
    <div style={{ textAlign: "left", fontSize: "12px", color: "#BE464C" }}>
      <AiOutlineClockCircle />
      &nbsp;Oferta acaba em&nbsp;
      {displayLeftDuration}
    </div>
  )
}
