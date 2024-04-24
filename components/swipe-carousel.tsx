import React, { ReactElement, useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import { CursorAnimationHandler } from "@/utils/use-cursor-animation"

const DRAG_BUFFER = 10

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50
}

interface SwipeCarouselProps extends CursorAnimationHandler {
  children: ReactElement[]
  className?: string
}
export const SwipeCarousel = ({ children: slides, className, setCursorText, setCursorVariant }: SwipeCarouselProps) => {
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

  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function linkEnter() {
    setCursorText("")
    setCursorVariant("action")
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
        onMouseLeave={onMouseLeave}
        onMouseEnter={linkEnter}
        className="flex items-start cursor-grab lg:cursor-none">
        <Slides {...{ imgIndex, slides }} />
      </motion.div>

      <Dots slices={slides} imgIndex={imgIndex} setImgIndex={setImgIndex} />
    </div>
  )
}

interface SlidesProps {
  imgIndex: number
  slides: ReactElement[]
}
const Slides = ({ slides }: SlidesProps) => {
  return (
    <>
      {slides.map((content, idx) => {
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
    <div className="mt-8 flex w-full justify-center gap-2">
      {slices.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors border-2 border-white ${
              idx === imgIndex ? "bg-white" : "bg-transparent"
            }`}
          />
        )
      })}
    </div>
  )
}
