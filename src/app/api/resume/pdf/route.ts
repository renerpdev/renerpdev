import { NextResponse } from "next/server"
import { getResumePage } from "@/sanity/lib/fetch"
import { uploadPdfToSanity } from "@/sanity/lib/mutations"

export async function GET() {
  try {
    const resumePage = await getResumePage()

    if (!resumePage) {
      return NextResponse.json({ error: "Resume page not configured" }, { status: 404 })
    }

    // Check if we have a valid cached PDF
    const pdfUrl = resumePage.currentPdf?.file?.asset?.url
    if (pdfUrl && resumePage.pdfGeneratedAt) {
      return NextResponse.json({
        url: pdfUrl,
        generatedAt: resumePage.pdfGeneratedAt,
        cached: true
      })
    }

    // Generate new PDF
    const { url, generatedAt } = await generateAndUploadPdf(resumePage._id)

    return NextResponse.json({ url, generatedAt, cached: false })
  } catch (error) {
    console.error("[Resume PDF] Error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate PDF" },
      { status: 500 }
    )
  }
}

async function generateAndUploadPdf(resumePageId: string): Promise<{ url: string; generatedAt: string }> {
  const isDev = process.env.NODE_ENV === "development"

  let browser

  if (isDev) {
    // In development, use full puppeteer with bundled Chromium
    const puppeteer = await import("puppeteer")
    browser = await puppeteer.default.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })
  } else {
    // In production (Vercel), use puppeteer-core with @sparticuz/chromium
    const puppeteerCore = await import("puppeteer-core")
    const chromium = await import("@sparticuz/chromium")
    browser = await puppeteerCore.default.launch({
      args: chromium.default.args,
      defaultViewport: { width: 1920, height: 1080 },
      executablePath: await chromium.default.executablePath(),
      headless: true
    })
  }

  try {
    const page = await browser.newPage()

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    await page.goto(`${baseUrl}/resume/print`, {
      waitUntil: "networkidle0",
      timeout: 30_000
    })

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" }
    })

    const { url, generatedAt } = await uploadPdfToSanity(Buffer.from(pdfBuffer), resumePageId)

    return { url, generatedAt }
  } finally {
    await browser.close()
  }
}
