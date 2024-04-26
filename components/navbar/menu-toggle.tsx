import * as React from "react"
import { m } from "framer-motion"

const Path = (props: any) => (
  <m.path fill="currentColor" strokeWidth="3" stroke="hsl(0, 0%, 18%)" strokeLinecap="round" {...props} />
)

export const MenuToggle = ({ toggle, className, ...props }: any) => (
  <button onClick={toggle} className={`p-2 ${className}`} {...props}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: {
            transition: {
              delay: 0.5
            },
            d: "M 2 2.5 L 20 2.5",
            stroke: "white"
          },
          open: { d: "M 3 16.5 L 17 2.5", stroke: "white" }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: {
            transition: {
              delay: 0.5
            },
            opacity: 1,
            stroke: "white"
          },
          open: { opacity: 0, stroke: "white" }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: {
            transition: {
              delay: 0.5
            },
            d: "M 2 16.346 L 20 16.346",
            stroke: "white"
          },
          open: { d: "M 3 2.5 L 17 16.346", stroke: "white" }
        }}
      />
    </svg>
  </button>
)
