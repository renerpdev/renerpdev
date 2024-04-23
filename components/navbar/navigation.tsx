import * as React from "react"
import { m } from "framer-motion"
import { MenuItem } from "./menu-item"

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    display: "flex"
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
    display: "none"
  }
}

export const Navigation = ({ onItemClick }: { onItemClick?: () => void }) => (
  <m.ul variants={variants} className="z-20 flex-col gap-10 justify-center items-center w-full h-full">
    {items.map((item) => (
      <MenuItem key={item.id} link={item.link} onClick={onItemClick}>
        {item.text}
      </MenuItem>
    ))}
  </m.ul>
)

const items: { id: number; text: string; link: string }[] = [
  {
    id: 0,
    text: "Skills",
    link: "#skills"
  },
  {
    id: 1,
    text: "Experience",
    link: "#experience"
  },
  {
    id: 2,
    text: "Projects",
    link: "#projects"
  },
  {
    id: 3,
    text: "Contact",
    link: "#contact"
  }
]
