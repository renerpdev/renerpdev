import { useAnimate, useInView } from "framer-motion"
import { useEffect } from "react"

const SkillSet = () => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { margin: "80px" })

  useEffect(() => {
    const selectors = ["animate-width-to-100"]

    const doAnimate = (selector: any, width: any) => {
      animate(
        `.${selector}`,
        { width: `${width}%` },
        { ease: "anticipate", duration: width === 0 ? 0 : 1.8, delay: width === 0 ? 0 : 0.05 }
      )
    }
    if (isInView) {
      selectors.forEach((selector) => doAnimate(selector, selector.split("-").pop()))
    } else {
      selectors.forEach((selector) => doAnimate(selector, 0))
    }
  }, [animate, isInView])

  return (
    <div className="flex justify-center items-center  h-full mx-auto max-w-2xl w-full">
      <div className="mx-auto w-full" ref={scope}>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-cyan-950 to-cyan-600 bg-clip-text text-transparent">
          Why you should hire me?
        </h2>

        <div className="flex flex-col gap-6 w-full mt-12">
          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite ">Critical Thinking</span>
              <span className="text-base text-gray-lite pr-5 ">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 ">
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-100" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite ">Problem Solving</span>
              <span className="text-base text-gray-lite pr-5 ">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 ">
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-100" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite ">Team Work</span>
              <span className="text-base text-gray-lite pr-5 ">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 ">
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-100" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite ">Attention to Detail</span>
              <span className="text-base text-gray-lite pr-5 ">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 ">
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-100" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite ">Time Management</span>
              <span className="text-base text-gray-lite pr-5 ">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 ">
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-100" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite ">Responsibility</span>
              <span className="text-base text-gray-lite pr-5 ">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 ">
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-100" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite ">Communication</span>
              <span className="text-base text-gray-lite pr-5 ">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 ">
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-100" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite ">Flexibility</span>
              <span className="text-base text-gray-lite pr-5 ">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 ">
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillSet
