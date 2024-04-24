"use client"

import { LazyMotion, domAnimation } from "framer-motion"
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

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-screen">
        <Navbar />
        <Hero />
      </section>

      <section id="about" className={" -mt-12 z-20 relative px-5"}>
        <About />
      </section>

      <Section id="experience">
        <Experience />
      </Section>

      <section className="py-16 -rotate-2 overflow-x-hidden w-screen">
        <ParallaxText baseVelocity={-5}>Web • Mobile • Web • Mobile</ParallaxText>
      </section>

      <Section id="projects">
        <Projects />
      </Section>

      <CallToAction />

      <Section id="skills">
        <SkillSet />
      </Section>

      <Section id="testimonials">
        <Testimonials />
      </Section>

      <section className="py-16 rotate-2 overflow-x-hidden w-screen">
        <ParallaxText baseVelocity={5}>Design • Development • Design • Development</ParallaxText>
      </section>

      <Section id="contact">
        <Contact />
      </Section>

      <Footer />
    </LazyMotion>
  )
}

const Section = ({ children, className, ...props }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section className={`text-[#333] py-16 md:py-20 lg:py-24 xl:py-28 px-5 bg-white ${className}`} {...props}>
    {children}
  </section>
)
