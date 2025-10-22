import { m } from "framer-motion"

const svgVariants = {
  start: {
    opacity: 0
  },
  end: {
    opacity: 1,
    transition: {
      duration: 1,
      type: "spring" as const
    }
  }
}

const pathVariants = {
  loop: {
    y: [5, 30],
    transition: {
      delay: 1,
      duration: 1.8,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse"
    }
  }
}

export const MouseIcon = ({ className }: { className?: string }) => {
  return (
    <m.svg
      className={`${className}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="175"
      height="202"
      viewBox="0 0 79.37 122.88"
      initial="start"
      animate="end"
      xmlSpace="preserve"
      variants={svgVariants}>
      <m.path
        d="M67.71,11.48c-4.79-4.79-10.8-8.38-17.51-10.23C45.7,0,37.42-.42,32.55.48c-8.07,1.48-15.31,5.42-20.9,11C4.46,18.67,0,28.59,0,39.51v43.69c0,10.91,4.46,20.84,11.65,28.03s17.11,11.65,28.03,11.65,20.84-4.46,28.03-11.65,11.65-17.11,11.65-28.03v-43.69c0-10.92-4.46-20.84-11.65-28.03ZM69.99,83.2c0,8.33-3.42,15.91-8.91,21.4-5.5,5.5-13.07,8.91-21.4,8.91s-15.91-3.42-21.4-8.91-8.91-13.07-8.91-21.4v-43.69c0-8.33,3.42-15.91,8.91-21.4s13.07-8.91,21.4-8.91,15.91,3.42,21.4,8.91,8.91,13.07,8.91,21.4v43.69Z"
        fill="currentColor"
        strokeWidth="0"
      />
      <m.path
        d="M47.23,41.7c0,4.15-3.4,7.55-7.55,7.55s-7.55-3.4-7.55-7.55v-7.78c0-4.15,3.39-7.55,7.55-7.55s7.55,3.4,7.55,7.55v7.78Z"
        fill="currentColor"
        animate="loop"
        strokeWidth="0"
        // @ts-ignore
        variants={pathVariants}
      />
    </m.svg>
  )
}
