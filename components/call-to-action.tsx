import React from "react"
import { m } from "framer-motion"
import { CursorAnimationHandler } from "@/utils/use-cursor-animation"

const CallToAction = ({ setCursorText, setCursorVariant }: CursorAnimationHandler) => {
  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function contactEnter() {
    setCursorText("☕️")
    setCursorVariant("link")
  }

  return (
    <div className={"bg-[#1d2839] px-5 py-12 lg:py-14"}>
      <div
        className={
          "w-full max-w-7xl mx-auto text-center flex gap-6 flex-col lg:flex-row items-center lg:items-start justify-evenly text-white"
        }>
        <h3 className={"text-3xl font-bold whitespace-nowrap"}>Start a project</h3>
        <p className={"text-lg tracking-wider max-w-2xl"}>
          {"Are you interested in working together? Let's grab a coffee and chat about it! My treat!"}
        </p>
        <m.a
          onMouseEnter={contactEnter}
          onMouseLeave={onMouseLeave}
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          href="#contact"
          className={
            "rounded-full ring-2 ring-white px-8 py-3 hover:bg-white hover:text-cyan-950 transition-colors whitespace-nowrap"
          }>
          {"Let's chat!"}
        </m.a>
      </div>
    </div>
  )
}

export default CallToAction
