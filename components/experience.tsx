import Timeline from "@/components/timeline"
import { CheckmarkCircleIcon, AddCircleIcon } from "@sanity/icons"
import { CursorAnimationHandler } from "@/utils/use-cursor-animation"
import React, { useMemo } from "react"
import { m } from "framer-motion"
import Title from "@/components/title"
import { ExternalLink } from "@/components/external-link"
import Subtitle from "@/components/subtitle"
import { format } from "date-fns"

const jobs = [
  {
    name: "Lumenalta",
    role: "Senior Frontend Engineer",
    type: "Full-Time",
    mode: "Remote",
    start: new Date(2022, 1, 7),
    end: null,
    url: "https://lumenalta.com",
    tasks: [
      "Developed responsive and mobile-friendly UI components using React, employing best practices to ensure components work seamlessly on various screen sizes and device orientations.",
      "Implemented navigation patterns typical for mobile applications, such as tab bars, drawers, and stack navigations, using libraries like React Router or React Navigation tailored for Capacitor’s environment.",
      "Worked closely with backend teams to design and implement optimal APIs for frontend consumption.",
      "Integrated third-party services and APIs using NestJS HTTP module, facilitating data exchange and external communications."
    ],
    tags: ["React", "NestJS", "Capacitor", "Typescript", "Javascript", "Vitest"]
  },
  {
    name: "Altimetrik",
    role: "Ssr. React Developer",
    type: "Full-Time",
    mode: "Remote",
    start: new Date(2021, 4, 1),
    end: new Date(2022, 1, 1),
    url: "https://www.altimetrik.com",
    tasks: [
      "Implemented complex user interfaces using JSX and React components, adhering to modern design principles and user experience standards.",
      "Utilized Conditional Rendering techniques to create dynamic components that adapt to different user interactions and data states.",
      "Leveraged advanced React Hooks like useMemo and useCallback to optimize performance by memoizing complex calculations and limiting re-renders."
    ],
    tags: ["React", "Typescript", "Javascript", "Redux", "RTL"]
  },
  {
    name: "Ascentis (UKG Company)",
    role: "Software Engineer II",
    type: "Full-Time",
    mode: "Hybrid",
    start: new Date(2020, 1, 1),
    end: new Date(2021, 4, 1),
    url: "https://www.ukg.com",
    tasks: [
      "Implemented client-side routing using React Router, managing navigation within the application, dynamic route parameters, and nested routes.",
      "Implemented complex user interfaces using JSX and React components, adhering to modern design principles and user experience standards.",
      "Collaborated with UX/UI designers to transform designs into functional web interfaces."
    ],
    tags: ["React", "Typescript", "Javascript", "Redux", "Enzyme"]
  },
  {
    name: "Informage Studios S.L.U.",
    role: "Frontend Developer",
    type: "Freelance",
    mode: "Remote",
    start: new Date(2018, 10, 1),
    end: new Date(2020, 0, 1),
    url: "https://www.informagestudios.com",
    tasks: [
      "Developed scalable and maintainable single-page applications with React.js.",
      "Implemented Redux for state management across multiple components.",
      "Designed and implemented dynamic and responsive web applications using Angular."
    ],
    tags: ["React", "Angular", "Javascript", "Typescript"]
  },
  {
    name: "Datys",
    type: "Full-Time",
    mode: "On-site",
    role: "Software Engineer",
    start: new Date(2017, 8, 1),
    end: new Date(2019, 9, 1),
    url: "",
    tasks: [
      "Designed and implemented dynamic and responsive web applications using Angular.",
      "Applied RxJS observables for managing asynchronous data flows and state management.",
      "Integrated APIs to fetch and post data dynamically to backend services."
    ],
    tags: ["Angular", "Javascript", "Typescript"]
  },
  {
    name: "Caminalta UG",
    type: "Freelance",
    mode: "Remote",
    role: "Frontend Developer",
    start: new Date(2017, 6, 1),
    end: new Date(2018, 4, 1),
    url: "",
    tasks: [
      "Generated and developed applications using the JHipster platform to bridge frontend and backend development seamlessly.",
      "Designed and implemented dynamic and responsive web applications using Angular.",
      "Utilized Angular Material for crafting appealing and consistent UI components."
    ],
    tags: ["Angular", "Javascript", "Typescript", "JHipster"]
  }
]

const ITEMS_THRESHOLD = 2

const Experience = ({ setCursorText, setCursorVariant }: CursorAnimationHandler) => {
  const sortedJobs = useMemo(() => jobs.sort((a, b) => b.start.getTime() - a.start.getTime()), [])

  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function linkEnter() {
    setCursorText("👀")
    setCursorVariant("link")
  }

  return (
    <div className="flex justify-center items-center  h-full mx-auto max-w-3xl lg:max-w-4xl w-full">
      <div className="mx-auto w-full">
        <Title>Experience</Title>
        <Subtitle>{"Where I've worked so far"}</Subtitle>
        <div className="mt-10">
          <Timeline>
            {sortedJobs
              .slice()
              .slice(0, ITEMS_THRESHOLD)
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
                        {`${format(job.start, "MMM yyyy")} - ${job.end ? format(job.end, "MMM yyyy") : "Present"}`}
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
          <>
            <div
              className={
                "h-28 -mt-28 bg-gradient-to-b from-transparent from-0% via-white/60 via-10% to-white to-80% w-full scale-x-110 relative z-10"
              }
            />
            <div className={"text-center flex items-center"}>
              <Divider />
              <m.a
                href="/assets/Rene_Ricardo_Resume.pdf"
                target="_blank"
                rel="noreferrer noopener"
                title="Show More"
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.2 },
                  type: "spring"
                }}>
                <AddCircleIcon className="h-8 w-8 text-gray-500" />
              </m.a>
              <Divider />
            </div>
          </>
          <m.a
            onMouseEnter={linkEnter}
            onMouseLeave={onMouseLeave}
            href="/assets/Rene_Ricardo_Resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            transition={{ type: "teen", stiffness: 400, damping: 10 }}
            className={
              "underline underline-offset-2 mt-8 max-w-max text-center mx-auto text-sm flex justify-center items-center gap-2 px-3 py-1 z-0"
            }>
            <span className={"text-cyan-950"}>{"See Full Resume"}</span>
            <ExternalLink />
          </m.a>
        </div>
      </div>
    </div>
  )
}

const Divider = () => <div className={"h-0.5 w-full bg-gray-100 rounded-full"} />

export default Experience
