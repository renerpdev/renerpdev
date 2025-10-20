"use client"

import React, { ReactElement, useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import { type CursorAnimationHandler } from "@/hooks"

const DRAG_BUFFER = 10

const SPRING_OPTIONS = {
  type: "spring" as const,
  mass: 3,
  stiffness: 400,
  damping: 50
}

interface SwipeCarouselProperties extends CursorAnimationHandler {
  children: ReactElement[]
  className?: string
}
export const SwipeCarousel = ({
  children: slides,
  className,
  setCursorText,
  setCursorVariant
}: SwipeCarouselProperties) => {
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
    setCursorVariant("drag")
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

interface SlidesProperties {
  imgIndex: number
  slides: ReactElement[]
}
const Slides = ({ slides }: SlidesProperties) => {
  return (
    <>
      {slides.map((content, index) => {
        return (
          <motion.div key={index} transition={SPRING_OPTIONS} className="w-full shrink-0">
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
      {slices.map((_, index) => {
        return (
          <button
            key={index}
            onClick={() => setImgIndex(index)}
            className={`h-3 w-3 rounded-full transition-colors border-2 border-white ${
              index === imgIndex ? "bg-white" : "bg-transparent"
            }`}
          />
        )
      })}
    </div>
  )
}
