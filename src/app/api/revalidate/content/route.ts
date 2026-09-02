import { revalidatePath, revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { getContentRevalidationPaths, getContentRevalidationTags } from "@/sanity/lib/cache-tags"
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

    const tags = getContentRevalidationTags(document.type)
    const paths = getContentRevalidationPaths(document.type)
    if (!tags || !paths) {
      return NextResponse.json({ message: "Unsupported content webhook document type" }, { status: 400 })
    }

    for (const tag of tags) {
      revalidateTag(tag)
    }
    for (const path of paths) {
      revalidatePath(path)
    }

    console.log("[Content Revalidate] Revalidated content", { document, paths, tags })

    return NextResponse.json({
      revalidated: true,
      document,
      paths,
      tags
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
