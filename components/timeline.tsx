import React from "react"
import { CheckmarkIcon } from "@sanity/icons"

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

interface TimelineItemProps extends React.PropsWithChildren {
  lastChild?: boolean
  firstChild?: boolean
}
const TimelineItem = ({ children, lastChild, firstChild }: TimelineItemProps) => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4">
      <div className="relative col-auto">
        <div
          className={`border-2 border-cyan-900 ${firstChild ? "bg-cyan-900" : "bg-white"} rounded-full relative z-[2]`}>
          <CheckmarkIcon className={`h-4 w-4 ${firstChild ? "text-white" : "text-cyan-900"}`} />
        </div>
        {!lastChild && (
          <div className={"w-[2.5px] h-full top-0 left-1/2 -translate-x-1/2 absolute z-[1] bg-cyan-900"} />
        )}
      </div>
      <div className={"pb-6"}>{children}</div>
    </div>
  )
}

export default Timeline
