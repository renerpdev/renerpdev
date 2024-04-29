import useMouse from "@react-hook/mouse-position"
import { RefObject } from "react"

export function useFollowPointer(ref: RefObject<HTMLElement>) {
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100
  })

  let mouseXPosition = 0
  let mouseYPosition = 0

  if (mouse.x !== null) {
    mouseXPosition = mouse.clientX ?? 0
  }

  if (mouse.y !== null) {
    mouseYPosition = mouse.clientY ?? 0
  }

  return { mouseXPosition, mouseYPosition }
}
