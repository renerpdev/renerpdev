"use client"

import { domAnimation, LazyMotion, m } from "framer-motion"
import { CallToAction, Footer, Navbar, ParallaxText } from "@/components"
import { useCursorAnimation } from "@/hooks"
import { useRef } from "react"

import { About, Contact, Experience, Hero, Projects, SkillSet, Testimonials } from "./_sections"

export default function Home() {
  const reference = useRef(null)
  const { cursorText, setCursorText, cursorVariant, setCursorVariant, variants, spring } = useCursorAnimation(reference)

  return (
    <LazyMotion features={domAnimation}>
      <main ref={reference}>
        <m.div
          variants={variants}
          className="pointer-events-none fixed z-50 flex justify-center items-center bg-cyan-600 text-center text-sm rounded-full"
          animate={cursorVariant}
          transition={spring}>
          <span className="hidden lg:flex pointer-events-none m-auto">{cursorText}</span>
        </m.div>

        <section className="relative min-h-screen">
          <Navbar {...{ setCursorText, setCursorVariant }} />
          <Hero {...{ setCursorText, setCursorVariant }} />
        </section>

        <section id="about" className={" -mt-10 z-10 relative px-5"}>
          <About {...{ setCursorText, setCursorVariant }} />
        </section>

        <Section id="experience">
          <Experience {...{ setCursorText, setCursorVariant }} />
        </Section>

        <section className="-my-10 md:-my-8 py-12 md:py-16 overflow-hidden w-full">
          <div className=" w-[110%] -translate-x-[15px]">
            <ParallaxText
              className="-rotate-[10deg] md:-rotate-[6deg] translate-y-1/2  bg-[#1D2834] blur-[2px] md:blur-[3px]"
              baseVelocity={-5}>
              Web • Mobile • Web • Mobile
            </ParallaxText>
            <ParallaxText className="rotate-[10deg]  md:rotate-[6deg] -translate-y-1/2  bg-[#1D2839]" baseVelocity={5}>
              Design • Development • Design • Development
            </ParallaxText>
          </div>
        </section>

        <Section id="projects">
          <Projects {...{ setCursorText, setCursorVariant }} />
        </Section>

        <section>
          <CallToAction {...{ setCursorText, setCursorVariant }} />
        </section>

        <Section id="skills">
          <SkillSet />
        </Section>

        <Section
          id="testimonials"
          className="bg-[_#1d2838] text-white"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #1d2839 40%, transparent 100%), url(/assets/circuit-board.svg) repeat center/25% #1d2839"
          }}>
          <Testimonials {...{ setCursorText, setCursorVariant }} />
        </Section>

        <Section id="contact">
          <Contact {...{ setCursorText, setCursorVariant }} />
        </Section>

        <Footer {...{ setCursorText, setCursorVariant }} />
      </main>
    </LazyMotion>
  )
}

const Section = ({
  children,
  className,
  ...properties
}: {
  children: React.ReactNode
  className?: string
  id?: string
  style?: React.CSSProperties
}) => (
  <section className={`text-[#333] py-20 lg:py-24 xl:py-28 px-5 bg-white ${className}`} {...properties}>
    {children}
  </section>
)
