import assert from "node:assert/strict"
import test from "node:test"

import * as resumePdf from "./resume-pdf.ts"

const { selectResumePdfSource } = resumePdf

const PDF_URL = "https://cdn.sanity.io/files/project/production/resume.pdf"

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
  assert.deepEqual(selectResumePdfSource({}), { kind: "generate" })
})

test("reuses the stored Sanity PDF indefinitely", () => {
  assert.deepEqual(selectResumePdfSource({ url: PDF_URL }), {
    kind: "sanity",
    url: PDF_URL
  })
})

test("ignores legacy generation timestamps when a stored PDF exists", () => {
  assert.deepEqual(selectResumePdfSource({ url: PDF_URL, generatedAt: "2000-01-01T00:00:00.000Z" }), {
    kind: "sanity",
    url: PDF_URL
  })
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

test("resolves a stored PDF from Sanity", async () => {
  assert.equal(typeof resumePdf.resolveResumePdf, "function", "the route needs a PDF source orchestrator")

  const cachedBytes = new Uint8Array([1, 2, 3])
  const generatedBytes = new Uint8Array([4, 5, 6])

  const result = await resumePdf.resolveResumePdf(
    { url: PDF_URL },
    {
      loadSanityPdf: async () => cachedBytes,
      generatePdf: async () => generatedBytes
    }
  )

  assert.equal(result.source, "sanity")
  assert.deepEqual(result.pdfBytes, cachedBytes)
})

test("resolves a missing PDF through generation", async () => {
  const generatedBytes = new Uint8Array([4, 5, 6])

  const result = await resumePdf.resolveResumePdf(
    {},
    {
      loadSanityPdf: async () => new Uint8Array([1, 2, 3]),
      generatePdf: async () => generatedBytes
    }
  )

  assert.equal(result.source, "generated")
  assert.deepEqual(result.pdfBytes, generatedBytes)
})

test("falls back to generation when the stored Sanity PDF is unavailable", async () => {
  const generatedBytes = new Uint8Array([4, 5, 6])

  const result = await resumePdf.resolveResumePdf(
    { url: PDF_URL },
    {
      loadSanityPdf: async () => {
        throw new Error("CDN unavailable")
      },
      generatePdf: async () => generatedBytes
    }
  )

  assert.equal(result.source, "generated")
  assert.deepEqual(result.pdfBytes, generatedBytes)
})

test("aborts a stalled Sanity PDF fetch within its own timeout budget", async () => {
  assert.equal(typeof resumePdf.fetchStoredPdf, "function", "stored PDF retrieval needs a bounded timeout")

  await assert.rejects(resumePdf.fetchStoredPdf(PDF_URL, stalledFetch, 5), {
    name: "TimeoutError"
  })
})
