"use client"

import { useWindowObject } from "@/hooks/useWindowObject"

/**
 * Hook to detect if the device supports hover interactions.
 * Returns false for touch-only devices to prevent double-tap issues.
 *
 * @returns {boolean} true if device supports hover, false for touch devices
 */
export function useHover(): boolean {
  const window = useWindowObject()

  // Check if device supports hover using the hover media query
  // This returns false for touch devices and true for devices with a mouse/trackpad
  const supportsHover = window.matchMedia("(hover: hover)").matches

  return supportsHover
}
