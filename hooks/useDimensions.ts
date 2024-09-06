import { useEffect, useRef } from "react"

export const useDimensions = (reference: any) => {
  const dimensions = useRef({ width: 0, height: 0 })

  useEffect(() => {
    dimensions.current.width = reference.current.offsetWidth
    dimensions.current.height = reference.current.offsetHeight
  }, [reference])

  return dimensions.current
}
