import { useWindowObject } from "@/hooks/useWindowObject"

export function useBreakpoint() {
  const window = useWindowObject()

  const isMobile = window.matchMedia("(max-width: 992px)").matches

  return { isMobile }
}
