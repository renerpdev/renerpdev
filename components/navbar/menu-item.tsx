import * as React from "react"
import { m } from "framer-motion"
import { PropsWithChildren } from "react"

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
}

export const MenuItem = ({ link, children, onClick }: { link: string; onClick?: () => void } & PropsWithChildren) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setTimeout(() => (window.location.href = link), 200)
    if (onClick) {
      onClick()
    }
  }

  return (
    <m.li variants={variants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <a
        href={link}
        onClick={handleClick}
        className="text-5xl md:text-6xl font-bold  text-transparent bg-gradient-to-tr from-cyan-700 to-cyan-600 bg-clip-text drop-shadow-md">
        {children}
      </a>
    </m.li>
  )
}
