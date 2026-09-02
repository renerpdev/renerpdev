interface DownloadAnchor {
  href: string
  download: string
  hidden: boolean
  click: () => void
  remove: () => void
}

interface BrowserDownloadEnvironment {
  createObjectUrl: (blob: Blob) => string
  createAnchor: () => DownloadAnchor
  appendAnchor: (anchor: DownloadAnchor) => void
  scheduleRevoke: (url: string) => void
}

export function downloadBlob(
  blob: Blob,
  filename: string,
  environment: BrowserDownloadEnvironment = createBrowserDownloadEnvironment()
) {
  const downloadUrl = environment.createObjectUrl(blob)
  const anchor = environment.createAnchor()

  anchor.href = downloadUrl
  anchor.download = filename
  anchor.hidden = true
  environment.appendAnchor(anchor)
  anchor.click()
  anchor.remove()
  environment.scheduleRevoke(downloadUrl)
}

function createBrowserDownloadEnvironment(): BrowserDownloadEnvironment {
  return {
    createObjectUrl: (blob) => URL.createObjectURL(blob),
    createAnchor: () => document.createElement("a"),
    appendAnchor: (anchor) => document.body.append(anchor as HTMLAnchorElement),
    scheduleRevoke: (url) => {
      window.setTimeout(() => URL.revokeObjectURL(url), 0)
    }
  }
}
