export interface ContactSection {
  _id: string
  _type: "contactSection"
  title: string
  subtitle?: string
  topics: string[]
  submitButtonLabel: string
}
