export interface Tag {
  _id: string
  _type: "tag"
  name: string
  slug: {
    current: string
  }
  color?: string
}
