export const WORK_EXPERIENCE = [
  {
    name: "Lumenalta",
    role: "Senior Frontend Engineer",
    type: "Full-Time",
    mode: "Remote",
    start: new Date(2022, 1, 7),
    end: undefined,
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

export const PROJECTS = [
  {
    title: "Garage Booking",
    description: "Web application for helping my neighbors book their parking spaces from the building garage.",
    githubRepo: "https://github.com/renerpdev/garage-booking",
    link: "https://garage-booking.renerp.dev/",
    year: 2024,
    tags: ["React", "Next.js", "Vercel", "Typescript", "TailwindCSS", "Prisma"]
  },
  {
    title: "Tussis",
    description:
      "Web application for managing patients' asthma condition. It helps patients to keep track of their progress by providing them fancy charts that display the data.",
    githubRepo: "https://github.com/renerpdev/tussis",
    link: "https://tussis-app.web.app/",
    year: 2023,
    tags: ["React", "Nestjs", "Firebase", "Typescript", "TailwindCSS"]
  },
  {
    title: "Painted Checkers",
    description:
      "Checkers game built using native web technologies. The game is based on the classic checkers game and it lets the user to play against the computer or against another player.",
    githubRepo: "https://github.com/renerpdev/checkers",
    link: "https://renerpdev.github.io/checkers/",
    year: 2020,
    tags: ["Javascript", "HTML", "CSS"]
  },
  {
    title: "Password Dealer",
    description:
      "Basic input password reveal built with javascript, HTML and CSS. It allows the users to hide and reveal their passwords with the ease of just clicking a button.",
    githubRepo: "https://github.com/renerpdev/password-dealer",
    npmRepo: "https://www.npmjs.com/package/password-dealer",
    year: 2019,
    tags: ["Javascript", "jQuery", "HTML", "CSS"]
  },
  {
    title: "Vollk",
    description:
      "Command line tool built using Knex.js for seeding massive amount of fake data into multiple databases.",
    githubRepo: "https://github.com/renerpdev/vollk",
    npmRepo: "https://www.npmjs.com/package/vollk",
    year: 2018,
    tags: ["Javascript", "Knex", "Inquirer", "Commander", "Faker"]
  },
  {
    title: "CSS Drag & Drop",
    description:
      "jQuery plugin for adding drag and drop functionality to your HTML elements. It has built-in styles but can be easily customized.",
    githubRepo: "https://github.com/renerpdev/css-dnd",
    npmRepo: "https://www.npmjs.com/package/css-dnd",
    year: 2019,
    tags: ["Javascript", "jquery", "drag & drop", "CSS"]
  },
  {
    title: "COVID-19 Stats",
    description:
      "Web application, built in Ionic, that displays the latest COVID-19 stats in the world. It uses the 'Rapidapi.com' API to fetch the data and displays it in a clean and easy-to-read format.",
    githubRepo: "https://github.com/renerpdev/covid19-stats",
    link: "https://cov19-stats.firebaseapp.com/",
    year: 2020,
    tags: ["Ionic", "Typescript", "React.js", "CSS", "Firebase"]
  }
]

export const SKILL_SET = [
  "Problem Solving",
  "Teamwork",
  "Critical Thinking",
  "Responsibility",
  "Adaptability",
  "Attention to Detail",
  "Pragmatism",
  "Time Management",
  "Empathy",
  "Discipline",
  "Creativity",
  "Communication",
  "Flexibility"
]

export const TESTIMONIALS = [
  {
    name: "Felipe Piquer",
    title: "CEO & Project Manager",
    company: "Informage Studios S.L.U.",
    quote:
      "We have had the opportunity to work together and I can say that he is a professional dedicated to the work assigned to him. He has excellent skills in web layout and frontend development. Socially he is a polite person and concerned about his teammates.",
    image:
      "https://media.licdn.com/dms/image/C5603AQGlbP7E7hapPg/profile-displayphoto-shrink_400_400/0/1517508164173?e=1719446400&v=beta&t=AjX9uKvM9qi-oD8gOmbWC3oefOSjahkujckg0RGbRIM",
    profileUrl: "https://www.linkedin.com/in/felipe-piquer-69129b49/"
  },
  {
    name: "Alexander Escalona",
    title: "Lead Software Engineer",
    company: "Level 6 LLC",
    quote:
      "I can affirm that he fully fulfills the tasks that are assigned. His web design and frontend development skills are excellent. His attitudes as a person and professional seem correct to me and I would recommend him to recruiters and clients who need these qualities in a developer.",
    image:
      "https://media.licdn.com/dms/image/D5635AQEFSCIM3VGyTA/profile-framedphoto-shrink_400_400/0/1703014825234?e=1714532400&v=beta&t=-C3hy_ovX5r2-btg8dR2z7qDc9o7NHYsK0GjrxVVyZg",
    profileUrl: "https://www.linkedin.com/in/alexander-escalona-fern%C3%A1ndez-a59883123/"
  },
  {
    name: "Josué Bermúdez",
    title: "Data Analyst",
    company: "PeopleWalking",
    quote:
      "I had the pleasure of working with René, and let me tell you, he's quite the star! He's got a great work ethic, is super responsible, and always gets the job done with lightning-fast speed and top-notch quality. I'd highly recommend him both personally and professionally - he's just a great guy to have around!",
    image:
      "https://media.licdn.com/dms/image/C4E03AQE3NoxRF0MYbA/profile-displayphoto-shrink_400_400/0/1526917046378?e=1720051200&v=beta&t=mhgYFGpuDvzQQKrWGXeLxjo9KJXJMRywfWBu4mZNcyA",
    profileUrl: "https://www.linkedin.com/in/josue-bermudez/"
  }
]

export const KNOWN_TECHNOLOGIES = [
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
