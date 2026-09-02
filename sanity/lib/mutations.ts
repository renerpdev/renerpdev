import { createClient } from "next-sanity"
import { apiVersion, dataset, projectId } from "../env"

// Write-enabled Sanity client (requires SANITY_API_WRITE_TOKEN)
const writeClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN
})

export async function uploadPdfToSanity(
  pdfBuffer: Buffer,
  resumePageId: string
): Promise<{ url: string; generatedAt: string }> {
  const now = new Date().toISOString()
  const filename = `resume-${Date.now()}.pdf`

  // 1. Upload the file asset to Sanity
  const asset = await writeClient.assets.upload("file", pdfBuffer, {
    filename,
    contentType: "application/pdf"
  })

  // 2. Check if a media document for generated resume already exists
  const existingMedia = await writeClient.fetch<{ _id: string } | null>(
    `*[_type == "media" && category == "resume" && title == "Generated Resume"][0]{ _id }`
  )

  let mediaDocId: string

  if (existingMedia) {
    // Update existing media document with new asset
    await writeClient
      .patch(existingMedia._id)
      .set({
        file: { asset: { _type: "reference", _ref: asset._id } },
        description: `Auto-generated resume PDF - ${now}`
      })
      .commit()
    mediaDocId = existingMedia._id
  } else {
    // Create new media document
    const mediaDoc = await writeClient.create({
      _type: "media",
      title: "Generated Resume",
      description: `Auto-generated resume PDF - ${now}`,
      category: "resume",
      file: { asset: { _type: "reference", _ref: asset._id } }
    })
    mediaDocId = mediaDoc._id
  }

  // 3. Update the resumePage singleton to point to this PDF
  await writeClient
    .patch(resumePageId)
    .set({
      currentPdf: { _type: "reference", _ref: mediaDocId },
      pdfGeneratedAt: now
    })
    .commit()

  return {
    url: asset.url,
    generatedAt: now
  }
}

export async function clearResumePdf(): Promise<void> {
  const resumePage = await writeClient.fetch<{ _id: string } | null>(`*[_type == "resumePage"][0]{ _id }`)
  if (resumePage) {
    await writeClient.patch(resumePage._id).unset(["currentPdf", "pdfGeneratedAt"]).commit()
  }
}
