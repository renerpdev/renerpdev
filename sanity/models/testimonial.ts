export interface Testimonial {
  _id: string
  _type: "testimonial"
  name: string
  title: string
  company: string
  quote: string
  profileImage?: {
    asset: {
      _id: string
      url: string
    }
  }
  profileUrl?: string
}
