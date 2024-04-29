import Timeline from "@/components/timeline"
import { CheckmarkCircleIcon, AddCircleIcon } from "@sanity/icons"
import { CursorAnimationHandler } from "@/utils/use-cursor-animation"
import React, { useState } from "react"
import { m } from "framer-motion"
import Title from "@/components/title"
import { ExternalLink } from "@/components/external-link"

const jobs = [
  {
    name: "Lumenalta",
    role: "Senior Frontend Engineer",
    type: "Full-Time",
    mode: "Remote",
    duration: "Feb 2022 - Present",
    url: "https://lumenalta.com",
    tasks: [
      "Developed responsive and mobile-friendly UI components using React, employing best practices to ensure components work seamlessly on various screen sizes and device orientations.",
      "Implemented navigation patterns typical for mobile applications, such as tab bars, drawers, and stack navigations, using libraries like React Router or React Navigation tailored for Capacitor’s environment.",
      "Employed Context API for global state management in smaller applications, avoiding prop drilling.",
      "Integrated third-party services and APIs using NestJS HTTP module, facilitating data exchange and external communications.",
      "Worked closely with backend teams to design and implement optimal APIs for frontend consumption.",
      "Participated in Agile/Scrum meetings to stay aligned with team goals and timelines.",
      "Ensured cross-browser compatibility and mobile responsiveness of applications.",
      "Implemented unit tests to reduce bugs and enhance feature reliability."
    ],
    tags: ["React", "NestJS", "Capacitor", "Typescript", "Javascript", "Vitest"]
  },
  {
    name: "Altimetrik",
    role: "Ssr. React Developer",
    type: "Full-Time",
    mode: "Remote",
    duration: "May 2021 - Feb 2022",
    url: "https://www.altimetrik.com",
    tasks: [
      "Implemented complex user interfaces using JSX and React components, adhering to modern design principles and user experience standards.",
      "Utilized Conditional Rendering techniques to create dynamic components that adapt to different user interactions and data states.",
      "Leveraged advanced React Hooks like useMemo and useCallback to optimize performance by memoizing complex calculations and limiting re-renders.",
      "Participated in Agile/Scrum meetings to stay aligned with team goals and timelines.",
      "Ensured cross-browser compatibility and mobile responsiveness of applications.",
      "Implemented unit tests to reduce bugs and enhance feature reliability."
    ],
    tags: ["React", "Typescript", "Javascript", "Redux", "RTL"]
  },
  {
    name: "Ascentis (UKG Company)",
    role: "Software Engineer II",
    type: "Full-Time",
    mode: "Hybrid",
    duration: "Feb 2020 - May 2021",
    url: "https://www.ukg.com",
    tasks: [
      "Implemented client-side routing using React Router, managing navigation within the application, dynamic route parameters, and nested routes.",
      "Participated in Agile/Scrum meetings to stay aligned with team goals and timelines.",
      "Implemented complex user interfaces using JSX and React components, adhering to modern design principles and user experience standards.",
      "Collaborated with UX/UI designers to transform designs into functional web interfaces.",
      "Ensured cross-browser compatibility and mobile responsiveness of applications.",
      "Implemented unit tests to reduce bugs and enhance feature reliability."
    ],
    tags: ["React", "Typescript", "Javascript", "Redux", "Enzyme"]
  },
  {
    name: "Informage Studios S.L.U.",
    role: "Frontend Developer",
    type: "Freelance",
    mode: "Remote",
    duration: "Nov 2018 - Jan 2020",
    url: "https://www.informagestudios.com",
    tasks: [
      "Developed scalable and maintainable single-page applications with React.js.",
      "Implemented Redux for state management across multiple components.",
      "Created reusable React components to streamline development and ensure UI consistency.",
      "Designed and implemented dynamic and responsive web applications using Angular.",
      "Integrated APIs to fetch and post data dynamically to backend services.",
      "Handled code reviews and pull requests to ensure code quality and integrate feedback."
    ],
    tags: ["React", "Angular", "Javascript", "Typescript"]
  },
  {
    name: "Datys",
    type: "Full-Time",
    mode: "On-site",
    role: "Software Engineer",
    duration: "Sep 2017 - Oct 2019",
    url: "",
    tasks: [
      "Designed and implemented dynamic and responsive web applications using Angular.",
      "Applied RxJS observables for managing asynchronous data flows and state management.",
      "Integrated APIs to fetch and post data dynamically to backend services.",
      "Kept up-to-date with industry trends and technologies through continuous learning and professional development.",
      "Ensured cross-browser compatibility and mobile responsiveness of applications.",
      "Implemented unit tests to reduce bugs and enhance feature reliability."
    ],
    tags: ["Angular", "Javascript", "Typescript"]
  },
  {
    name: "Caminalta UG",
    type: "Freelance",
    mode: "Remote",
    role: "Frontend Developer",
    duration: "Jul 2017 - May 2018",
    url: "",
    tasks: [
      "Generated and developed applications using the JHipster platform to bridge frontend and backend development seamlessly.",
      "Managed source code versions and collaborated with other developers using Git.",
      "Utilized branching and merging strategies to maintain workflow efficiency.",
      "Designed and implemented dynamic and responsive web applications using Angular.",
      "Utilized Angular Material for crafting appealing and consistent UI components.",
      "Integrated APIs to fetch and post data dynamically to backend services."
    ],
    tags: ["Angular", "Javascript", "Typescript", "JHipster"]
  }
]

const ITEMS_THRESHOLD = 2

const Experience = ({ setCursorText, setCursorVariant }: CursorAnimationHandler) => {
  const [itemsToShow, setItemsToShow] = useState(ITEMS_THRESHOLD)

  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function linkEnter() {
    setCursorText("👀")
    setCursorVariant("link")
  }

  const increaseThreshold = () => {
    setItemsToShow(jobs.length)
  }

  return (
    <div className="flex justify-center items-center  h-full mx-auto max-w-3xl lg:max-w-4xl w-full">
      <div className="mx-auto w-full">
        <Title>Experience</Title>
        <h3 className={"text-center mx-auto max-w-md text-lg md:text-xl font-light"}>{"Where I've worked so far"}</h3>

        <div className="mt-10">
          <Timeline>
            {jobs
              .slice()
              .slice(0, itemsToShow)
              .map((job) => (
                <div key={job.name} className={"space-y-2"}>
                  <div className="mb-2 space-y-1">
                    <p className={"flex items-center gap-x-2 flex-wrap"}>
                      <a
                        className={"flex items-center font-medium gap-2 text-lg"}
                        href={job.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        onMouseEnter={linkEnter}
                        onMouseLeave={onMouseLeave}>
                        <span>{job.name}</span>
                        <ExternalLink />
                      </a>
                      <span className="font-normal text-xs sm:text-sm rounded-full border-2 border-cyan-950 px-2.5">
                        {job.duration}
                      </span>
                      <span className="font-normal text-xs sm:text-sm rounded-full border-2 border-cyan-950 px-2.5">
                        {" "}
                        {job.mode}
                      </span>
                    </p>
                    <p className="text-cyan-600 ">{job.role}</p>
                  </div>
                  <ul className="space-y-1.5">
                    {job.tasks.map((task) => (
                      <li key={task} className={"flex gap-2 text-sm sm:text-base"}>
                        <CheckmarkCircleIcon className="translate-y-1/4 shrink-0" />
                        <p>{task}</p>
                      </li>
                    ))}
                  </ul>
                  <ul className="flex gap-2 flex-wrap">
                    {job.tags.map((tag) => (
                      <span key={tag} className={"text-xs sm:text-sm text-white rounded-full bg-cyan-950 py-1 px-2.5"}>
                        {tag}
                      </span>
                    ))}
                  </ul>
                </div>
              ))}
          </Timeline>
          {jobs.length > itemsToShow && (
            <>
              <div
                className={
                  "h-28 -mt-28 bg-gradient-to-b from-transparent from-0% via-white/60 via-10% to-white to-80% w-full scale-x-110 relative z-10"
                }
              />
              <div className={"text-center flex items-center"}>
                <Divider />
                <m.button
                  title="Show More"
                  onClick={increaseThreshold}
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.2 },
                    type: "spring"
                  }}>
                  <AddCircleIcon className="h-8 w-8 text-gray-500" />
                </m.button>
                <Divider />
              </div>
            </>
          )}
          {jobs.length === itemsToShow && (
            <m.a
              onMouseEnter={linkEnter}
              onMouseLeave={onMouseLeave}
              href="/assets/Rene_Ricardo_resume.pdf"
              target="_blank"
              rel="noreferrer noopener"
              transition={{ type: "teen", stiffness: 400, damping: 10 }}
              className={
                "underline underline-offset-2 mt-4 max-w-max text-center mx-auto text-sm flex justify-center items-center gap-2 px-3 py-1 z-0"
              }>
              <span className={"text-cyan-950"}>{"See Full Resume"}</span>
              <ExternalLink />
            </m.a>
          )}
        </div>
      </div>
    </div>
  )
}

const Divider = () => <div className={"h-0.5 w-full bg-gray-100 rounded-full"} />

export default Experience
