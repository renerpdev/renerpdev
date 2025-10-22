"use client"

import { m, stagger, useAnimate, useInView } from "framer-motion"
import React, { useEffect } from "react"
import { Magnet, Subtitle, Title } from "@/components"
import type { SkillsSection } from "@/sanity/models"

const staggerMenuItems = stagger(0.1, { startDelay: 0.1 })

interface SkillSetProps {
  skillsSection: SkillsSection | null
}

export const SkillSet = ({ skillsSection }: SkillSetProps) => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { margin: "80px" })

  const skills = skillsSection?.skills || []

  useEffect(() => {
    if (isInView && skills.length > 0) {
      animate(
        ".skill-pill",
        { opacity: 1, scale: 1 },
        { ease: "anticipate", duration: 0.8, delay: isInView ? staggerMenuItems : 0 }
      )
    }
  }, [animate, isInView, skills.length])

  if (!skillsSection) {
    return null
  }

  return (
    <div className="flex justify-center items-center  h-full mx-auto max-w-2xl w-full">
      <div className="mx-auto w-full" ref={scope}>
        <Title>{skillsSection.title}</Title>
        {skillsSection.subtitle && <Subtitle>{skillsSection.subtitle}</Subtitle>}
        <m.div
          className="flex items-center justify-center flex-wrap gap-4 w-full mt-12"
          transition={{ staggerChildren: 0.07, delayChildren: 0.2 }}>
          {skills.map((skill) => (
            <m.ul key={skill._id} animate="start">
              <Magnet>
                <m.li className="text-base bg-white text-gray-lite skill-pill opacity-0 py-2 px-5 border-2 border-cyan-800 select-none rounded-full">
                  {skill.name}
                </m.li>
              </Magnet>
            </m.ul>
          ))}
        </m.div>
      </div>
    </div>
  )
}
