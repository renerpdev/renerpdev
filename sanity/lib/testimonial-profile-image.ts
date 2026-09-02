type SanityImage = Record<string, unknown>

interface TestimonialProfilePhotoMigration {
  _id?: unknown
  _rev?: unknown
  currentImage?: unknown
  profilePhoto?: unknown
}

export function getDirectTestimonialProfileImage(media: unknown): SanityImage | null {
  if (!isRecord(media) || !isRecord(media.image) || media.image._type !== "image" || !isRecord(media.image.asset)) {
    return null
  }

  return media.image
}

export function getTestimonialProfilePhotoMigrationPatch(
  testimonial: TestimonialProfilePhotoMigration
): { patch: { id: string; ifRevisionID: string; set: { profilePhoto: SanityImage } } } | null {
  if (
    typeof testimonial._id !== "string" ||
    typeof testimonial._rev !== "string" ||
    getDirectTestimonialProfileImage({ image: testimonial.profilePhoto })
  ) {
    return null
  }

  const profilePhoto = getDirectTestimonialProfileImage({ image: testimonial.currentImage })
  if (!profilePhoto) {
    return null
  }

  return {
    patch: {
      id: testimonial._id,
      ifRevisionID: testimonial._rev,
      set: { profilePhoto }
    }
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}
