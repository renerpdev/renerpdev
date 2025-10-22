"use client"

import React, { useEffect, useRef } from "react"
import { m, useMotionValue, useTransform } from "framer-motion"
import { MouseIcon, RocketIcon } from "@/components"
import { type CursorAnimationHandler, useBreakpoint } from "@/hooks"
import type { Hero as HeroType } from "@/sanity/models"
import { PortableText } from "@portabletext/react"

interface HeroProps extends CursorAnimationHandler {
  hero: HeroType | null
}

export const Hero = ({ setCursorText, setCursorVariant, hero }: HeroProps) => {
  const viewport = useViewportDimensions()
  const gradientX = useMotionValue(0.8)
  const gradientY = useMotionValue(0.7)

  const background = useTransform(
    [gradientX, gradientY],
    ([x, y]: number[]) => `radial-gradient(circle at ${x * 100}% ${y * 100}%, transparent 0%, #1d2839 40%)`
  )

  const { isMobile } = useBreakpoint()

  if (!hero) {
    return null
  }

  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function contactEnter() {
    setCursorText("👋")
    setCursorVariant("link")
  }
  function downloadEnter() {
    setCursorText("📃")
    setCursorVariant("link")
  }

  const bgStyle = { background: `url(${hero.bgImage?.image?.asset?.url}) repeat center/25% #1d2839` }

  return (
    <div
      className="text-center md:text-left text-gray-600 body-font bg-gradient-to-r to-gray-900 from-slate-800 h-screen min-h-[36rem] flex"
      style={bgStyle}>
      <m.div
        style={isMobile ? undefined : { background }}
        className=" flex px-10 py-12 items-center justify-center flex-col w-full z-10"
        onPointerMove={
          isMobile
            ? undefined
            : (event) => {
                gradientX.set(event.clientX / viewport.width)
                gradientY.set(event.clientY / viewport.height)
              }
        }>
        <div className="container mx-auto  max-w-3xl lg:max-w-4xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-2 text-white tracking-tight leading-tight md:leading-tight">
            <PortableText
              value={hero.header}
              components={{
                block: {
                  normal: ({ children }) => <>{children}</>
                },
                marks: {
                  strong: ({ children }) => <span className="text-cyan-600">{children}</span>,
                  em: ({ children }) => <em>{children}</em>
                }
              }}
            />
          </h1>
          <div className="mt-4 mb-6 !leading-relaxed text-white/80 tracking-wide text-md md:text-xl lg:text-2xl mx-auto md:ml-0 max-w-md sm:max-w-lg md:max-w-3xl font-light">
            <PortableText
              value={hero.subheader}
              components={{
                block: {
                  normal: ({ children }) => <p>{children}</p>
                },
                marks: {
                  strong: ({ children }) => <strong className="font-medium text-white">{children}</strong>,
                  em: ({ children }) => <em>{children}</em>
                }
              }}
            />
          </div>
          <div className={"inline-flex flex-col sm:flex-row gap-3 sm:gap-4 "}>
            {hero.primaryCta && (
              <m.a
                onMouseEnter={isMobile ? undefined : contactEnter}
                onMouseLeave={isMobile ? undefined : onMouseLeave}
                href={hero.primaryCta.link}
                whileHover={isMobile ? undefined : { scale: 1.1 }}
                whileTap={isMobile ? undefined : { scale: 1 }}
                transition={isMobile ? undefined : { type: "spring" as const, stiffness: 400, damping: 10 }}
                className={
                  "max-w-sm mx-auto md:ml-0 text-md sm:text-lg flex md:inline-flex justify-center items-center bg-cyan-600  px-6 sm:px-8 py-3 rounded-3xl border-none"
                }>
                <span className={"mr-2 text-white"}>{hero.primaryCta.text}</span>
                <RocketIcon className="text-white" />
              </m.a>
            )}
            {hero.secondaryCta?.file?.file?.asset?.url && (
              <m.a
                onMouseEnter={isMobile ? undefined : downloadEnter}
                onMouseLeave={isMobile ? undefined : onMouseLeave}
                href={hero.secondaryCta.file.file.asset.url}
                target="_blank"
                rel="noreferrer noopener"
                whileHover={isMobile ? undefined : { scale: 1.1 }}
                whileTap={isMobile ? undefined : { scale: 1 }}
                transition={isMobile ? undefined : { type: "spring" as const, stiffness: 400, damping: 10 }}
                className={
                  "max-w-sm mx-auto md:ml-0 text-md sm:text-lg flex md:inline-flex justify-center bg-white items-center px-6 sm:px-8 py-3 rounded-3xl border-none"
                }>
                <span className={"bg-gradient-to-r from-cyan-950 to-cyan-700 bg-clip-text text-transparent"}>
                  {hero.secondaryCta.text}
                </span>
              </m.a>
            )}
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
