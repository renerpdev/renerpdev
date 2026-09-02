interface SanityWebhookDocument {
  _id?: unknown
  _type?: unknown
}

export function getPublishedSanityWebhookDocument(payload: unknown): { id: string; type: string } | null {
  if (!payload || typeof payload !== "object") {
    return null
  }

  const document = payload as SanityWebhookDocument
  if (typeof document._type !== "string" || typeof document._id !== "string" || !document._id) {
    return null
  }

  if (document._id.startsWith("drafts.") || document._id.startsWith("versions.")) {
    return null
  }

  return { id: document._id, type: document._type }
}

export function getPublishedResumePageId(payload: unknown): string | null {
  const document = getPublishedSanityWebhookDocument(payload)
  return document?.type === "resumePage" ? document.id : null
}
