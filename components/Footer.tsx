import React from "react"
import { type CursorAnimationHandler } from "@/hooks"
import { ArrowUpIcon } from "@sanity/icons"
import { BehanceIcon, DribbleIcon, GithubIcon, LinkedinIcon, LogoIcon, NpmIcon } from "@/components/icons"
import { Magnet } from "@/components/Magnet"

export const Footer = ({ setCursorText, setCursorVariant }: CursorAnimationHandler) => {
  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function linkEnter() {
    setCursorText("👀")
    setCursorVariant("link")
  }

  function buttonUpEnter() {
    setCursorText("")
    setCursorVariant("action")
  }

  const socialLinks = [
    {
      name: "Linkedin",
      href: "https://www.linkedin.com/in/renerpdev",
      icon: () => <LinkedinIcon className={"w-8 h-8"} />
    },
    {
      name: "Github",
      href: "https://github.com/renerpdev",
      icon: () => <GithubIcon className={"w-7 h-7"} />
    },
    {
      name: "NPM",
      href: "https://npmjs.com/~2rhop",
      icon: () => <NpmIcon className={"w-10 h-10 translate-y-1 translate-x-1"} />
    },
    {
      name: "Dribbble",
      href: "https://dribbble.com/renerpdev",
      icon: () => <DribbleIcon className={"w-10 h-10 translate-y-1"} />
    },
    {
      name: "Behance",
      href: "https://www.behance.net/renricardo",
      icon: () => <BehanceIcon className={"w-7 h-7 -translate-x-1"} />
    }
  ]

  return (
    <footer
      className="px-5 py-16 w-full bg-gray-900 text-white text-center text-sm space-y-8 relative"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #1d2839 40%, transparent 90%), url(/assets/circuit-board.svg) repeat center/25% #1d2839"
      }}>
      <LogoIcon className={"w-10 h-10 text-cyan-600 mx-auto"} />

      <p className={"text-xl lg:text-2xl font-light tracking-wider"}>Always looking for improvements</p>

      <div className={"flex justify-center flex-wrap space-x-4 items-center"}>
        {socialLinks.map((link) => (
          <a
            onMouseEnter={linkEnter}
            onMouseLeave={onMouseLeave}
            href={link.href}
            key={link.name}
            target="_blank"
            rel="noreferrer noopener"
            className={"inline-flex text-white hover:text-cyan-600"}>
            {link.icon()}
          </a>
        ))}
      </div>

      <p className={"text-sm lg:text-lg tracking-widest font-light"}>
        <span>Handcrafted by </span>
        <a
          onMouseEnter={linkEnter}
          onMouseLeave={onMouseLeave}
          href="https://github.com/renerpdev/renerpdev"
          target="_blank"
          rel="noreferrer noopener"
          className={"font-bold"}>
          me
        </a>{" "}
        © {new Date().getFullYear()}
      </p>
      <div className={"tracking-wider text-xs space-y-0.5"}>
        <p className={"font-light"}>
          Made with{" "}
          <a
            onMouseEnter={linkEnter}
            onMouseLeave={onMouseLeave}
            href="https://tailwindcss.com"
            target="_blank"
            rel="noreferrer noopener"
            className={"font-medium"}>
            Tailwind
          </a>{" "}
          and{" "}
          <a
            onMouseEnter={linkEnter}
            onMouseLeave={onMouseLeave}
            href="https://nextjs.org/"
            target="_blank"
            rel="noreferrer noopener"
            className={"font-medium"}>
            Next.js
          </a>
        </p>
        <p className={"font-light"}>
          Animations powered by{" "}
          <a
            onMouseEnter={linkEnter}
            onMouseLeave={onMouseLeave}
            href="https://www.framer.com/motion/"
            target="_blank"
            rel="noreferrer noopener"
            className={"font-medium"}>
            Framer Motion
          </a>
        </p>
        <p className={"font-light"}>
          Deployed on{" "}
          <a
            onMouseEnter={linkEnter}
            onMouseLeave={onMouseLeave}
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer noopener"
            className={"font-medium"}>
            Vercel
          </a>
        </p>{" "}
      </div>

      <div
        className={"absolute top-2 md:top-4 right-4 md:right-8 z-10 cursor-none"}
        onMouseEnter={buttonUpEnter}
        onMouseLeave={onMouseLeave}>
        <Magnet>
          <a href="#" className={"w-16 h-16 rounded-full flex items-center justify-center "}>
            <ArrowUpIcon className={"w-10 h-10 text-white"} />
          </a>
        </Magnet>
      </div>
    </footer>
  )
}
