type SanityImage = Record<string, unknown>

export function getDirectTestimonialProfileImage(media: unknown): SanityImage | null {
  if (!isRecord(media) || !isRecord(media.image) || media.image._type !== "image" || !isRecord(media.image.asset)) {
    return null
  }

  return media.image
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}
