import { ReactNode } from "react"

export const Title = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <h2
      className={`text-4xl lg:text-5xl font-bold text-center mb-2 lg:mb-4 bg-gradient-to-r from-cyan-950 to-cyan-600 bg-clip-text text-transparent ${className}`}>
      {children}
    </h2>
  )
}
