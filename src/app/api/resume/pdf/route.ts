import { NextResponse } from "next/server"
import { createPdfDownloadResponse, fetchStoredPdf, resolveResumePdf } from "@/lib/resume-pdf"
import { getResumePageUncached } from "@/sanity/lib/fetch"
import { uploadPdfToSanity } from "@/sanity/lib/mutations"

/* eslint-disable no-console -- stage logs are required to diagnose Vercel function timeouts */

export const maxDuration = 60

export async function GET() {
  const startedAt = Date.now()

  try {
    console.info("[Resume PDF] Request started")

    const resumePage = await getResumePageUncached()
    logStage("Sanity state loaded", startedAt)

    if (!resumePage) {
      return NextResponse.json({ error: "Resume page not configured" }, { status: 404 })
    }

    const resolvedPdf = await resolveResumePdf(
      {
        url: resumePage.currentPdf?.file?.asset?.url
      },
      {
        loadSanityPdf: async (url) => {
          const pdfBytes = await fetchStoredPdf(url)
          logStage("Fresh Sanity PDF loaded", startedAt, { bytes: pdfBytes.byteLength })
          return pdfBytes
        },
        generatePdf: async () => {
          const { pdfBytes } = await generateAndUploadPdf(resumePage._id, startedAt)
          logStage("Generated PDF ready for download", startedAt, { bytes: pdfBytes.byteLength })
          return pdfBytes
        },
        onSanityError: (error) => {
          console.warn("[Resume PDF] Stored PDF unavailable; regenerating", {
            elapsedMs: Date.now() - startedAt,
            error: error instanceof Error ? error.message : String(error)
          })
        }
      }
    )

    return createPdfDownloadResponse(resolvedPdf.pdfBytes, resolvedPdf.source)
  } catch (error) {
    console.error("[Resume PDF] Request failed", {
      elapsedMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate PDF" },
      { status: 500 }
    )
  }
}

async function generateAndUploadPdf(resumePageId: string, requestStartedAt: number): Promise<{ pdfBytes: Uint8Array }> {
  const isDev = process.env.NODE_ENV === "development"

  let browser

  if (isDev) {
    const puppeteer = await import("puppeteer")
    browser = await puppeteer.default.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })
  } else {
    const puppeteerCore = await import("puppeteer-core")
    const chromium = await import("@sparticuz/chromium")
    browser = await puppeteerCore.default.launch({
      args: chromium.default.args,
      defaultViewport: { width: 1920, height: 1080 },
      executablePath: await chromium.default.executablePath(),
      headless: true
    })
  }
  logStage("Chromium launched", requestStartedAt)

  try {
    const page = await browser.newPage()

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    await page.goto(`${baseUrl}/resume/print`, {
      waitUntil: "networkidle0",
      timeout: 30_000
    })
    logStage("Print page loaded", requestStartedAt)

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" }
    })
    logStage("PDF rendered", requestStartedAt, { bytes: pdfBuffer.byteLength })

    await uploadPdfToSanity(Buffer.from(pdfBuffer), resumePageId)
    logStage("PDF uploaded to Sanity", requestStartedAt)

    return { pdfBytes: pdfBuffer }
  } finally {
    await browser.close()
    logStage("Chromium closed", requestStartedAt)
  }
}

function logStage(stage: string, startedAt: number, details: Record<string, unknown> = {}) {
  console.info("[Resume PDF]", {
    stage,
    elapsedMs: Date.now() - startedAt,
    ...details
  })
}
