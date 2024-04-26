import { CheckmarkIcon } from "@sanity/icons"

const About = () => {
  const technologies = [
    "JavaScript (ES6+)",
    "TypeScript",
    "Webflow",
    "TailwindCSS",
    "React",
    "Nestjs",
    "Nextjs",
    "Framer-Motion",
    "Nodejs",
    "HTML5",
    "CSS3",
    "SASS",
    "Styled-Components",
    "Firebase",
    "Vercel",
    "Github"
  ]

  return (
    <div className="h-full w-full p-10 sm:p-12 md:p-16 rounded-xl max-w-3xl lg:max-w-4xl mx-auto shadow-md bg-white">
      <div className="mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-cyan-950 to-cyan-600 bg-clip-text text-transparent">
          About Me
        </h2>
        <p className={"md:text-lg tracking-wide !leading-relaxed font-light"}>
          {
            "Hey there! Ever since I started my journey as a developer back in 2017, I've been doing remote work for some big companies and freelance clients. I've had the chance to work with many different technologies and build some really cool stuff, from landing pages to full-stack web applications. I absolutely love what I do and I'm always excited to learn new things."
          }
        </p>
        <p className={"md:text-lg tracking-wide !leading-relaxed font-light my-4"}>
          {"Here are some of the technologies I've been working with:"}
        </p>
        <ul className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4"}>
          {technologies.map((tech) => (
            <li className="text-left text-cyan-700 flex gap-1 items-center" key={tech}>
              <CheckmarkIcon />
              <span>{tech}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default About
