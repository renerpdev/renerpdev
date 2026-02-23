import { useState, useCallback } from "react"

/**
 * Shared hook for downloading the resume PDF.
 * If a cached PDF URL is available, opens it directly.
 * Otherwise, calls /api/resume/pdf to generate and returns the URL.
 */
export function useResumeDownload(cachedPdfUrl: string | null) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = useCallback(async () => {
    setIsDownloading(true)
    try {
      if (cachedPdfUrl) {
        window.open(cachedPdfUrl, "_blank")
        return
      }
      // No cached PDF — trigger generation
      const response = await fetch("/api/resume/pdf")
      if (response.ok) {
        const data = await response.json()
        if (data.url) {
          window.open(data.url, "_blank")
        }
      }
    } finally {
      setIsDownloading(false)
    }
  }, [cachedPdfUrl])

  return { handleDownload, isDownloading }
}
