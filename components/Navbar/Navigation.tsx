import * as React from "react"
import { m } from "framer-motion"
import type { MenuLink } from "@/sanity/models"

import { MenuItem } from "./MenuItem"

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

interface NavigationProps {
  menuLinks: MenuLink[]
  onItemClick?: () => void
  className?: string
}

export const Navigation = ({ menuLinks, onItemClick, className }: NavigationProps) => (
  <m.ul
    variants={variants}
    className={`z-20 py-2 flex flex-col gap-10 justify-center items-center fixed top-0 left-0 w-screen h-screen min-h-[28rem] overflow-y-auto ${className}`}>
    {menuLinks.map((item) => (
      <MenuItem key={item.label} link={item.anchor} onClick={onItemClick}>
        {item.label}
      </MenuItem>
    ))}
  </m.ul>
)
