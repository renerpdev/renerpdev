import type { Experience } from "./experience"
import type { Education } from "./education"
import type { Skill } from "./skill"
import type { Tag } from "./tag"
import type { Project } from "./project"
import type { Media } from "./media"

export interface ResumeLanguage {
  name: string
  level: "Native" | "Fluent" | "Advanced" | "Intermediate" | "Basic"
}

export interface ResumeContactLink {
  label: string
  value: string
  url?: string
  icon?: string
}

export interface ResumePage {
  _id: string
  _type: "resumePage"
  pageTitle: string
  pageDescription?: string
  profileImage?: {
    asset: {
      _id: string
      url: string
    }
  }
  fullName: string
  jobTitle: string
  aboutText: string
  experiences?: Experience[]
  education?: Education[]
  softSkills?: Skill[]
  technicalSkills?: Skill[]
  technologies?: Tag[]
  projects?: Project[]
  languages?: ResumeLanguage[]
  contactLinks?: ResumeContactLink[]
  currentPdf?: Media
  pdfGeneratedAt?: string
}
