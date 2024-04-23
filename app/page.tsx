"use client"

import { LazyMotion, domAnimation } from "framer-motion"
import ParallaxText from "@/components/parallax-text"
import Footer from "@/components/footer"
import Contact from "@/components/contact"
import Navbar from "@/components/navbar/navbar"
import SkillSet from "@/components/skillset"
import Hero from "@/components/hero"
import TechStack from "@/components/tech-stack"
import CallToAction from "@/components/call-to-action"
import Experience from "@/components/experience"

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-screen">
        <Navbar />
        <Hero />
      </section>
      <Section id="skills">
        <SkillSet />
      </Section>
      <section className="py-16 bg-white flex flex-col justify-center">
        <ParallaxText baseVelocity={-5}>Web • Mobile • Web • Mobile</ParallaxText>
        <ParallaxText baseVelocity={5}>Design • Development • Design • Development</ParallaxText>
      </section>
      <Section id="skills">
        <TechStack />
      </Section>
      <CallToAction />
      <Section id="experience">
        <Experience />
      </Section>
      <Section id="contact">
        <Contact />
      </Section>
      <Footer />
    </LazyMotion>
  )
}

const Section = ({ children, className, ...props }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section
    className={`text-[#333] py-16 md:py-20 lg:py-24 px-5 bg-white h-auto lg:min-h-screen flex flex-col justify-center ${className}`}
    {...props}>
    {children}
  </section>
)
