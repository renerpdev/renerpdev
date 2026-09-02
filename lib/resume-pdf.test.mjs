import assert from "node:assert/strict"
import test from "node:test"

import * as resumePdf from "./resume-pdf.ts"

const { RESUME_PDF_TTL_MS, selectResumePdfSource } = resumePdf

const NOW_MS = Date.parse("2026-09-02T02:30:00.000Z")
const PDF_URL = "https://cdn.sanity.io/files/project/production/resume.pdf"

test("generates a PDF when Sanity has no stored asset", () => {
  assert.deepEqual(selectResumePdfSource({}, NOW_MS), { kind: "generate" })
})

test("generates a PDF when the stored asset has no generation timestamp", () => {
  assert.deepEqual(selectResumePdfSource({ url: PDF_URL }, NOW_MS), { kind: "generate" })
})

test("reuses the Sanity PDF while it is younger than 30 minutes", () => {
  const generatedAt = new Date(NOW_MS - RESUME_PDF_TTL_MS + 1).toISOString()

  assert.deepEqual(selectResumePdfSource({ url: PDF_URL, generatedAt }, NOW_MS), {
    kind: "sanity",
    url: PDF_URL
  })
})

test("regenerates the PDF when it reaches the 30 minute TTL", () => {
  const generatedAt = new Date(NOW_MS - RESUME_PDF_TTL_MS).toISOString()

  assert.deepEqual(selectResumePdfSource({ url: PDF_URL, generatedAt }, NOW_MS), { kind: "generate" })
})

test("regenerates the PDF when the stored timestamp is invalid", () => {
  assert.deepEqual(selectResumePdfSource({ url: PDF_URL, generatedAt: "not-a-date" }, NOW_MS), {
    kind: "generate"
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
