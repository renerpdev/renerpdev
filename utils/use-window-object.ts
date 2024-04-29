import { useEffect, useState } from "react"

export function useWindowObject() {
  const [_window, setWindowObject] = useState<any>({ matchMedia: () => ({ matches: false }) })

  useEffect(() => {
    setWindowObject(window)
  }, [])

  return _window
}
