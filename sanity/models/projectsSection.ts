import type { Project } from "./project"

export interface ProjectsSection {
  _id: string
  _type: "projectsSection"
  title: string
  subtitle?: string
  projects?: Project[]
  cta?: {
    text: string
    link: string
  }
}
