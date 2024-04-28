import React, { useEffect } from "react"
import { DotIcon } from "@sanity/icons"
import { stagger, useAnimate, useInView } from "framer-motion"
import { m } from "framer-motion"

interface TimelineProps extends React.PropsWithChildren {}
const Timeline = ({ children }: TimelineProps) => {
  return (
    <div className="space-y-0">
      {(children as React.ReactElement[]).map((child, index) => (
        <TimelineItem
          key={index}
          firstChild={index === 0}
          lastChild={index === (children as React.ReactElement[]).length - 1}>
          {child}
        </TimelineItem>
      ))}
    </div>
  )
}

const staggerMenuItems = stagger(0.1, { startDelay: 0.1 })

interface TimelineItemProps extends React.PropsWithChildren {
  lastChild?: boolean
  firstChild?: boolean
}
const TimelineItem = ({ children, lastChild, firstChild }: TimelineItemProps) => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { margin: "80px" })

  useEffect(() => {
    if (isInView) {
      animate(
        ".timeline-item",
        { opacity: 1, scale: 1 },
        { ease: "anticipate", duration: 0.8, delay: isInView ? staggerMenuItems : 0 }
      )
      animate(
        ".timeline-line",
        { height: "100%" },
        { duration: 0.8, delay: isInView ? staggerMenuItems : 0, type: "spring" }
      )
    }
  }, [animate, isInView])

  return (
    <div className="grid grid-cols-[auto_1fr] gap-2 md:gap-4" ref={scope}>
      <div className="relative col-auto">
        <m.div
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)"
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            restDelta: 2
          }}
          className={`opacity-0 blur-sm timeline-icon scale-0 ${firstChild ? "bg-cyan-900" : "bg-white"} rounded-full relative z-[2]`}>
          <div className="absolute top-0 left-0 h-4 w-4 border-2 border-cyan-900 rounded-full z-[2]" />
          <DotIcon className={`h-4 w-4 ${firstChild ? "text-white" : "text-cyan-950"} text-white relative z-[2]`} />
          {firstChild && (
            <m.div
              className="absolute top-0 left-0 h-4 w-4 bg-cyan-500/60 rounded-full z-[1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], scale: 1.5 }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: 0.2,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
            />
          )}
        </m.div>
        <div
          className={`w-[2px] md:w-[2.5px] top-0 left-1/2 -translate-x-1/2 absolute z-[1] bg-cyan-900 timeline-line h-0 ${!lastChild ? "" : "opacity-0"}`}
        />
      </div>
      <div className={"pb-8 timeline-item opacity-0 -mt-1"}>{children}</div>
    </div>
  )
}

export default Timeline
