import { client } from "./client"
import {
  navbarQuery,
  heroQuery,
  aboutQuery,
  marqueeSectionQuery,
  callToActionSectionQuery,
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
  return client.fetch(navbarQuery)
}

// Hero
export async function getHero(): Promise<Hero | null> {
  return client.fetch(heroQuery)
}

// About
export async function getAbout(): Promise<About | null> {
  return client.fetch(aboutQuery)
}

// Marquee Section
export async function getMarqueeSection(): Promise<MarqueeSection | null> {
  return client.fetch(marqueeSectionQuery)
}

// Call to Action Section
export async function getCallToActionSection(): Promise<CallToActionSection | null> {
  return client.fetch(callToActionSectionQuery)
}

// Footer
export async function getFooter(): Promise<Footer | null> {
  return client.fetch(footerQuery)
}

// Experience Section
export async function getExperienceSection(): Promise<ExperienceSection | null> {
  return client.fetch(experienceSectionQuery)
}

// Experience
export async function getExperience(): Promise<Experience[]> {
  return client.fetch(experienceQuery)
}

// Projects Section
export async function getProjectsSection(): Promise<ProjectsSection | null> {
  return client.fetch(projectsSectionQuery)
}

// Projects
export async function getProjects(): Promise<Project[]> {
  return client.fetch(projectsQuery)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch(featuredProjectsQuery)
}

// Skills Section
export async function getSkillsSection(): Promise<SkillsSection | null> {
  return client.fetch(skillsSectionQuery)
}

// Skills
export async function getSkills(): Promise<Skill[]> {
  return client.fetch(skillsQuery)
}

export async function getSkillsByCategory(category: "soft" | "hard"): Promise<Skill[]> {
  return client.fetch(skillsByCategoryQuery(category))
}

// Testimonial Section
export async function getTestimonialSection(): Promise<TestimonialSection | null> {
  return client.fetch(testimonialSectionQuery)
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(testimonialsQuery)
}

// Resume Page
export async function getResumePage(): Promise<ResumePage | null> {
  return client.fetch(resumePageQuery)
}

// Education
export async function getEducation(): Promise<Education[]> {
  return client.fetch(educationQuery)
}
