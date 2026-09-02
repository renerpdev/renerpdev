export const SANITY_CACHE_TAGS = {
  about: "sanity:about",
  callToAction: "sanity:call-to-action",
  contact: "sanity:contact",
  education: "sanity:education",
  experience: "sanity:experience",
  footer: "sanity:footer",
  hero: "sanity:hero",
  marquee: "sanity:marquee",
  media: "sanity:media",
  navbar: "sanity:navbar",
  projects: "sanity:projects",
  resume: "sanity:resume",
  skills: "sanity:skills",
  testimonials: "sanity:testimonials"
} as const

type SanityCacheTag = (typeof SANITY_CACHE_TAGS)[keyof typeof SANITY_CACHE_TAGS]

const CONTENT_REVALIDATION_TAGS: Record<string, readonly SanityCacheTag[]> = {
  about: [SANITY_CACHE_TAGS.about],
  callToActionSection: [SANITY_CACHE_TAGS.callToAction],
  contactSection: [SANITY_CACHE_TAGS.contact],
  education: [SANITY_CACHE_TAGS.education],
  experience: [SANITY_CACHE_TAGS.experience],
  experienceSection: [SANITY_CACHE_TAGS.experience],
  footer: [SANITY_CACHE_TAGS.footer],
  hero: [SANITY_CACHE_TAGS.hero],
  marqueeSection: [SANITY_CACHE_TAGS.marquee],
  media: [SANITY_CACHE_TAGS.media],
  navbar: [SANITY_CACHE_TAGS.navbar],
  project: [SANITY_CACHE_TAGS.projects],
  projectsSection: [SANITY_CACHE_TAGS.projects],
  skill: [SANITY_CACHE_TAGS.skills],
  skillsSection: [SANITY_CACHE_TAGS.skills],
  tag: [SANITY_CACHE_TAGS.experience, SANITY_CACHE_TAGS.projects],
  testimonial: [SANITY_CACHE_TAGS.testimonials],
  testimonialSection: [SANITY_CACHE_TAGS.testimonials]
}

const CONTENT_REVALIDATION_PATHS: Record<string, readonly string[]> = {
  about: ["/"],
  callToActionSection: ["/"],
  contactSection: ["/"],
  education: ["/resume"],
  experience: ["/", "/resume"],
  experienceSection: ["/"],
  footer: ["/"],
  hero: ["/"],
  marqueeSection: ["/"],
  media: ["/"],
  navbar: ["/"],
  project: ["/", "/resume"],
  projectsSection: ["/"],
  skill: ["/", "/resume"],
  skillsSection: ["/"],
  tag: ["/"],
  testimonial: ["/"],
  testimonialSection: ["/"]
}

export function getContentRevalidationTags(documentType: string): readonly SanityCacheTag[] | null {
  return CONTENT_REVALIDATION_TAGS[documentType] ?? null
}

export function getContentRevalidationPaths(documentType: string): readonly string[] | null {
  return CONTENT_REVALIDATION_PATHS[documentType] ?? null
}

export function getContentRevalidationPlan(
  documentType: string
): { paths: readonly string[]; tags: readonly SanityCacheTag[] } | null {
  const tags = getContentRevalidationTags(documentType)
  const paths = getContentRevalidationPaths(documentType)

  return tags && paths ? { paths, tags } : null
}

export function withSanityTags(...tags: SanityCacheTag[]) {
  return {
    next: {
      tags: [...new Set(tags)]
    }
  }
}
