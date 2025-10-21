"use client"

import Image from "next/image"
import { CursorAnimationHandler } from "@/hooks"
import { useAnimate, useInView } from "framer-motion"
import React, { useEffect } from "react"
import { ExternalLink, GithubIcon, NpmIcon, Subtitle, Title } from "@/components"
import type { Project as ProjectType, ProjectsSection as ProjectsSectionType } from "@/sanity/models"

interface ProjectsProps extends CursorAnimationHandler {
  projectsSection: ProjectsSectionType | null
}

export const Projects = ({ setCursorText, setCursorVariant, projectsSection }: ProjectsProps) => {
  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function linkEnter() {
    setCursorText("👀")
    setCursorVariant("link")
  }

  const projects = projectsSection?.projects || []
  const sortedProjects = [...projects].sort((a, b) => b.year - a.year)

  if (!projectsSection) {
    return null
  }

  return (
    <div className="flex justify-center items-center h-full mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 xl:gap-16">
        <div>
          <div className="sticky top-20">
            <Title className="text-center lg:text-left xl:text-6xl">{projectsSection.title}</Title>
            {projectsSection.subtitle && (
              <Subtitle className={"text-center md:text-left"}>{projectsSection.subtitle}</Subtitle>
            )}
          </div>
        </div>
        <div className={"space-y-8 sticky top-0 pb-14 grid grid-cols-1 grid-flow-row "}>
          {sortedProjects.length > 0 ? (
            <>
              {sortedProjects.map((project, index) => (
                <Project
                  key={project._id}
                  index={index}
                  project={project}
                  setCursorText={setCursorText}
                  setCursorVariant={setCursorVariant}
                />
              ))}
              <div className={"h-72"} />
              {projectsSection.cta && (
                <a
                  onMouseEnter={linkEnter}
                  onMouseLeave={onMouseLeave}
                  href={projectsSection.cta.link}
                  target={"_blank"}
                  rel={"noreferrer noopenner"}
                  className={
                    "translate-y-16 underline underline-offset-2 max-w-max text-center mx-auto text-sm flex justify-center px-3 py-1 gap-2 relative z-0"
                  }>
                  <span className={"text-cyan-950"}>{projectsSection.cta.text}</span>
                  <ExternalLink />
                </a>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500">No projects to display.</p>
          )}
        </div>
      </div>
    </div>
  )
}

interface ProjectProperties extends CursorAnimationHandler {
  index: number
  project: ProjectType
}

const Project = ({ project, setCursorText, setCursorVariant, index }: ProjectProperties) => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { margin: "40px" })

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1, scale: 1 }, { ease: "anticipate", duration: 0.8, delay: 0 })
    }
  }, [animate, isInView, scope])

  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function linkEnter() {
    setCursorText("👀")
    setCursorVariant("link")
  }

  return (
    <div
      ref={scope}
      key={project.title}
      className={
        "rounded-md shadow-md p-6 ring-1 ring-gray-200 min-h-72 sticky flex flex-col w-full opacity-0 bg-gray-50"
      }
      style={{ top: `${(index + 1) * 45}px` }}>
      <div className={"mb-auto flex items-center justify-between"}>
        <h4 className={"text-xl lg:text-2xl font-light tracking-wide uppercase text-cyan-600"}>
          {project.liveLink ? (
            <a
              onMouseEnter={linkEnter}
              onMouseLeave={onMouseLeave}
              href={project.liveLink}
              target={"_blank"}
              rel={"noreferrer noopener"}>
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h4>
        <div className={"flex items-center gap-2"}>
          {project.liveLink && (
            <a
              onMouseEnter={linkEnter}
              onMouseLeave={onMouseLeave}
              href={project.liveLink}
              target={"_blank"}
              rel={"noreferrer noopener"}
              className={"translate-y-[5px]"}>
              <Image
                src={"/assets/arrow-diagonal-up.svg"}
                alt={project.title}
                title="See live project"
                width={24}
                height={24}
                className={"invert"}
              />
            </a>
          )}
          {project.npmRepo && (
            <a
              onMouseEnter={linkEnter}
              onMouseLeave={onMouseLeave}
              href={project.npmRepo}
              target={"_blank"}
              title="See on NPM"
              rel={"noreferrer noopener"}>
              <NpmIcon className={"w-6 h-6 inline-block -translate-x-0.5"} />
            </a>
          )}
          {project.githubRepo && (
            <a
              onMouseEnter={linkEnter}
              onMouseLeave={onMouseLeave}
              href={project.githubRepo}
              target={"_blank"}
              title="See source code"
              rel={"noreferrer noopener"}>
              <GithubIcon className={"w-6 h-6 inline-block"} />
            </a>
          )}
        </div>
      </div>
      <p className={"my-auto py-2"}>{project.description}</p>
      <div className={"mt-auto space-y-4"}>
        <p className={"text-lg"}>{project.year}</p>
        {project.technologies && project.technologies.length > 0 && (
          <ul className="flex gap-2 flex-wrap">
            {project.technologies.map((tag) => (
              <span key={tag._id} className={"text-xs text-white rounded-full bg-cyan-800 py-1 px-2.5"}>
                {tag.name}
              </span>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
