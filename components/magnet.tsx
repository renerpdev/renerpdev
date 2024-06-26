import { PropsWithChildren, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useBreakpoint } from "@/utils/use-breakpoint"

export default function Magnet({ children }: PropsWithChildren) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const { isMobile } = useBreakpoint()

  const handleMouse = (e: any) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = (ref?.current as any)?.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX, y: middleY })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position
  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={isMobile ? {} : { x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}>
      {children}
    </motion.div>
  )
}
