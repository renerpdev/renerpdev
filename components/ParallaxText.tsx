"use client"

import {
  m,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap
} from "framer-motion"
import { useRef } from "react"

interface ParallaxProperties {
  children: string
  baseVelocity: number
  className?: string
}

export function ParallaxText({ children, className, baseVelocity = 500 }: ParallaxProperties) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 500
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 3000], [0, 5], {
    clamp: false
  })

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 3000)

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += (directionFactor.current * moveBy * velocityFactor.get()) / 2

    baseX.set(baseX.get() + moveBy)
  })

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want to derive from the
   * dynamically generated number of children.
   */
  return (
    <div className={`parallax py-4 ${className}`}>
      <m.div
        className="scroller text-2xl sm:text-4xl lg:text-6xl 2xl:text-7xl mr text-white heading !font-light bg-gradient-to-r from-cyan-950 to-cyan-600 bg-clip-text text-transparent"
        style={{ x }}>
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className="mr-1.5 md:mr-4">
            {children}{" "}
          </span>
        ))}
      </m.div>
    </div>
  )
}
