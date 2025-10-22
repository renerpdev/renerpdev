import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

/**
 * On-Demand Revalidation API Route
 *
 * This endpoint is called by Sanity webhooks to trigger revalidation
 * of the home page whenever content is updated in the CMS.
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
    return NextResponse.json(
      { message: "Invalid or missing authorization token" },
      { status: 401 }
    )
  }

  try {
    // Revalidate the home page
    // This will regenerate the static page on the next request
    revalidatePath("/", "page")

    return NextResponse.json({
      revalidated: true,
      message: "Home page revalidated successfully",
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("Error revalidating:", error)
    return NextResponse.json(
      {
        message: "Error revalidating page",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
