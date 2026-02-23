import type { Experience } from "./experience"

export interface ExperienceSection {
  _id: string
  _type: "experienceSection"
  title: string
  subtitle?: string
  experiences?: Experience[]
  maxDisplayedItems?: number
  cta?: {
    text: string
  }
}
