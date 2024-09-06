"use client"

import * as React from "react"
import { PropsWithChildren, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useBreakpoint } from "@/hooks"

export const Magnet = ({ children }: PropsWithChildren) => {
  const reference = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const { isMobile } = useBreakpoint()

  const handleMouse = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event
    const { height, width, left, top } = (reference?.current as any)?.getBoundingClientRect()
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
      ref={reference}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={isMobile ? {} : { x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}>
      {children}
    </motion.div>
  )
}
