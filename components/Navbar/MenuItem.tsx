import * as React from "react"
import { PropsWithChildren } from "react"
import { m } from "framer-motion"

const variants = {
  open: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      y: { stiffness: 800, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    scale: 0.5,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
}

export const MenuItem = ({ link, children, onClick }: { link: string; onClick?: () => void } & PropsWithChildren) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setTimeout(() => (window.location.href = link), 250)
    if (onClick) {
      onClick()
    }
  }

  return (
    <m.li
      variants={variants}
      whileHover={{
        scale: 1.5
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 800, damping: 40 }}>
      <a
        href={link}
        onClick={handleClick}
        className="heading hover:text-cyan-500 text-5xl md:text-6xl xl:text-7xl font-bold  text-transparent bg-gradient-to-tr from-cyan-600 to-cyan-500 bg-clip-text drop-shadow-md">
        {children}
      </a>
    </m.li>
  )
}
