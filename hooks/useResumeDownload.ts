import { useState, useCallback } from "react"

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
      const downloadUrl = URL.createObjectURL(pdfBlob)
      const anchor = document.createElement("a")

      anchor.href = downloadUrl
      anchor.download = "rene-ricardo-resume.pdf"
      anchor.hidden = true
      document.body.append(anchor)
      anchor.click()
      anchor.remove()

      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0)
    } catch (error) {
      // eslint-disable-next-line no-console -- client-side failures need a visible browser diagnostic
      console.error("[Resume PDF] Download failed", error)
    } finally {
      setIsDownloading(false)
    }
  }, [])

  return { handleDownload, isDownloading }
}
