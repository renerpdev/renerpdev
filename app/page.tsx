"use client"

import { useFormStatus } from "react-dom"
import { sendEmail } from "@/app/lib/actions"
import { useEffect, useRef, useState } from "react"
import { useAnimate, useInView, motion } from "framer-motion"

export default function Home() {
  const [dataSent, setDataSent] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    const { name, message, email, topics } = Object.fromEntries(formData) as Record<string, string>

    await sendEmail({
      name,
      message,
      email,
      topics: topics.split(",")
    })

    setDataSent(true)
  }

  return (
    <>
      <section className="text-center md:text-left text-gray-600 body-font h-screen flex bg-gradient-to-r to-gray-900 from-slate-800 relative">
        <Navbar />
        <div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
          <div className="lg:w-2/3 w-full animate-fade-in-down">
            <h1 className="md:text-6xl text-4xl mb-2 font-bold text-white tracking-tight leading-tight">
              {"Hello, I’m "} <span className={"text-cyan-600"}>René Ricardo</span>
            </h1>
            <p className="mt-4 mb-6 md:leading-relaxed leading-normal text-white/80 tracking-tight text-xl md:text-2xl">
              I am a Frontend Developer based in Montevideo, Uruguay. If you need a developer who can bring your ideas
              to life, feel free to contact me.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              className={
                "font-semibold max-w-sm mx-auto md:ml-0 text-lg flex md:inline-flex justify-center items-center bg-white px-6 py-2 rounded-xl border-none"
              }>
              <span className={"mr-2 bg-gradient-to-r from-cyan-950 to-cyan-700 bg-clip-text text-transparent"}>
                {"Let's connect"}
              </span>
              <RocketIcon className="text-cyan-900" />
            </motion.a>
            <div className={"flex justify-center md:justify-start space-x-2 items-center mt-6"}>
              <a
                href="https://github.com/renerpdev"
                target="_blank"
                rel="noreferrer noopener"
                className={"inline-flex"}>
                <svg
                  className="w-6 h-6 text-white hover:text-cyan-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/renerpdev"
                target="_blank"
                rel="noreferrer noopener"
                className={"inline-flex"}>
                <svg
                  className="w-8 h-8 text-white hover:text-cyan-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                    clipRule="evenodd"
                  />
                  <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <a href="#skills" className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-pulse">
          <svg
            className="w-14 h-14 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m8 10 4 4 4-4"
            />
          </svg>
        </a>
      </section>
      <section id="skills" className="text-[#333] pt-24 pb-16 px-5 bg-white h-auto lg:h-screen">
        <SkillSet />
      </section>
      <section id="contact" className="text-[#333] pt-16 pb-24 px-5 bg-white h-auto lg:h-screen ">
        <div className="flex justify-center items-center  h-full mx-auto max-w-2xl ">
          <div className="mx-auto w-full">
            {!dataSent ? (
              <>
                <h2 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-950 to-cyan-600 bg-clip-text text-transparent">
                  How can I help?
                </h2>
                <Form action={handleSubmit} />
              </>
            ) : (
              <p className={"text-lg text-center flex items-center justify-center gap-2 flex-wrap"}>
                Thank you for your interest. I will get back to you shortly. <RocketIcon className={"w-8 h-8"} />
              </p>
            )}
          </div>
        </div>
      </section>
      <section className="p-5 w-full bg-gray-900 text-white text-center text-sm">
        <span>
          Made with{" "}
          <span className={"relative mx-0.5"}>
            <span className={"animate-pulse"}>❤️</span>
          </span>{" "}
          by{" "}
        </span>
        <a href="https://github.com/renerpdev" target="_blank" rel="noreferrer noopener" className={"underline"}>
          René Ricardo
        </a>{" "}
        © {new Date().getFullYear()}
      </section>
    </>
  )
}

const Form = ({ action }: { action: (data: FormData) => Promise<void> }) => {
  return (
    <form className="mt-8 space-y-4" action={action}>
      <input
        type="text"
        required
        placeholder="Name"
        name="name"
        className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-blue-500"
      />
      <input
        type="email"
        required
        placeholder="Email"
        name="email"
        className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-blue-500"
      />
      <textarea
        placeholder="Message"
        rows={6}
        name="message"
        defaultValue={"I would like to know more about your services."}
        className="w-full min-h-32 rounded-md px-4 bg-gray-100 text-sm pt-3 outline-blue-500"
        required
      />
      <div className={"flex flex-col gap-4 pb-2"}>
        <div className="flex items-center">
          <input
            id="default-checkbox1"
            type="radio"
            name="topics"
            defaultChecked
            value="Web Development"
            className="w-4 h-4 text-cyan-600 bg-cyan-100 border-cyan-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="default-checkbox1" className="ms-2 text-sm font-medium text-gray-900 ">
            Web Development
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="checked-checkbox2"
            type="radio"
            name="topics"
            value="Web Design"
            className="w-4 h-4 text-cyan-600 bg-cyan-100 border-cyan-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="checked-checkbox2" className="ms-2 text-sm font-medium text-gray-900">
            Web Design
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="checked-checkbox3"
            type="radio"
            name="topics"
            value="Mobile Development"
            className="w-4 h-4 text-cyan-600 bg-cyan-100 border-cyan-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="checked-checkbox3" className="ms-2 text-sm font-medium text-gray-900">
            Mobile Development
          </label>
        </div>
      </div>
      <Submit />
    </form>
  )
}

const Submit = () => {
  const { pending } = useFormStatus()
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      type="submit"
      className="text-white bg-cyan-600 hover:bg-cyan-500 font-semibold rounded-md text-sm px-10 py-3 block w-full lg:w-auto lg:max-w-xs mx-auto disabled:pointer-events-none disabled:opacity-50"
      disabled={pending}>
      {pending ? "Sending..." : "Send message"}
    </motion.button>
  )
}

const RocketIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={`w-6 h-6 ${className}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M20.337 3.664c.213.212.354.486.404.782.294 1.711.657 5.195-.906 6.76-1.77 1.768-8.485 5.517-10.611 6.683a.987.987 0 0 1-1.176-.173l-.882-.88-.877-.884a.988.988 0 0 1-.173-1.177c1.165-2.126 4.913-8.841 6.682-10.611 1.562-1.563 5.046-1.198 6.757-.904.296.05.57.191.782.404ZM5.407 7.576l4-.341-2.69 4.48-2.857-.334a.996.996 0 0 1-.565-1.694l2.112-2.111Zm11.357 7.02-.34 4-2.111 2.113a.996.996 0 0 1-1.69-.565l-.422-2.807 4.563-2.74Zm.84-6.21a1.99 1.99 0 1 1-3.98 0 1.99 1.99 0 0 1 3.98 0Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full px-5 md:px-10 py-6 text-white flex justify-end items-center gap-8">
      <a href="#skills" className={"font-semibold border-b-2 border-transparent hover:text-cyan-600 transition-colors"}>
        Skills
      </a>
      <a
        href="#contact"
        className={"font-semibold border-b-2 border-transparent hover:text-cyan-600 transition-colors"}>
        Contact
      </a>
    </nav>
  )
}

const SkillSet = () => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { margin: "80px" })
  const ref = useRef(null)

  useEffect(() => {
    const selectors = ["animate-width-to-100", "animate-width-to-99", "animate-width-to-85", "animate-width-to-75"]

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
    <div className="flex justify-center items-center  h-full mx-auto max-w-2xl">
      <div className="mx-auto w-full" ref={scope}>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-cyan-950 to-cyan-600 bg-clip-text text-transparent">
          What I am good at?
        </h2>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite font-semibold ">Web Development</span>
              <span className="text-base font-semibold text-gray-lite pr-5 ">99%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 ">
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-99" />
            </div>
          </div>
          <div className="flex flex-col w-full" ref={ref}>
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite font-semibold ">Web Design</span>
              <span className="text-base font-semibold text-gray-lite pr-5 ">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 " ref={ref}>
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-85" />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite font-semibold ">Mobile Development</span>
              <span className="text-base font-semibold text-gray-lite pr-5 ">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 ">
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-75" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full mt-12">
          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite font-semibold ">Critical Thinking</span>
              <span className="text-base font-semibold text-gray-lite pr-5 ">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 ">
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-100" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite font-semibold ">Problem Solving</span>
              <span className="text-base font-semibold text-gray-lite pr-5 ">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 ">
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-100" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite font-semibold ">Team Work</span>
              <span className="text-base font-semibold text-gray-lite pr-5 ">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 ">
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-100" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite font-semibold ">Attention to Detail</span>
              <span className="text-base font-semibold text-gray-lite pr-5 ">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 ">
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-100" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite font-semibold ">Time Management</span>
              <span className="text-base font-semibold text-gray-lite pr-5 ">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 ">
              <div className="bg-gradient-to-r to-cyan-400 from-cyan-500 h-full rounded-full w-0 animate-width-to-100" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between py-1">
              <span className="text-base text-gray-lite font-semibold ">Responsibility</span>
              <span className="text-base font-semibold text-gray-lite pr-5 ">100%</span>
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
