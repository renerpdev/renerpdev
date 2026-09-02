import { useState, useCallback } from "react"
import { downloadBlob } from "@/lib/browser-download"

/**
 * Shared hook for downloading the resume PDF.
 * The API decides whether to reuse the current Sanity asset or generate a new PDF.
 */
export function useResumeDownload() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = useCallback(async () => {
    setIsDownloading(true)
    try {
      const response = await fetch("/api/resume/pdf")
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(payload?.error || "Failed to download resume PDF")
      }

      const pdfBlob = await response.blob()
      downloadBlob(pdfBlob, "rene-ricardo-resume.pdf")
    } catch (error) {
      // eslint-disable-next-line no-console -- client-side failures need a visible browser diagnostic
      console.error("[Resume PDF] Download failed", error)
    } finally {
      setIsDownloading(false)
    }
  }, [])

  return { handleDownload, isDownloading }
}
