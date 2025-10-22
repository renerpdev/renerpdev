export interface Media {
  _id: string
  _type: "media"
  title: string
  description?: string
  category: "document" | "image" | "resume" | "certificate" | "other"
  file?: {
    asset: {
      _id: string
      url: string
    }
  }
  image?: {
    asset: {
      _id: string
      url: string
    }
  }
}
