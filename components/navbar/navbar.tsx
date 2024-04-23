import * as React from "react"
import { useRef } from "react"
import { m, useCycle } from "framer-motion"
import { useDimensions } from "./use-dimensions"
import { MenuToggle } from "./menu-toggle"
import { Navigation } from "./navigation"

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 50px) calc(0% + 50px))`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(0px at calc(100% - 50px) calc(0% + 50px))",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
}

const Navbar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)

  return (
    <m.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className={`${isOpen ? "fixed z-40" : "absolute"} top-0 bottom-0 right-0 w-screen h-screen flex justify-start items-end p-8 flex-col`}>
      <m.div className="bg-white absolute top-0 bottom-0 right-0 w-full z-20" variants={sidebar} />
      <MenuToggle toggle={toggleOpen} className="absolute top-0 right-0 z-20" />
      <Navigation onItemClick={toggleOpen} />
    </m.nav>
  )
}

export default Navbar
