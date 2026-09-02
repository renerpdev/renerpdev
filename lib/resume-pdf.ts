export const RESUME_PDF_TTL_MS = 30 * 60 * 1000

interface StoredResumePdf {
  url?: string
  generatedAt?: string
}

type ResumePdfSource = { kind: "sanity"; url: string } | { kind: "generate" }
type ResumePdfDownloadSource = "sanity" | "generated"

export function selectResumePdfSource(pdf: StoredResumePdf, nowMs: number): ResumePdfSource {
  if (!pdf.url || !pdf.generatedAt) {
    return { kind: "generate" }
  }

  const generatedAtMs = Date.parse(pdf.generatedAt)
  if (!Number.isFinite(generatedAtMs) || nowMs - generatedAtMs >= RESUME_PDF_TTL_MS) {
    return { kind: "generate" }
  }

  return { kind: "sanity", url: pdf.url }
}

export function createPdfDownloadResponse(pdfBytes: Uint8Array, source: ResumePdfDownloadSource): Response {
  const body = new Uint8Array(pdfBytes).buffer

  return new Response(body, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Disposition": 'attachment; filename="rene-ricardo-resume.pdf"',
      "Content-Type": "application/pdf",
      "X-Resume-Pdf-Source": source
    }
  })
}
