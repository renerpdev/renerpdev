"use client"

import { AddCircleIcon, CheckmarkCircleIcon } from "@sanity/icons"
import { type CursorAnimationHandler, useBreakpoint } from "@/hooks"
import React from "react"
import { m } from "framer-motion"
import { ExternalLink, Subtitle, Timeline, Title } from "@/components"
import { format } from "date-fns"
import type { ExperienceSection } from "@/sanity/models"

const ITEMS_THRESHOLD = 2

interface ExperienceProps extends CursorAnimationHandler {
  experienceSection: ExperienceSection | null
}

export const Experience = ({ setCursorText, setCursorVariant, experienceSection }: ExperienceProps) => {
  const [showAll, setShowAll] = React.useState(false)
  const { isMobile } = useBreakpoint()

  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function linkEnter() {
    setCursorText("👀")
    setCursorVariant("link")
  }

  const experiences = (experienceSection?.experiences || []).sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  })

  return (
    <div className="flex justify-center items-center  h-full mx-auto max-w-3xl lg:max-w-4xl w-full">
      <div className="mx-auto w-full">
        <Title>{experienceSection?.title || "Experience"}</Title>
        {experienceSection?.subtitle && <Subtitle>{experienceSection.subtitle}</Subtitle>}
        <div className="mt-10">
          <Timeline>
            {experiences.slice(0, showAll ? undefined : ITEMS_THRESHOLD).map((job) => (
              <div key={job._id} className={"space-y-2"}>
                <div className="mb-2 space-y-1">
                  <p className={"flex items-center gap-x-2 flex-wrap"}>
                    {job.companyUrl ? (
                      <a
                        className={"flex items-center font-medium gap-2 text-lg"}
                        href={job.companyUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        onMouseEnter={linkEnter}
                        onMouseLeave={onMouseLeave}>
                        <span>{job.company}</span>
                        <ExternalLink />
                      </a>
                    ) : (
                      <span className="font-medium text-lg">{job.company}</span>
                    )}
                    <span className="font-normal text-xs sm:text-sm rounded-full border-2 border-cyan-950 px-2.5">
                      {`${format(new Date(job.startDate), "MMM yyyy")} - ${job.endDate ? format(new Date(job.endDate), "MMM yyyy") : "Present"}`}
                    </span>
                    <span className="font-normal text-xs sm:text-sm rounded-full border-2 border-cyan-950 px-2.5">
                      {" "}
                      {job.workMode}
                    </span>
                  </p>
                  <p className="text-cyan-600 ">{job.role}</p>
                </div>
                <ul className="space-y-1.5">
                  {job.tasks.map((task, index) => (
                    <li key={index} className={"flex gap-2 text-sm sm:text-base"}>
                      <CheckmarkCircleIcon className="translate-y-1/4 shrink-0" />
                      <p>{task}</p>
                    </li>
                  ))}
                </ul>
                <ul className="flex gap-2 flex-wrap">
                  {job.technologies?.map((tag) => (
                    <span
                      key={tag._id}
                      className={"text-xs sm:text-sm text-white rounded-full bg-cyan-950 py-1 px-2.5"}>
                      {tag.name}
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
                  whileHover={
                    isMobile
                      ? undefined
                      : {
                          scale: 1.2,
                          transition: { duration: 0.2, type: "spring" as const }
                        }
                  }
                  onClick={() => setShowAll(!showAll)}
                  className={"text-gray-500 hover:text-gray-700 transition-colors"}>
                  <AddCircleIcon className="h-8 w-8 text-gray-500" />
                </m.button>
                <Divider />
              </div>
            )}
          </>
          {experienceSection?.cta?.file?.file?.asset?.url && (
            <m.a
              onMouseEnter={linkEnter}
              onMouseLeave={onMouseLeave}
              href={experienceSection.cta.file.file.asset.url}
              target="_blank"
              rel="noreferrer noopener"
              transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
              className={
                "underline underline-offset-2 mt-8 max-w-max text-center mx-auto text-sm flex justify-center items-center gap-2 px-3 py-1 z-0"
              }>
              <span className={"text-cyan-950"}>{experienceSection.cta.text}</span>
              <ExternalLink />
            </m.a>
          )}
        </div>
      </div>
    </div>
  )
}

const Divider = () => <div className={"h-0.5 w-full bg-gray-100 rounded-full"} />
