import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { getPublishedResumePageId } from "@/lib/sanity-webhook"
import { clearResumePdf } from "@/sanity/lib/mutations"

/* eslint-disable no-console -- webhook revalidation needs production diagnostics */

/**
 * On-Demand Revalidation API Route
 *
 * This endpoint is called by Sanity webhooks to trigger revalidation
 * whenever the Resume Page content is updated. The webhook filter excludes
 * the generated PDF tracking fields so upload and invalidation do not loop.
 *
 * Setup:
 * 1. Set SANITY_REVALIDATE_SECRET in your environment variables
 * 2. Configure Sanity webhook to POST to this endpoint
 * 3. Add Authorization header: Bearer <SANITY_REVALIDATE_SECRET>
 *
 * Example webhook configuration:
 * - URL: https://your-domain.com/api/revalidate
 * - Method: POST
 * - Headers: { "Authorization": "Bearer your_secret_token" }
 * - Trigger: Update
 * - Filter: _type == "resumePage" && !delta::changedOnly((currentPdf, pdfGeneratedAt))
 */
export async function POST(request: NextRequest) {
  // Verify the request is from Sanity using a secret token
  const authHeader = request.headers.get("authorization")
  const token = authHeader?.replace("Bearer ", "")

  if (!token || token !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid or missing authorization token" }, { status: 401 })
  }

  try {
    const resumePageId = getPublishedResumePageId(await request.json().catch(() => null))
    if (!resumePageId) {
      return NextResponse.json({ message: "Invalid Resume Page webhook payload" }, { status: 400 })
    }

    console.log("[Revalidate] Starting revalidation at", new Date().toISOString())

    // Revalidate all Sanity data fetches
    revalidateTag("sanity-content")

    await clearResumePdf(resumePageId)

    console.log("[Revalidate] Successfully revalidated content and cleared the generated resume PDF")

    return NextResponse.json({
      revalidated: true,
      message: "Sanity content revalidated and generated resume PDF cleared successfully",
      timestamp: new Date().toISOString(),
      tags: ["sanity-content"]
    })
  } catch (error) {
    console.error("[Revalidate] Error revalidating:", error)
    return NextResponse.json(
      {
        message: "Error revalidating content",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
