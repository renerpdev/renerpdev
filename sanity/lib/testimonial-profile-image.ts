type SanityImage = Record<string, unknown>

interface LegacyTestimonialProfileImage {
  _id?: unknown
  _rev?: unknown
  legacyMedia?: unknown
}

export function getDirectTestimonialProfileImage(media: unknown): SanityImage | null {
  if (!isRecord(media) || !isRecord(media.image) || media.image._type !== "image" || !isRecord(media.image.asset)) {
    return null
  }

  return media.image
}

export function getTestimonialProfileImageMigrationPatch(
  testimonial: LegacyTestimonialProfileImage
): { patch: { id: string; ifRevisionID: string; set: { profileImage: SanityImage } } } | null {
  if (typeof testimonial._id !== "string" || typeof testimonial._rev !== "string") {
    return null
  }

  const profileImage = getDirectTestimonialProfileImage(testimonial.legacyMedia)
  if (!profileImage) {
    return null
  }

  return {
    patch: {
      id: testimonial._id,
      ifRevisionID: testimonial._rev,
      set: { profileImage }
    }
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}
