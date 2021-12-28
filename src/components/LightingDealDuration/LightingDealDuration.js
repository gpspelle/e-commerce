import React, { useState, useEffect } from "react"

export default function LightingDealDuration({
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

  const hoursDuration = lightingDealDuration.substring(0, 2)
  var endLightingDealTime = new Date(lightingDealStartTime)
  endLightingDealTime.setHours(
    endLightingDealTime.getHours() + parseInt(hoursDuration)
  )

  var miliseconds = endLightingDealTime.getTime() - now.getTime()
  const displayLeftDuration =
    miliseconds < 3600000
      ? new Date(miliseconds).toISOString().substr(14, 5)
      : new Date(miliseconds).toISOString().substr(11, 8)
  return (
    <div style={{ textAlign: "center", fontSize: "14px", color: "gray" }}>
      {displayLeftDuration}
    </div>
  )
}
