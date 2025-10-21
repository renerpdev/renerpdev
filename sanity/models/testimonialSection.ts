import type { Testimonial } from "./testimonial"
import type { Media } from "./media"

export interface TestimonialSection {
  _id: string
  _type: "testimonialSection"
  bgImage?: Media
  title: string
  subtitle?: string
  testimonials: Testimonial[]
}
