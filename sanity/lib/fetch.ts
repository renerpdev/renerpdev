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

// Fetch options for Sanity queries
// Use cache tag for revalidation via revalidateTag()
const fetchOptions = {
  next: {
    tags: ["sanity-content"]
  }
}

// Navbar
export async function getNavbar(): Promise<Navbar | null> {
  return await client.fetch(navbarQuery, {}, fetchOptions)
}

// Hero
export async function getHero(): Promise<Hero | null> {
  return await client.fetch(heroQuery, {}, fetchOptions)
}

// About
export async function getAbout(): Promise<About | null> {
  return await client.fetch(aboutQuery, {}, fetchOptions)
}

// Marquee Section
export async function getMarqueeSection(): Promise<MarqueeSection | null> {
  return await client.fetch(marqueeSectionQuery, {}, fetchOptions)
}

// Call to Action Section
export async function getCallToActionSection(): Promise<CallToActionSection | null> {
  return await client.fetch(callToActionSectionQuery, {}, fetchOptions)
}

// Contact Section
export async function getContactSection(): Promise<ContactSection | null> {
  return await client.fetch(contactSectionQuery, {}, fetchOptions)
}

// Footer
export async function getFooter(): Promise<Footer | null> {
  return await client.fetch(footerQuery, {}, fetchOptions)
}

// Experience Section
export async function getExperienceSection(): Promise<ExperienceSection | null> {
  return await client.fetch(experienceSectionQuery, {}, fetchOptions)
}

// Experience
export async function getExperience(): Promise<Experience[]> {
  return await client.fetch(experienceQuery, {}, fetchOptions)
}

// Projects Section
export async function getProjectsSection(): Promise<ProjectsSection | null> {
  return await client.fetch(projectsSectionQuery, {}, fetchOptions)
}

// Projects
export async function getProjects(): Promise<Project[]> {
  return await client.fetch(projectsQuery, {}, fetchOptions)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return await client.fetch(featuredProjectsQuery, {}, fetchOptions)
}

// Skills Section
export async function getSkillsSection(): Promise<SkillsSection | null> {
  return await client.fetch(skillsSectionQuery, {}, fetchOptions)
}

// Skills
export async function getSkills(): Promise<Skill[]> {
  return await client.fetch(skillsQuery, {}, fetchOptions)
}

export async function getSkillsByCategory(category: "soft" | "technology"): Promise<Skill[]> {
  return await client.fetch(skillsByCategoryQuery(category), {}, fetchOptions)
}

// Testimonial Section
export async function getTestimonialSection(): Promise<TestimonialSection | null> {
  return await client.fetch(testimonialSectionQuery, {}, fetchOptions)
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  return await client.fetch(testimonialsQuery, {}, fetchOptions)
}
