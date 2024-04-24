import { RefObject, useState } from "react"
import { useFollowPointer } from "@/utils/use-follow-pointer"

export type CursorAnimationHandler = {
  setCursorText: (text: string) => void
  setCursorVariant: (variant: "default" | "link" | "action" | "drag") => void
}

export const useCursorAnimation = (ref: RefObject<HTMLElement>) => {
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")

  const { mouseXPosition, mouseYPosition } = useFollowPointer(ref)

  const variants = {
    default: {
      opacity: 1,
      height: 0,
      width: 0,
      fontSize: "16px",
      backgroundColor: "#1e91d6",
      x: mouseXPosition,
      y: mouseYPosition,
      transition: {
        type: "spring",
        mass: 0.6
      }
    },
    link: {
      opacity: 1,
      backgroundColor: "#95dbf5",
      color: "#000",
      height: 64,
      width: 64,
      fontSize: "32px",
      x: mouseXPosition - 32,
      y: mouseYPosition - 72
    },
    action: {
      opacity: 1,
      backgroundColor: "rgba(255, 255, 255, 0)",
      height: 64,
      width: 64,
      border: "2px solid white",
      x: mouseXPosition - 32,
      y: mouseYPosition - 32
    },
    drag: {
      opacity: 1,
      backgroundColor: "rgba(255, 255, 255, .5)",
      height: 64,
      width: 64,
      border: "2px solid white",
      x: mouseXPosition - 32,
      y: mouseYPosition - 32
    }
  }

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28
  }

  return { cursorText, setCursorText, cursorVariant, setCursorVariant, variants, spring }
}