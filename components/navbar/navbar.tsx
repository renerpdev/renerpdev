import * as React from "react"
import { useRef } from "react"
import { m, useCycle } from "framer-motion"
import { useDimensions } from "@/utils/use-dimensions"
import { MenuToggle } from "./menu-toggle"
import { Navigation } from "./navigation"
import { LogoIcon } from "@/components/icons/logo"
import { CursorAnimationHandler } from "@/utils/use-cursor-animation"

const backdrop = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 70px) calc(0% + 70px))`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(0px at calc(100% - 70px) calc(0% + 70px))",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 40
    }
  }
}

const toggle = {
  open: () => ({
    background: "transparent",
    transform: "rotate(90deg)",
    transition: {
      type: "teen"
    }
  }),
  closed: {
    background: "#18C5E1",
    transition: {
      delay: 0.5,
      type: "teen"
    }
  }
}

const Navbar = ({ setCursorText, setCursorVariant }: CursorAnimationHandler) => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)

  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function linkEnter() {
    setCursorText("")
    setCursorVariant("action")
  }

  return (
    <m.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className={`${isOpen ? "fixed z-40" : "absolute"} top-0 bottom-0 right-0 w-screen h-screen p-12 flex justify-between items-start`}>
      <LogoIcon className={`relative z-20 w-8 h-8 text-cyan-600 ${isOpen ? "hidden" : "block"}`} />
      <m.div
        className="bg-gradient-from-tr bg-gradient-to-bl from-[_#1D2839] to-[_#1D2630] ring-1 ring-white fixed top-0 bottom-0 right-0 w-screen z-20"
        variants={backdrop}
      />
      <m.div
        className={"fixed top-10 right-12 z-30 p-2 rounded-full flex items-center justify-center"}
        variants={toggle}>
        <MenuToggle
          toggle={toggleOpen}
          onMouseEnter={linkEnter}
          onMouseLeave={onMouseLeave}
          className="translate-y-0.5"
        />
      </m.div>
      <Navigation onItemClick={toggleOpen} />
    </m.nav>
  )
}

export default Navbar
