"use client"

import { LazyMotion, domAnimation } from "framer-motion"
import ParallaxText from "@/components/parallax-text"
import Footer from "@/components/footer"
import Contact from "@/components/contact"
import Navbar from "@/components/navbar"
import SkillSet from "@/components/skillset"
import Hero from "@/components/hero"

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-screen">
        <Navbar />
        <Hero />
      </section>
      <section
        id="skills"
        className="text-[#333] pt-24 pb-16 px-5 bg-white h-auto lg:min-h-screen flex flex-col justify-center">
        <SkillSet />
      </section>
      <section className="py-16 bg-white flex flex-col justify-center">
        <ParallaxText baseVelocity={-5}>Web • Mobile • Web • Mobile</ParallaxText>
        <ParallaxText baseVelocity={5}>Design • Development • Design • Development</ParallaxText>
      </section>
      <section
        id="contact"
        className="text-[#333] pt-16 pb-24 px-5 bg-white h-auto lg:min-h-screen flex flex-col justify-center">
        <Contact />
      </section>
      <Footer />
    </LazyMotion>
  )
}
