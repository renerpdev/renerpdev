import type { PortableTextBlock } from "@portabletext/types"
import type { Media } from "./media"

export interface SocialLink {
  name: string
  icon: Media
  link: string
}

export interface Footer {
  _id: string
  _type: "footer"
  bgImage?: Media
  logo?: Media
  heading?: PortableTextBlock[]
  subheading?: PortableTextBlock[]
  socialLinks?: SocialLink[]
  description?: PortableTextBlock[]
  scrollToTopButton?: {
    icon?: Media
    link?: string
  }
}
