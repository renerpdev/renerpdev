export interface Education {
  _id: string
  _type: "education"
  degree: string
  institution: string
  location?: string
  startDate: string
  endDate?: string
  description?: string
}
