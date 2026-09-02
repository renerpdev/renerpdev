interface SanityWebhookDocument {
  _id?: unknown
  _type?: unknown
}

export function getPublishedResumePageId(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null
  }

  const document = payload as SanityWebhookDocument
  if (document._type !== "resumePage" || typeof document._id !== "string" || !document._id) {
    return null
  }

  if (document._id.startsWith("drafts.") || document._id.startsWith("versions.")) {
    return null
  }

  return document._id
}
