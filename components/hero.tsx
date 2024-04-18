import React from "react"
import { m } from "framer-motion"
import { RocketIcon } from "@/components/icons/rocket"
import { GithubIcon } from "@/components/icons/github"
import { LinkedinIcon } from "@/components/icons/linkedin"
import { ChevronDownIcon } from "@/components/icons/chevron-down"

const Hero = () => {
  return (
    <div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
      <div className="lg:w-2/3 w-full animate-fade-in-down">
        <h1 className="md:text-6xl text-4xl mb-2 font-bold text-white tracking-tight leading-tight">
          {"Hello, I’m "} <span className={"text-cyan-600"}>René Ricardo</span>
        </h1>
        <p className="mt-4 mb-6 md:leading-snug leading-normal text-white/80 tracking-tight text-xl md:text-2xl">
          I am a Frontend Developer based in Montevideo, Uruguay. If you need a developer who can bring your ideas to
          life, feel free to contact me.
        </p>
        <div className={"inline-flex flex-col sm:flex-row gap-4 "}>
          <m.a
            href="#contact"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={
              "font-semibold max-w-sm mx-auto md:ml-0 text-lg flex md:inline-flex justify-center items-center bg-white px-8 py-3 rounded-3xl border-none"
            }>
            <span className={"mr-2 bg-gradient-to-r from-cyan-950 to-cyan-700 bg-clip-text text-transparent"}>
              {"Let's connect"}
            </span>
            <RocketIcon className="text-cyan-900" />
          </m.a>
          <m.a
            href="/renerp-cv.pdf"
            download
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={
              "font-semibold max-w-sm mx-auto md:ml-0 text-lg flex md:inline-flex justify-center items-center bg-cyan-600 px-8 py-3 rounded-3xl border-none"
            }>
            <span className={"mr-2 text-white"}>{"Download CV"}</span>
          </m.a>
        </div>
        <div className={"flex justify-center md:justify-start space-x-2 items-center mt-6"}>
          <a
            href="https://github.com/renerpdev"
            target="_blank"
            rel="noreferrer noopener"
            className={"inline-flex text-white hover:text-cyan-600"}>
            <GithubIcon className={"w-6 h-6"} />
          </a>
          <a
            href="https://www.linkedin.com/in/renerpdev"
            target="_blank"
            rel="noreferrer noopener"
            className={"inline-flex text-white hover:text-cyan-600"}>
            <LinkedinIcon className={"w-8 h-8"} />
          </a>
        </div>
      </div>
      <ChevronDownIcon className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce text-white h-12 w-12" />
    </div>
  )
}

export default Hero
