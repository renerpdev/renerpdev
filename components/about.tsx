import { CheckmarkIcon } from "@sanity/icons"
import React from "react"
import { CursorAnimationHandler } from "@/utils/use-cursor-animation"
import Title from "@/components/title"

const About = ({ setCursorText, setCursorVariant }: CursorAnimationHandler) => {
  const technologies = [
    "JavaScript (ES6+)",
    "TypeScript",
    "Webflow",
    "TailwindCSS",
    "React",
    "Nestjs",
    "Nextjs",
    "Framer-Motion",
    "Nodejs",
    "HTML5",
    "CSS3",
    "SASS",
    "Styled-Components",
    "Firebase",
    "Vercel",
    "Github"
  ]

  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function linkEnter() {
    setCursorText("👀")
    setCursorVariant("link")
  }

  return (
    <div className="h-full w-full px-6 py-8 sm:py-10 md:p-12 lg:p-16 rounded-xl max-w-3xl lg:max-w-4xl mx-auto shadow-md bg-white">
      <div className="mx-auto w-full">
        <Title>About Me</Title>
        <p className={"md:text-lg tracking-wide !leading-relaxed font-light"}>
          {
            "Hey there! Ever since I started my journey as a developer back in 2017, I've been doing remote work for some big companies and freelance clients. I've had the chance to work with many different technologies and build some really cool stuff, from landing pages to full-stack web applications. I absolutely love what I do and I'm always excited to learn new things."
          }
        </p>
        <p className={"md:text-lg tracking-wide !leading-relaxed font-light my-4"}>
          {"Here are some of the technologies I've been working with lately:"}
        </p>
        <ul className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4"}>
          {technologies.map((tech) => (
            <li className="text-left text-cyan-700 flex gap-1 items-center" key={tech}>
              <CheckmarkIcon />
              <span>{tech}</span>
            </li>
          ))}
        </ul>
      </div>
      <a
        onMouseEnter={linkEnter}
        onMouseLeave={onMouseLeave}
        href="#skills"
        className={
          "mt-8 underline underline-offset-2 max-w-max text-center mx-auto text-sm flex justify-center px-3 py-1"
        }>
        <span className={"text-cyan-950"}>{"Check Soft Skills"}</span>
      </a>
    </div>
  )
}

export default About
