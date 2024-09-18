import { m, stagger, useAnimate, useInView } from "framer-motion"
import React, { useEffect } from "react"
import { Magnet, Subtitle, Title } from "@/components"

import { SKILL_SET } from "./constants"

const staggerMenuItems = stagger(0.1, { startDelay: 0.1 })

export const SkillSet = () => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { margin: "80px" })

  useEffect(() => {
    if (isInView) {
      animate(
        ".skill-pill",
        { opacity: 1, scale: 1 },
        { ease: "anticipate", duration: 0.8, delay: isInView ? staggerMenuItems : 0 }
      )
    }
  }, [animate, isInView])

  return (
    <div className="flex justify-center items-center  h-full mx-auto max-w-2xl w-full">
      <div className="mx-auto w-full" ref={scope}>
        <Title>My Skill Set</Title>
        <Subtitle>Why we should work together...</Subtitle>
        <m.div
          className="flex items-center justify-center flex-wrap gap-4 w-full mt-12"
          transition={{ staggerChildren: 0.07, delayChildren: 0.2 }}>
          {SKILL_SET.map((skill, index) => (
            <m.ul key={index} animate="start">
              <Magnet>
                <m.li
                  className="text-base bg-white text-gray-lite skill-pill opacity-0 py-2 px-5 border-2 border-cyan-800 select-none rounded-full"
                  key={index}>
                  {skill}
                </m.li>
              </Magnet>
            </m.ul>
          ))}
        </m.div>
      </div>
    </div>
  )
}
