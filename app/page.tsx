"use client"

import { LazyMotion, domAnimation, m } from "framer-motion"
import ParallaxText from "@/components/parallax-text"
import Footer from "@/components/footer"
import Contact from "@/components/contact"
import Navbar from "@/components/navbar/navbar"
import SkillSet from "@/components/skillset"
import Hero from "@/components/hero"
import Testimonials from "@/components/testimonials"
import CallToAction from "@/components/call-to-action"
import Experience from "@/components/experience"
import About from "@/components/about"
import Projects from "@/components/projects"
import { useCursorAnimation } from "@/utils/use-cursor-animation"
import { useRef } from "react"

export default function Home() {
  const ref = useRef(null)
  const { cursorText, setCursorText, cursorVariant, setCursorVariant, variants, spring } = useCursorAnimation(ref)

  return (
    <LazyMotion features={domAnimation}>
      <main ref={ref}>
        <m.div
          variants={variants}
          className="pointer-events-none fixed z-50 hidden lg:flex justify-center items-center bg-cyan-600 text-center text-sm rounded-full"
          animate={cursorVariant}
          transition={spring}>
          <span className="pointer-events-none m-auto">{cursorText}</span>
        </m.div>

        <section className="relative min-h-screen">
          <Navbar {...{ setCursorText, setCursorVariant }} />
          <Hero {...{ setCursorText, setCursorVariant }} />
        </section>

        <section id="about" className={" -mt-12 z-20 relative px-5"}>
          <About />
        </section>

        <section className="pt-24 md:pt-28 py-8 overflow-x-hidden w-screen">
          <ParallaxText className="md:rotate-2" baseVelocity={5}>
            Design • Development • Design • Development
          </ParallaxText>
        </section>

        <Section id="experience">
          <Experience />
        </Section>

        <section className="pt-16 md:pt-20 py-16 overflow-x-hidden w-screen">
          <ParallaxText className="md:-rotate-2" baseVelocity={-5}>
            Web • Mobile • Web • Mobile
          </ParallaxText>
        </section>

        <Section id="projects">
          <Projects />
        </Section>

        <CallToAction {...{ setCursorText, setCursorVariant }} />

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
  ...props
}: {
  children: React.ReactNode
  className?: string
  id?: string
  style?: React.CSSProperties
}) => (
  <section className={`text-[#333] py-16 md:py-20 lg:py-24 xl:py-28 px-5 bg-white ${className}`} {...props}>
    {children}
  </section>
)
