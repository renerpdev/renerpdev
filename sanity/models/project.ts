import type { Tag } from "./tag"

export interface Project {
  _id: string
  _type: "project"
  title: string
  description: string
  year: number
  githubRepo?: string
  npmRepo?: string
  liveLink?: string
  featuredImage?: {
    asset: {
      _ref: string
      _type: "reference"
      url?: string
    }
  }
  technologies?: Tag[]
}
