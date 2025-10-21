import type { PortableTextBlock } from "sanity"

export interface About {
  _id: string
  _type: "about"
  title: string
  description: PortableTextBlock[]
  cta?: {
    text: string
    link: string
  }
}
