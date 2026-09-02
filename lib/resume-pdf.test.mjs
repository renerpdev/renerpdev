import assert from "node:assert/strict"
import test from "node:test"

import * as resumePdf from "./resume-pdf.ts"

const { selectResumePdfSource } = resumePdf

const NOW_MS = Date.parse("2026-09-02T02:30:00.000Z")
const PDF_URL = "https://cdn.sanity.io/files/project/production/resume.pdf"
const DAY_MS = 24 * 60 * 60 * 1000

async function stalledFetch(_url, { signal }) {
  return await new Promise((_resolve, reject) => {
    const keepAlive = setTimeout(() => {}, 100)
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(keepAlive)
        reject(signal.reason)
      },
      { once: true }
    )
  })
}

test("generates a PDF when Sanity has no stored asset", () => {
  assert.deepEqual(selectResumePdfSource({}, NOW_MS), { kind: "generate" })
})

test("generates a PDF when the stored asset has no generation timestamp", () => {
  assert.deepEqual(selectResumePdfSource({ url: PDF_URL }, NOW_MS), { kind: "generate" })
})

test("reuses the Sanity PDF while it is younger than 24 hours", () => {
  const generatedAt = new Date(NOW_MS - DAY_MS + 1).toISOString()

  assert.deepEqual(selectResumePdfSource({ url: PDF_URL, generatedAt }, NOW_MS), {
    kind: "sanity",
    url: PDF_URL
  })
})

test("regenerates the PDF when it reaches the 24 hour TTL", () => {
  const generatedAt = new Date(NOW_MS - DAY_MS).toISOString()

  assert.deepEqual(selectResumePdfSource({ url: PDF_URL, generatedAt }, NOW_MS), { kind: "generate" })
})

test("regenerates the PDF when the stored timestamp is invalid", () => {
  assert.deepEqual(selectResumePdfSource({ url: PDF_URL, generatedAt: "not-a-date" }, NOW_MS), {
    kind: "generate"
  })
})

test("regenerates the PDF when the stored timestamp is in the future", () => {
  const generatedAt = new Date(NOW_MS + 60_000).toISOString()

  assert.deepEqual(selectResumePdfSource({ url: PDF_URL, generatedAt }, NOW_MS), { kind: "generate" })
})

test("returns the PDF as an automatic file download", async () => {
  assert.equal(
    typeof resumePdf.createPdfDownloadResponse,
    "function",
    "the PDF route needs a download response builder"
  )

  const bytes = new Uint8Array([0x25, 0x50, 0x44, 0x46])
  const response = resumePdf.createPdfDownloadResponse(bytes, "sanity")

  assert.equal(response.headers.get("content-type"), "application/pdf")
  assert.match(response.headers.get("content-disposition"), /^attachment;/)
  assert.equal(response.headers.get("cache-control"), "no-store")
  assert.equal(response.headers.get("x-resume-pdf-source"), "sanity")
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), bytes)
})

test("resolves a fresh PDF from Sanity", async () => {
  assert.equal(typeof resumePdf.resolveResumePdf, "function", "the route needs a PDF source orchestrator")

  const cachedBytes = new Uint8Array([1, 2, 3])
  const generatedBytes = new Uint8Array([4, 5, 6])
  const generatedAt = new Date(NOW_MS - 1000).toISOString()

  const result = await resumePdf.resolveResumePdf({ url: PDF_URL, generatedAt }, NOW_MS, {
    loadSanityPdf: async () => cachedBytes,
    generatePdf: async () => generatedBytes
  })

  assert.equal(result.source, "sanity")
  assert.deepEqual(result.pdfBytes, cachedBytes)
})

test("resolves an expired PDF through generation", async () => {
  const cachedBytes = new Uint8Array([1, 2, 3])
  const generatedBytes = new Uint8Array([4, 5, 6])
  const generatedAt = new Date(NOW_MS - DAY_MS).toISOString()

  const result = await resumePdf.resolveResumePdf({ url: PDF_URL, generatedAt }, NOW_MS, {
    loadSanityPdf: async () => cachedBytes,
    generatePdf: async () => generatedBytes
  })

  assert.equal(result.source, "generated")
  assert.deepEqual(result.pdfBytes, generatedBytes)
})

test("falls back to generation when the stored Sanity PDF is unavailable", async () => {
  const generatedBytes = new Uint8Array([4, 5, 6])
  const generatedAt = new Date(NOW_MS - 1000).toISOString()

  const result = await resumePdf.resolveResumePdf({ url: PDF_URL, generatedAt }, NOW_MS, {
    loadSanityPdf: async () => {
      throw new Error("CDN unavailable")
    },
    generatePdf: async () => generatedBytes
  })

  assert.equal(result.source, "generated")
  assert.deepEqual(result.pdfBytes, generatedBytes)
})

test("aborts a stalled Sanity PDF fetch within its own timeout budget", async () => {
  assert.equal(typeof resumePdf.fetchStoredPdf, "function", "stored PDF retrieval needs a bounded timeout")

  await assert.rejects(resumePdf.fetchStoredPdf(PDF_URL, stalledFetch, 5), {
    name: "TimeoutError"
  })
})
