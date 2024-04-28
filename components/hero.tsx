import React, { useEffect, useRef } from "react"
import { m, useMotionValue, useTransform } from "framer-motion"
import { RocketIcon } from "@/components/icons/rocket"
import { CursorAnimationHandler } from "@/utils/use-cursor-animation"
import { useBreakpoint } from "@/utils/use-breakpoint"
import { MouseIcon } from "@/components/icons/mouse"

const Hero = ({ setCursorText, setCursorVariant }: CursorAnimationHandler) => {
  const viewport = useViewportDimensions()
  const gradientX = useMotionValue(0.8)
  const gradientY = useMotionValue(0.7)

  const background = useTransform(
    [gradientX, gradientY],
    ([x, y]: number[]) => `radial-gradient(circle at ${x * 100}% ${y * 100}%, transparent 0%, #1d2839 40%)`
  )

  const { isMobile } = useBreakpoint()

  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function linkEnter() {
    setCursorText("👀")
    setCursorVariant("link")
  }

  function contactEnter() {
    setCursorText("👋")
    setCursorVariant("link")
  }
  function downloadEnter() {
    setCursorText("📥")
    setCursorVariant("link")
  }

  return (
    <div
      className="text-center md:text-left text-gray-600 body-font bg-gradient-to-r to-gray-900 from-slate-800 h-screen min-h-[36rem] flex"
      style={{ background: "url(/assets/circuit-board.svg) repeat center/25% #1d2839" }}>
      <m.div
        style={!isMobile ? { background } : undefined}
        className=" flex px-10 py-12 items-center justify-center flex-col w-full z-10"
        onPointerMove={
          isMobile
            ? undefined
            : (e) => {
                gradientX.set(e.clientX / viewport.width)
                gradientY.set(e.clientY / viewport.height)
              }
        }>
        <div className="container mx-auto  max-w-3xl lg:max-w-4xl w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl mb-2 font-bold text-white tracking-tight leading-tight md:leading-tight">
            {"Hello, I’m "} <span className={"text-cyan-600"}>René Ricardo</span>
          </h1>
          <p className="mt-4 mb-6 leading-relaxed text-white/80 tracking-wide text-md md:text-xl lg:text-2xl mx-auto md:ml-0 max-w-md sm:max-w-lg md:max-w-2xl font-light">
            {"I'm a "}
            <a
              onMouseEnter={linkEnter}
              onMouseLeave={onMouseLeave}
              href="https://github.com/renerpdev"
              target="_blank"
              rel="noreferrer noopener"
              className={"inline-flex text-white font-normal hover:text-cyan-600 "}>
              Software Engineer
            </a>{" "}
            and{" "}
            <a
              onMouseEnter={linkEnter}
              onMouseLeave={onMouseLeave}
              href="https://dribbble.com/renerpdev"
              target="_blank"
              rel="noreferrer noopener"
              className={"inline-flex text-white font-normal hover:text-cyan-600 "}>
              Design Enthusiast
            </a>
            , based in Montevideo, Uruguay. {"Let's connect and build something cool together!"}
          </p>
          <div className={"inline-flex flex-col sm:flex-row gap-3 sm:gap-4 "}>
            <m.a
              onMouseEnter={contactEnter}
              onMouseLeave={onMouseLeave}
              href="#contact"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={
                "max-w-sm mx-auto md:ml-0 text-md sm:text-lg flex md:inline-flex justify-center items-center bg-cyan-600  px-6 sm:px-8 py-3 rounded-3xl border-none"
              }>
              <span className={"mr-2 text-white"}>{"Let's connect"}</span>
              <RocketIcon className="text-white" />
            </m.a>
            <m.a
              onMouseEnter={downloadEnter}
              onMouseLeave={onMouseLeave}
              href="/assets/Rene_Ricardo_resume.pdf"
              target="_blank"
              rel="noreferrer noopener"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={
                "max-w-sm mx-auto md:ml-0 text-md sm:text-lg flex md:inline-flex justify-center bg-white items-center px-6 sm:px-8 py-3 rounded-3xl border-none"
              }>
              <span className={"bg-gradient-to-r from-cyan-950 to-cyan-700 bg-clip-text text-transparent"}>
                {"Check Resume"}
              </span>
            </m.a>
          </div>
        </div>
        <a href="#about" className="absolute bottom-16 left-1/2 -ml-4 md:-ml-3">
          <MouseIcon className="text-white h-10 md:h-12 w-10 md:w-12" />
        </a>
      </m.div>
    </div>
  )
}

function useViewportDimensions() {
  const dimensions = useRef({ width: 0, height: 0 })

  // Note: This won't accurately reflect viewport size changes
  useEffect(() => {
    dimensions.current.width = window.innerWidth
    dimensions.current.height = window.innerHeight
  }, [])

  return dimensions.current
}

export default Hero
