import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { clearResumePdf } from "@/sanity/lib/mutations"

/**
 * On-Demand Revalidation API Route
 *
 * This endpoint is called by Sanity webhooks to trigger revalidation
 * whenever content is updated in the CMS. It also clears the cached
 * resume PDF reference so it gets regenerated on the next download.
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
 * - Trigger: Create, Update, Delete
 */
export async function POST(request: NextRequest) {
  // Verify the request is from Sanity using a secret token
  const authHeader = request.headers.get("authorization")
  const token = authHeader?.replace("Bearer ", "")

  if (!token || token !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid or missing authorization token" }, { status: 401 })
  }

  try {
    console.log("[Revalidate] Starting revalidation at", new Date().toISOString())

    // Revalidate all Sanity data fetches
    revalidateTag("sanity-content")

    // Clear the cached resume PDF so it gets regenerated on next download
    await clearResumePdf()

    console.log("[Revalidate] Successfully revalidated sanity-content tag and cleared resume PDF cache")

    return NextResponse.json({
      revalidated: true,
      message: "Sanity content revalidated and resume PDF cache cleared successfully",
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
