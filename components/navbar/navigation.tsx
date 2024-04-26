import * as React from "react"
import { m } from "framer-motion"
import { MenuItem } from "./menu-item"

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    opacity: 1
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
    opacity: 0
  }
}

export const Navigation = ({ onItemClick, className }: { onItemClick?: () => void; className?: string }) => (
  <m.ul
    variants={variants}
    className={`z-20 py-2 flex flex-col gap-10 justify-center items-center fixed top-0 left-0 w-screen h-screen min-h-[28rem] overflow-y-auto ${className}`}>
    {items.map((item) => (
      <MenuItem key={item.text} link={item.link} onClick={onItemClick}>
        {item.text}
      </MenuItem>
    ))}
  </m.ul>
)

const items: { text: string; link: string }[] = [
  {
    text: "About",
    link: "#about"
  },
  {
    text: "Experience",
    link: "#experience"
  },
  {
    text: "Projects",
    link: "#projects"
  },
  {
    text: "Skills",
    link: "#skills"
  },
  {
    text: "Contact",
    link: "#contact"
  }
]
