import { revalidatePath, revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { getContentRevalidationPlan } from "@/sanity/lib/cache-tags"
import { getPublishedSanityWebhookDocument } from "@/lib/sanity-webhook"

/* eslint-disable no-console -- webhook revalidation needs production diagnostics */

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  const token = authHeader?.replace("Bearer ", "")

  if (!token || token !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid or missing authorization token" }, { status: 401 })
  }

  try {
    const document = getPublishedSanityWebhookDocument(await request.json().catch(() => null))
    if (!document) {
      return NextResponse.json({ message: "Invalid content webhook payload" }, { status: 400 })
    }

    const plan = getContentRevalidationPlan(document.type)
    if (!plan) {
      return NextResponse.json({ message: "Unsupported content webhook document type" }, { status: 400 })
    }

    for (const tag of plan.tags) {
      revalidateTag(tag)
    }
    for (const path of plan.paths) {
      revalidatePath(path)
    }

    console.log("[Content Revalidate] Revalidated content", { document, ...plan })

    return NextResponse.json({
      revalidated: true,
      document,
      ...plan
    })
  } catch (error) {
    console.error("[Content Revalidate] Error revalidating content", error)
    return NextResponse.json(
      {
        message: "Error revalidating content",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
