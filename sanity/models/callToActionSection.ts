export interface CallToActionSection {
  _id: string
  _type: "callToActionSection"
  title: string
  subtitle?: string
  cta: {
    text: string
    link: string
  }
}
