import { AddCircleIcon, CheckmarkCircleIcon } from "@sanity/icons"
import { type CursorAnimationHandler } from "@/hooks"
import React, { useMemo } from "react"
import { m } from "framer-motion"
import { ExternalLink, Subtitle, Timeline, Title } from "@/components"
import { format } from "date-fns"

import { WORK_EXPERIENCE } from "./constants"

const ITEMS_THRESHOLD = 2

export const Experience = ({ setCursorText, setCursorVariant }: CursorAnimationHandler) => {
  const sortedJobs = useMemo(() => WORK_EXPERIENCE.sort((a, b) => b.start.getTime() - a.start.getTime()), [])
  const [showAll, setShowAll] = React.useState(false)

  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function linkEnter() {
    setCursorText("👀")
    setCursorVariant("link")
  }

  return (
    <div className="flex justify-center items-center  h-full mx-auto max-w-3xl lg:max-w-4xl w-full">
      <div className="mx-auto w-full">
        <Title>Experience</Title>
        <Subtitle>{"Where I've worked so far"}</Subtitle>
        <div className="mt-10">
          <Timeline>
            {sortedJobs.slice(0, showAll ? undefined : ITEMS_THRESHOLD).map((job) => (
              <div key={job.name} className={"space-y-2"}>
                <div className="mb-2 space-y-1">
                  <p className={"flex items-center gap-x-2 flex-wrap"}>
                    <a
                      className={"flex items-center font-medium gap-2 text-lg"}
                      href={job.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      onMouseEnter={linkEnter}
                      onMouseLeave={onMouseLeave}>
                      <span>{job.name}</span>
                      <ExternalLink />
                    </a>
                    <span className="font-normal text-xs sm:text-sm rounded-full border-2 border-cyan-950 px-2.5">
                      {`${format(job.start, "MMM yyyy")} - ${job.end ? format(job.end, "MMM yyyy") : "Present"}`}
                    </span>
                    <span className="font-normal text-xs sm:text-sm rounded-full border-2 border-cyan-950 px-2.5">
                      {" "}
                      {job.mode}
                    </span>
                  </p>
                  <p className="text-cyan-600 ">{job.role}</p>
                </div>
                <ul className="space-y-1.5">
                  {job.tasks.map((task) => (
                    <li key={task} className={"flex gap-2 text-sm sm:text-base"}>
                      <CheckmarkCircleIcon className="translate-y-1/4 shrink-0" />
                      <p>{task}</p>
                    </li>
                  ))}
                </ul>
                <ul className="flex gap-2 flex-wrap">
                  {job.tags.map((tag) => (
                    <span key={tag} className={"text-xs sm:text-sm text-white rounded-full bg-cyan-950 py-1 px-2.5"}>
                      {tag}
                    </span>
                  ))}
                </ul>
              </div>
            ))}
          </Timeline>
          <>
            <div
              className={
                showAll
                  ? undefined
                  : "h-28 -mt-28 bg-gradient-to-b from-transparent from-0% via-white/60 via-10% to-white to-80% w-full scale-x-110 relative z-10"
              }
            />
            {!showAll && (
              <div className={"text-center flex items-center"}>
                <Divider />
                <m.button
                  title="Show More"
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.2 },
                    type: "spring"
                  }}
                  onClick={() => setShowAll(!showAll)}
                  className={"text-gray-500 hover:text-gray-700 transition-colors"}>
                  <AddCircleIcon className="h-8 w-8 text-gray-500" />
                </m.button>
                <Divider />
              </div>
            )}
          </>
          <m.a
            onMouseEnter={linkEnter}
            onMouseLeave={onMouseLeave}
            href="/assets/Rene_Ricardo_Resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            transition={{ type: "teen", stiffness: 400, damping: 10 }}
            className={
              "underline underline-offset-2 mt-8 max-w-max text-center mx-auto text-sm flex justify-center items-center gap-2 px-3 py-1 z-0"
            }>
            <span className={"text-cyan-950"}>{"See Full Resume"}</span>
            <ExternalLink />
          </m.a>
        </div>
      </div>
    </div>
  )
}

const Divider = () => <div className={"h-0.5 w-full bg-gray-100 rounded-full"} />
