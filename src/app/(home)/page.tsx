import {
  getNavbar,
  getHero,
  getAbout,
  getMarqueeSection,
  getCallToActionSection,
  getFooter,
  getExperienceSection,
  getProjectsSection,
  getSkillsSection,
  getTestimonialSection
} from "@/sanity/lib/fetch"
import HomeClient from "./_components/HomeClient"

export default async function Home() {
  // Fetch all data in parallel
  const [
    navbar,
    hero,
    about,
    marqueeSection,
    callToActionSection,
    footer,
    experienceSection,
    projectsSection,
    skillsSection,
    testimonialSection
  ] = await Promise.all([
    getNavbar(),
    getHero(),
    getAbout(),
    getMarqueeSection(),
    getCallToActionSection(),
    getFooter(),
    getExperienceSection(),
    getProjectsSection(),
    getSkillsSection(),
    getTestimonialSection()
  ])

  return (
    <HomeClient
      navbar={navbar}
      hero={hero}
      about={about}
      marqueeSection={marqueeSection}
      callToActionSection={callToActionSection}
      footer={footer}
      experienceSection={experienceSection}
      projectsSection={projectsSection}
      skillsSection={skillsSection}
      testimonialSection={testimonialSection}
    />
  )
}
