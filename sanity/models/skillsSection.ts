import type { Skill } from "./skill"

export interface SkillsSection {
  _id: string
  _type: "skillsSection"
  title: string
  subtitle?: string
  skills: Skill[]
}
