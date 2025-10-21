import type { Tag } from "./tag"

export interface Experience {
  _id: string
  _type: "experience"
  company: string
  role: string
  employmentType: "Full-Time" | "Part-Time" | "Freelance" | "Contract"
  workMode?: "Remote" | "On-site" | "Hybrid"
  startDate: string
  endDate?: string
  companyUrl?: string
  companyLogo?: {
    asset: {
      _ref: string
      _type: "reference"
      url?: string
    }
  }
  tasks: string[]
  technologies?: Tag[]
}
