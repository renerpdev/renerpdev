import { client } from "./client"
import { SANITY_CACHE_TAGS, withSanityTags } from "./cache-tags"
import {
  navbarQuery,
  heroQuery,
  aboutQuery,
  marqueeSectionQuery,
  callToActionSectionQuery,
  contactSectionQuery,
  footerQuery,
  experienceSectionQuery,
  experienceQuery,
  projectsSectionQuery,
  projectsQuery,
  featuredProjectsQuery,
  skillsSectionQuery,
  skillsQuery,
  skillsByCategoryQuery,
  testimonialSectionQuery,
  testimonialsQuery,
  resumePageQuery,
  educationQuery
} from "./queries"
import type {
  Navbar,
  Hero,
  About,
  MarqueeSection,
  CallToActionSection,
  ContactSection,
  Footer,
  ExperienceSection,
  Experience,
  ProjectsSection,
  Project,
  SkillsSection,
  Skill,
  TestimonialSection,
  Testimonial,
  ResumePage,
  Education
} from "../models"

// Navbar
export async function getNavbar(): Promise<Navbar | null> {
  return await client.fetch(navbarQuery, {}, withSanityTags(SANITY_CACHE_TAGS.navbar, SANITY_CACHE_TAGS.media))
}

// Hero
export async function getHero(): Promise<Hero | null> {
  return await client.fetch(heroQuery, {}, withSanityTags(SANITY_CACHE_TAGS.hero, SANITY_CACHE_TAGS.media))
}

// About
export async function getAbout(): Promise<About | null> {
  return await client.fetch(aboutQuery, {}, withSanityTags(SANITY_CACHE_TAGS.about))
}

// Marquee Section
export async function getMarqueeSection(): Promise<MarqueeSection | null> {
  return await client.fetch(marqueeSectionQuery, {}, withSanityTags(SANITY_CACHE_TAGS.marquee))
}

// Call to Action Section
export async function getCallToActionSection(): Promise<CallToActionSection | null> {
  return await client.fetch(callToActionSectionQuery, {}, withSanityTags(SANITY_CACHE_TAGS.callToAction))
}

// Contact Section
export async function getContactSection(): Promise<ContactSection | null> {
  return await client.fetch(contactSectionQuery, {}, withSanityTags(SANITY_CACHE_TAGS.contact))
}

// Footer
export async function getFooter(): Promise<Footer | null> {
  return await client.fetch(footerQuery, {}, withSanityTags(SANITY_CACHE_TAGS.footer, SANITY_CACHE_TAGS.media))
}

// Experience Section
export async function getExperienceSection(): Promise<ExperienceSection | null> {
  return await client.fetch(experienceSectionQuery, {}, withSanityTags(SANITY_CACHE_TAGS.experience))
}

// Experience
export async function getExperience(): Promise<Experience[]> {
  return await client.fetch(experienceQuery, {}, withSanityTags(SANITY_CACHE_TAGS.experience))
}

// Projects Section
export async function getProjectsSection(): Promise<ProjectsSection | null> {
  return await client.fetch(projectsSectionQuery, {}, withSanityTags(SANITY_CACHE_TAGS.projects))
}

// Projects
export async function getProjects(): Promise<Project[]> {
  return await client.fetch(projectsQuery, {}, withSanityTags(SANITY_CACHE_TAGS.projects))
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return await client.fetch(featuredProjectsQuery, {}, withSanityTags(SANITY_CACHE_TAGS.projects))
}

// Skills Section
export async function getSkillsSection(): Promise<SkillsSection | null> {
  return await client.fetch(skillsSectionQuery, {}, withSanityTags(SANITY_CACHE_TAGS.skills))
}

// Skills
export async function getSkills(): Promise<Skill[]> {
  return await client.fetch(skillsQuery, {}, withSanityTags(SANITY_CACHE_TAGS.skills))
}

export async function getSkillsByCategory(category: "soft" | "hard"): Promise<Skill[]> {
  return await client.fetch(skillsByCategoryQuery(category), {}, withSanityTags(SANITY_CACHE_TAGS.skills))
}

// Testimonial Section
export async function getTestimonialSection(): Promise<TestimonialSection | null> {
  return await client.fetch(
    testimonialSectionQuery,
    {},
    withSanityTags(SANITY_CACHE_TAGS.testimonials, SANITY_CACHE_TAGS.media)
  )
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  return await client.fetch(testimonialsQuery, {}, withSanityTags(SANITY_CACHE_TAGS.testimonials))
}

// Resume Page
export async function getResumePage(): Promise<ResumePage | null> {
  return await client.fetch(
    resumePageQuery,
    {},
    withSanityTags(
      SANITY_CACHE_TAGS.resume,
      SANITY_CACHE_TAGS.education,
      SANITY_CACHE_TAGS.experience,
      SANITY_CACHE_TAGS.projects,
      SANITY_CACHE_TAGS.skills
    )
  )
}

export async function getResumePageUncached(): Promise<ResumePage | null> {
  return await client.fetch(resumePageQuery, {}, { cache: "no-store" })
}

// Education
export async function getEducation(): Promise<Education[]> {
  return await client.fetch(educationQuery, {}, withSanityTags(SANITY_CACHE_TAGS.education))
}
