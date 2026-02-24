export interface Skill {
  _id: string
  _type: "skill"
  name: string
  category: "soft" | "hard"
  proficiencyLevel?: number
  icon?: {
    asset: {
      _ref: string
      _type: "reference"
      url?: string
    }
  }
}
