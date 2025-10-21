import type { PortableTextBlock } from "sanity"
import type { Media } from "./media"

export interface Hero {
  _id: string
  _type: "hero"
  bgImage?: Media
  header: PortableTextBlock[]
  subheader: PortableTextBlock[]
  primaryCta?: {
    text: string
    link: string
  }
  secondaryCta?: {
    text: string
    file?: Media
  }
}
