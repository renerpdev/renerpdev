import React, { ReactNode } from "react"

const Subtitle = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <h3 className={`text-center mx-auto max-w-md text-lg md:text-xl font-light mb-6 ${className}`}>{children}</h3>
}

export default Subtitle
