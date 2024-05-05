import Title from "@/components/title"
import { GithubIcon } from "@/components/icons/github"
import Image from "next/image"
import { CursorAnimationHandler } from "@/utils/use-cursor-animation"
import { useAnimate, useInView } from "framer-motion"
import React, { useEffect, useMemo } from "react"
import { NpmIcon } from "@/components/icons/npm"
import { ExternalLink } from "@/components/external-link"
import Subtitle from "@/components/subtitle"

const works = [
  {
    title: "Garage Booking",
    description: "Web application for helping my neighbors book their parking spaces from the building garage.",
    githubRepo: "https://github.com/renerpdev/garage-booking",
    link: "https://garage-booking.renerp.dev/",
    year: 2024,
    tags: ["React", "Next.js", "Vercel", "Typescript", "TailwindCSS", "Prisma"]
  },
  {
    title: "Tussis",
    description:
      "Web application for managing patients' asthma condition. It helps patients to keep track of their progress by providing them fancy charts that display the data.",
    githubRepo: "https://github.com/renerpdev/tussis",
    link: "https://tussis-app.web.app/",
    year: 2023,
    tags: ["React", "Nestjs", "Firebase", "Typescript", "TailwindCSS"]
  },
  {
    title: "Painted Checkers",
    description:
      "Checkers game built using native web technologies. The game is based on the classic checkers game and it lets the user to play against the computer or against another player.",
    githubRepo: "https://github.com/renerpdev/checkers",
    link: "https://renerpdev.github.io/checkers/",
    year: 2020,
    tags: ["Javascript", "HTML", "CSS"]
  },
  {
    title: "Password Dealer",
    description:
      "Basic input password reveal built with javascript, HTML and CSS. It allows the users to hide and reveal their passwords with the ease of just clicking a button.",
    githubRepo: "https://github.com/renerpdev/password-dealer",
    npmRepo: "https://www.npmjs.com/package/password-dealer",
    year: 2019,
    tags: ["Javascript", "jQuery", "HTML", "CSS"]
  },
  {
    title: "Vollk",
    description:
      "Command line tool built using Knex.js for seeding massive amount of fake data into multiple databases.",
    githubRepo: "https://github.com/renerpdev/vollk",
    npmRepo: "https://www.npmjs.com/package/vollk",
    year: 2018,
    tags: ["Javascript", "Knex", "Inquirer", "Commander", "Faker"]
  },
  {
    title: "CSS Drag & Drop",
    description:
      "jQuery plugin for adding drag and drop functionality to your HTML elements. It has built-in styles but can be easily customized.",
    githubRepo: "https://github.com/renerpdev/css-dnd",
    npmRepo: "https://www.npmjs.com/package/css-dnd",
    year: 2019,
    tags: ["Javascript", "jquery", "drag & drop", "CSS"]
  },
  {
    title: "COVID-19 Stats",
    description:
      "Web application, built in Ionic, that displays the latest COVID-19 stats in the world. It uses the 'Rapidapi.com' API to fetch the data and displays it in a clean and easy-to-read format.",
    githubRepo: "https://github.com/renerpdev/covid19-stats",
    link: "https://cov19-stats.firebaseapp.com/",
    year: 2020,
    tags: ["Ionic", "Typescript", "React.js", "CSS", "Firebase"]
  }
]

const Projects = ({ setCursorText, setCursorVariant }: CursorAnimationHandler) => {
  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  const sortedProjects = useMemo(() => works.sort((a, b) => b.year - a.year), [])

  function linkEnter() {
    setCursorText("👀")
    setCursorVariant("link")
  }

  return (
    <div className="flex justify-center items-center h-full mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 xl:gap-16">
        <div>
          <div className="sticky top-20">
            <Title className="text-center lg:text-left xl:text-6xl">Recent Projects</Title>
            <Subtitle className={"text-center md:text-left"}>{"Here are some of the projects I've worked on"}</Subtitle>
          </div>
        </div>
        <div className={"space-y-8 sticky top-0 pb-14 grid grid-cols-1 grid-flow-row "}>
          {sortedProjects.map((work, index) => (
            <Project
              key={work.title}
              index={index}
              {...work}
              setCursorText={setCursorText}
              setCursorVariant={setCursorVariant}
            />
          ))}
          <div className={"h-72"} />
          <a
            onMouseEnter={linkEnter}
            onMouseLeave={onMouseLeave}
            href="https://github.com/renerpdev?tab=repositories"
            target={"_blank"}
            rel={"noreferrer noopenner"}
            className={
              "translate-y-16 underline underline-offset-2 max-w-max text-center mx-auto text-sm flex justify-center px-3 py-1 gap-2 relative z-0"
            }>
            <span className={"text-cyan-950"}>{"See all projects"}</span>
            <ExternalLink />
          </a>
        </div>
      </div>
    </div>
  )
}

interface ProjectProps extends CursorAnimationHandler {
  index: number
  title: string
  description: string
  year: number
  tags: string[]
  githubRepo?: string
  link?: string
  npmRepo?: string
  image?: string
}

const Project = ({
  title,
  description,
  githubRepo,
  npmRepo,
  link,
  year,
  tags,
  setCursorText,
  setCursorVariant,
  index
}: ProjectProps) => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { margin: "40px" })

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1, scale: 1 }, { ease: "anticipate", duration: 0.8, delay: 0 })
    }
  }, [animate, index, isInView, scope])

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
      key={title}
      className={
        "rounded-md shadow-md p-6 ring-1 ring-gray-200 min-h-72 sticky flex flex-col w-full opacity-0 bg-gray-50"
      }
      style={{ top: `${(index + 1) * 45}px` }}>
      <div className={"mb-auto flex items-center justify-between"}>
        <h4 className={"text-xl lg:text-2xl font-light tracking-wide uppercase text-cyan-600"}>
          {link ? (
            <a
              onMouseEnter={linkEnter}
              onMouseLeave={onMouseLeave}
              href={link}
              target={"_blank"}
              rel={"noreferrer noopener"}>
              {title}
            </a>
          ) : (
            title
          )}
        </h4>
        <div className={"flex items-center gap-2"}>
          {link && (
            <a
              onMouseEnter={linkEnter}
              onMouseLeave={onMouseLeave}
              href={link}
              target={"_blank"}
              rel={"noreferrer noopener"}
              className={"translate-y-[5px]"}>
              <Image
                src={"/assets/arrow-diagonal-up.svg"}
                alt={title}
                title="See live project"
                width={24}
                height={24}
                className={"invert"}
              />
            </a>
          )}
          {npmRepo && (
            <a
              onMouseEnter={linkEnter}
              onMouseLeave={onMouseLeave}
              href={npmRepo}
              target={"_blank"}
              title="See on NPM"
              rel={"noreferrer noopener"}>
              <NpmIcon className={"w-6 h-6 inline-block -translate-x-0.5"} />
            </a>
          )}
          {githubRepo && (
            <a
              onMouseEnter={linkEnter}
              onMouseLeave={onMouseLeave}
              href={githubRepo}
              target={"_blank"}
              title="See source code"
              rel={"noreferrer noopener"}>
              <GithubIcon className={"w-6 h-6 inline-block"} />
            </a>
          )}
        </div>
      </div>
      <p className={"my-auto py-2"}>{description}</p>
      <div className={"mt-auto space-y-4"}>
        <p className={"text-lg"}>{year}</p>
        <ul className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span key={tag} className={"text-xs text-white rounded-full bg-cyan-800 py-1 px-2.5"}>
              {tag}
            </span>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Projects
