import React, { ReactElement, useState } from "react"
import { motion, useMotionValue } from "framer-motion"

const DRAG_BUFFER = 20

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50
}

export const SwipeCarousel = ({ children: slides, className }: { children: ReactElement[]; className?: string }) => {
  const [imgIndex, setImgIndex] = useState(0)

  const dragX = useMotionValue(0)

  const onDragEnd = () => {
    const x = dragX.get()

    if (x <= -DRAG_BUFFER && imgIndex < slides.length - 1) {
      setImgIndex((pv) => pv + 1)
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1)
    }
  }

  return (
    <div className={`relative overflow-hidden py-8 ${className}`}>
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0
        }}
        style={{
          x: dragX
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-start active:cursor-grabbing">
        <Slices imgIndex={imgIndex} slices={slides} />
      </motion.div>

      <Dots slices={slides} imgIndex={imgIndex} setImgIndex={setImgIndex} />
    </div>
  )
}

const Slices = ({ slices }: { imgIndex: number; slices: ReactElement[] }) => {
  return (
    <>
      {slices.map((content, idx) => {
        return (
          <motion.div key={idx} transition={SPRING_OPTIONS} className="w-full shrink-0">
            {content}
          </motion.div>
        )
      })}
    </>
  )
}

const Dots = ({ slices, imgIndex, setImgIndex }: { slices: ReactElement[]; imgIndex: number; setImgIndex: any }) => {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {slices.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors border-2 border-cyan-800 ${
              idx === imgIndex ? "bg-cyan-800" : "bg-white"
            }`}
          />
        )
      })}
    </div>
  )
}
