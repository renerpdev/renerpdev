import {
  getNavbar,
  getHero,
  getAbout,
  getMarqueeSection,
  getCallToActionSection,
  getContactSection,
  getFooter,
  getExperienceSection,
  getProjectsSection,
  getSkillsSection,
  getTestimonialSection
} from "@/sanity/lib/fetch"
import HomeClient from "./_components/HomeClient"

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  // Fetch all data in parallel
  const [
    navbar,
    hero,
    about,
    marqueeSection,
    callToActionSection,
    contactSection,
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
    getContactSection(),
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
      contactSection={contactSection}
      footer={footer}
      experienceSection={experienceSection}
      projectsSection={projectsSection}
      skillsSection={skillsSection}
      testimonialSection={testimonialSection}
    />
  )
}
