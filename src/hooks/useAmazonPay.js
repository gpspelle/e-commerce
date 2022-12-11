/**
 * Get Amazon pay
 * @returns
 */
import { useEffect, useState } from "react"

export default function useAmazonPay() {
  const [amazonPay, setAmazonPay] = useState(null)

  useEffect(() => {
    const _window = window
    const amazonApi = _window?.amazon?.Pay
    if (amazonApi) {
      // set only if amazon pay is not set
      if (!amazonPay) {
        setAmazonPay({ ...amazonApi })
      }
    }
  })

  return { amazonPay: { ...amazonPay } }
}
