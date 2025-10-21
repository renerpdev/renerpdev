import type { Media } from "./media"

export interface Testimonial {
  _id: string
  _type: "testimonial"
  name: string
  title: string
  company: string
  quote: string
  profileImage?: Media
  profileUrl?: string
}
