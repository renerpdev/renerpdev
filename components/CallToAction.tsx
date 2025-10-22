"use client"

import React from "react"
import { m } from "framer-motion"
import { type CursorAnimationHandler, useBreakpoint } from "@/hooks"
import type { CallToActionSection } from "@/sanity/models"

interface CallToActionProps extends CursorAnimationHandler {
  callToActionSection: CallToActionSection | null
}

export const CallToAction = ({ setCursorText, setCursorVariant, callToActionSection }: CallToActionProps) => {
  const { isMobile } = useBreakpoint()

  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function contactEnter() {
    setCursorText("☕️")
    setCursorVariant("link")
  }

  if (!callToActionSection) {
    return null
  }

  return (
    <div className={"bg-[#1d2839] px-5 py-14 lg:py-16"}>
      <div
        className={
          "w-full max-w-7xl mx-auto text-center flex gap-6 flex-col lg:flex-row items-center lg:items-start justify-evenly text-white"
        }>
        <h3 className={"text-3xl font-bold whitespace-nowrap"}>{callToActionSection.title}</h3>
        {callToActionSection.subtitle && (
          <p className={"text-base md:text-lg tracking-wider max-w-2xl"}>{callToActionSection.subtitle}</p>
        )}
        <m.a
          onMouseEnter={isMobile ? undefined : contactEnter}
          onMouseLeave={isMobile ? undefined : onMouseLeave}
          whileHover={isMobile ? undefined : { scale: 1.1, rotate: 2 }}
          whileTap={isMobile ? undefined : { scale: 1 }}
          transition={isMobile ? undefined : { type: "spring", stiffness: 400, damping: 10 }}
          href={callToActionSection.cta.link}
          className={
            "rounded-full ring-2 ring-white px-8 py-3 hover:bg-white hover:text-cyan-950 transition-colors whitespace-nowrap"
          }>
          {callToActionSection.cta.text}
        </m.a>
      </div>
    </div>
  )
}
