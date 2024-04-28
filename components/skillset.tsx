import { stagger, useAnimate, useInView } from "framer-motion"
import { useEffect } from "react"
import Magnet from "@/components/magnet"
import { m } from "framer-motion"

// const variants = {
//   start: {
//     opacity: [0, 1],
//     transition: {
//       y: { stiffness: 800, velocity: -100 }
//     }
//   }
// }

const staggerMenuItems = stagger(0.1, { startDelay: 0.1 })

const SkillSet = () => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { margin: "80px" })

  useEffect(() => {
    if (isInView) {
      animate(
        ".skill-pill",
        { opacity: 1, scale: 1, filter: "blur(0px)", rotateX: "25deg" },
        { ease: "anticipate", duration: 0.8, delay: isInView ? staggerMenuItems : 0 }
      )
    }
  }, [animate, isInView])

  return (
    <div className="flex justify-center items-center  h-full mx-auto max-w-2xl w-full">
      <div className="mx-auto w-full" ref={scope}>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-cyan-950 to-cyan-600 bg-clip-text text-transparent">
          My Skill Set
        </h2>
        <h3 className={"text-center mx-auto max-w-md text-lg md:text-xl font-normal"}>
          Why we should work together...
        </h3>

        <m.div
          className="flex items-center justify-center flex-wrap gap-6 w-full mt-12"
          transition={{ staggerChildren: 0.07, delayChildren: 0.2 }}>
          {[
            "Problem Solving",
            "Teamwork",
            "Critical Thinking",
            "Responsibility",
            "Adaptability",
            "Flexibility",
            "Attention to Detail",
            "Pragmatism",
            "Time Management",
            "Empathy",
            "Discipline",
            "Creativity",
            "Collaboration",
            "Communication"
          ].map((skill, index) => (
            <m.div key={index} animate="start">
              <Magnet>
                <m.span
                  className="text-base bg-white text-gray-lite skill-pill blur-md opacity-0 py-2 px-5 border-2 border-cyan-800 select-none rounded-full"
                  key={index}>
                  {skill}
                </m.span>
              </Magnet>
            </m.div>
          ))}
        </m.div>
      </div>
    </div>
  )
}

export default SkillSet
