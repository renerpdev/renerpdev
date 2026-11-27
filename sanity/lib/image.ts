import type { ImageLoaderProps } from "next/image"

const assetPrefix = `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/`

export function sanityImageUrl(src: string | undefined, width: number, quality = 75) {
  if (!src) return

  let url: URL
  try {
    url = new URL(src)
  } catch {
    return
  }
  if (
    url.origin !== "https://cdn.sanity.io" ||
    url.username ||
    url.password ||
    !url.pathname.startsWith(assetPrefix) ||
    !/^[\w-]+\.[a-z\d]+$/i.test(url.pathname.slice(assetPrefix.length))
  ) {
    return
  }

  if (url.pathname.toLowerCase().endsWith(".svg")) return url.href

  const baseWidth = Number(url.searchParams.get("w"))
  const baseHeight = Number(url.searchParams.get("h"))
  if (baseWidth > 0 && baseHeight > 0) {
    url.searchParams.set("h", String(Math.max(1, Math.round((width * baseHeight) / baseWidth))))
  } else {
    url.searchParams.set("fit", "max")
  }
  url.searchParams.set("w", String(width))
  url.searchParams.set("q", String(quality))
  url.searchParams.set("auto", "format")
  return url.href
}

export default function sanityImageLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.startsWith("/") && !src.startsWith("//")) return src

  const url = sanityImageUrl(src, width, quality)
  if (!url) throw new Error("Expected an image from the configured Sanity project and dataset")
  return url
}
