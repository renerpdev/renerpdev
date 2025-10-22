import type { Experience } from "./experience"
import type { Media } from "./media"

export interface ExperienceSection {
  _id: string
  _type: "experienceSection"
  title: string
  subtitle?: string
  experiences?: Experience[]
  cta?: {
    text: string
    file?: Media
  }
}
