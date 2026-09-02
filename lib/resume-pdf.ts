export const SANITY_PDF_FETCH_TIMEOUT_MS = 5000

interface StoredResumePdf {
  url?: string
}

type ResumePdfSource = { kind: "sanity"; url: string } | { kind: "generate" }
type ResumePdfDownloadSource = "sanity" | "generated"

interface ResumePdfDependencies {
  loadSanityPdf: (url: string) => Promise<Uint8Array>
  generatePdf: () => Promise<Uint8Array>
  onSanityError?: (error: unknown) => void
}

interface ResolvedResumePdf {
  pdfBytes: Uint8Array
  source: ResumePdfDownloadSource
}

export function selectResumePdfSource(pdf: StoredResumePdf): ResumePdfSource {
  if (!pdf.url) {
    return { kind: "generate" }
  }

  return { kind: "sanity", url: pdf.url }
}

export async function resolveResumePdf(
  pdf: StoredResumePdf,
  dependencies: ResumePdfDependencies
): Promise<ResolvedResumePdf> {
  const source = selectResumePdfSource(pdf)

  if (source.kind === "sanity") {
    try {
      return {
        pdfBytes: await dependencies.loadSanityPdf(source.url),
        source: "sanity"
      }
    } catch (error) {
      dependencies.onSanityError?.(error)
    }
  }

  return {
    pdfBytes: await dependencies.generatePdf(),
    source: "generated"
  }
}

export async function fetchStoredPdf(
  url: string,
  fetcher: typeof fetch = fetch,
  timeoutMs = SANITY_PDF_FETCH_TIMEOUT_MS
): Promise<Uint8Array> {
  const response = await fetcher(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs)
  })

  if (!response.ok) {
    throw new Error(`Sanity PDF request failed with status ${response.status}`)
  }

  return new Uint8Array(await response.arrayBuffer())
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
