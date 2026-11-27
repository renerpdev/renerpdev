import { once } from "node:events"
import { createServer } from "node:http"
import { resolve } from "node:path"
import puppeteer from "puppeteer-core"
import serve from "serve-handler"
import { RESUME_PDF_FILENAME } from "../lib/resume.mjs"

const outputDirectory = resolve("out")
const server = createServer((request, response) => {
  serve(request, response, { public: outputDirectory, directoryListing: false })
})
server.listen(0, "127.0.0.1")
await once(server, "listening")

try {
  const browser = await puppeteer.launch(await getBrowserOptions())
  try {
    const page = await browser.newPage()
    const { port } = server.address()
    const response = await page.goto(`http://127.0.0.1:${port}/resume/print`, { waitUntil: "networkidle0" })
    if (!response?.ok() || !(await page.$("[data-resume-print]"))) {
      throw new Error("The static resume print page is missing published content")
    }
    const hasBrokenImage = await page.$$eval("[data-resume-print] img", (images) =>
      images.some((image) => !image.complete || !image.naturalWidth)
    )
    if (hasBrokenImage) throw new Error("An image on the resume print page could not load")

    await page.pdf({
      path: resolve(outputDirectory, RESUME_PDF_FILENAME),
      format: "A4",
      printBackground: true
    })
  } finally {
    await browser.close()
  }
} finally {
  server.close()
}

async function getBrowserOptions() {
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
  if (process.platform === "linux" && !executablePath) {
    const { default: chromium } = await import("@sparticuz/chromium")
    return { headless: true, executablePath: await chromium.executablePath(), args: chromium.args }
  }

  const defaultPath =
    process.platform === "darwin" ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" : ""
  if (!executablePath && !defaultPath) {
    throw new Error("Set PUPPETEER_EXECUTABLE_PATH to a Chrome or Chromium executable")
  }
  return { headless: true, executablePath: executablePath || defaultPath }
}
