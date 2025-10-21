import { client } from "./client"
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
  testimonialsQuery
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
  Testimonial
} from "../models"

// Navbar
export async function getNavbar(): Promise<Navbar | null> {
  return await client.fetch(navbarQuery)
}

// Hero
export async function getHero(): Promise<Hero | null> {
  return await client.fetch(heroQuery)
}

// About
export async function getAbout(): Promise<About | null> {
  return await client.fetch(aboutQuery)
}

// Marquee Section
export async function getMarqueeSection(): Promise<MarqueeSection | null> {
  return await client.fetch(marqueeSectionQuery)
}

// Call to Action Section
export async function getCallToActionSection(): Promise<CallToActionSection | null> {
  return await client.fetch(callToActionSectionQuery)
}

// Contact Section
export async function getContactSection(): Promise<ContactSection | null> {
  return await client.fetch(contactSectionQuery)
}

// Footer
export async function getFooter(): Promise<Footer | null> {
  return await client.fetch(footerQuery)
}

// Experience Section
export async function getExperienceSection(): Promise<ExperienceSection | null> {
  return await client.fetch(experienceSectionQuery)
}

// Experience
export async function getExperience(): Promise<Experience[]> {
  return await client.fetch(experienceQuery)
}

// Projects Section
export async function getProjectsSection(): Promise<ProjectsSection | null> {
  return await client.fetch(projectsSectionQuery)
}

// Projects
export async function getProjects(): Promise<Project[]> {
  return await client.fetch(projectsQuery)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return await client.fetch(featuredProjectsQuery)
}

// Skills Section
export async function getSkillsSection(): Promise<SkillsSection | null> {
  return await client.fetch(skillsSectionQuery)
}

// Skills
export async function getSkills(): Promise<Skill[]> {
  return await client.fetch(skillsQuery)
}

export async function getSkillsByCategory(category: "soft" | "technology"): Promise<Skill[]> {
  return await client.fetch(skillsByCategoryQuery(category))
}

// Testimonial Section
export async function getTestimonialSection(): Promise<TestimonialSection | null> {
  return await client.fetch(testimonialSectionQuery)
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  return await client.fetch(testimonialsQuery)
}
