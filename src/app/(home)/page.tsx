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
  getTestimonialSection,
  getResumePage
} from "@/sanity/lib/fetch"
import HomeClient from "./_components/HomeClient"

// No automatic revalidation - using on-demand revalidation via Sanity webhook
export const revalidate = false

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
    testimonialSection,
    resumePage
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
    getTestimonialSection(),
    getResumePage()
  ])

  const resumePdfUrl = resumePage?.currentPdf?.file?.asset?.url || null

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
      resumePdfUrl={resumePdfUrl}
    />
  )
}
