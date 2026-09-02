"use client"

import { domAnimation, LazyMotion, m } from "framer-motion"
import { CallToAction, Footer, Navbar, ParallaxText } from "@/components"
import { useCursorAnimation } from "@/hooks"
import { useRef } from "react"
import type {
  Navbar as NavbarType,
  Hero as HeroType,
  About as AboutType,
  MarqueeSection as MarqueeSectionType,
  CallToActionSection as CallToActionSectionType,
  ContactSection as ContactSectionType,
  Footer as FooterType,
  ExperienceSection as ExperienceSectionType,
  ProjectsSection as ProjectsSectionType,
  SkillsSection as SkillsSectionType,
  TestimonialSection as TestimonialSectionType
} from "@/sanity/models"

import { About, Contact, Experience as ExperienceSection, Hero, Projects, SkillSet, Testimonials } from "../_sections"
import ReactLenis from "lenis/react"

interface HomeClientProps {
  navbar: NavbarType | null
  hero: HeroType | null
  about: AboutType | null
  marqueeSection: MarqueeSectionType | null
  callToActionSection: CallToActionSectionType | null
  contactSection: ContactSectionType | null
  footer: FooterType | null
  experienceSection: ExperienceSectionType | null
  projectsSection: ProjectsSectionType | null
  skillsSection: SkillsSectionType | null
  testimonialSection: TestimonialSectionType | null
}

export default function HomeClient({
  navbar,
  hero,
  about,
  marqueeSection,
  callToActionSection,
  contactSection,
  footer,
  experienceSection,
  projectsSection,
  skillsSection,
  testimonialSection
}: HomeClientProps) {
  const reference = useRef<HTMLElement>(null)
  const { cursorText, setCursorText, cursorVariant, setCursorVariant, variants, spring } = useCursorAnimation(reference)

  return (
    <>
      <ReactLenis
        root
        options={{
          duration: 2
        }}
      />
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
            <Navbar {...{ setCursorText, setCursorVariant, navbar }} />
            <Hero {...{ setCursorText, setCursorVariant, hero }} />
          </section>

          <section id="about" className={" -mt-10 z-10 relative px-5"}>
            <About {...{ setCursorText, setCursorVariant, about }} />
          </section>

          <Section id="experience">
            <ExperienceSection {...{ setCursorText, setCursorVariant, experienceSection }} />
          </Section>

          {marqueeSection && (
            <section className="-my-10 md:-my-8 py-12 md:py-16 overflow-hidden w-full">
              <div className=" w-[110%] -translate-x-[15px]">
                <ParallaxText
                  className="-rotate-[10deg] md:-rotate-[6deg] translate-y-1/2  bg-[#1D2834] blur-[2px] md:blur-[3px]"
                  baseVelocity={-5}>
                  {marqueeSection.bottomText}
                </ParallaxText>
                <ParallaxText
                  className="rotate-[10deg]  md:rotate-[6deg] -translate-y-1/2  bg-[#1D2839]"
                  baseVelocity={5}>
                  {marqueeSection.topText}
                </ParallaxText>
              </div>
            </section>
          )}

          <Section id="projects">
            <Projects {...{ setCursorText, setCursorVariant, projectsSection }} />
          </Section>

          <section>
            <CallToAction {...{ setCursorText, setCursorVariant, callToActionSection }} />
          </section>

          <Section id="skills">
            <SkillSet skillsSection={skillsSection} />
          </Section>

          <Section
            id="testimonials"
            className="bg-[_#1d2838] text-white"
            style={{
              background: `radial-gradient(circle at 50% 50%, #1d2839 40%, transparent 90%), url(${testimonialSection?.bgImage?.image?.asset.url}) repeat center/25% #1d2839`
            }}>
            <Testimonials {...{ setCursorText, setCursorVariant, testimonialSection }} />
          </Section>

          <Section id="contact">
            <Contact {...{ setCursorText, setCursorVariant, contactSection }} />
          </Section>

          <Footer {...{ setCursorText, setCursorVariant, footer }} />
        </main>
      </LazyMotion>
    </>
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
