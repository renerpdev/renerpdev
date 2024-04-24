import { useState } from "react"
import { useFollowPointer } from "@/utils/use-follow-pointer"

export type CursorAnimationHandler = {
  setCursorText: (text: string) => void
  setCursorVariant: (variant: "default" | "link" | "action") => void
}

export const useCursorAnimation = () => {
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")

  const { mouseXPosition, mouseYPosition } = useFollowPointer()

  const variants = {
    default: {
      opacity: 1,
      height: 10,
      width: 10,
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
      backgroundColor: "transparent",
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
