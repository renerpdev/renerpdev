import assert from "node:assert/strict"
import test from "node:test"

process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "portfolio"
process.env.NEXT_PUBLIC_SANITY_DATASET = "production"

const { default: imageLoader, sanityImageUrl } = await import("./image.ts")
const src = "https://cdn.sanity.io/images/portfolio/production/test-1600x1200.jpg?rect=40,20,1200,900&w=1200&h=900"

test("requests a smaller Sanity variant while preserving crop and aspect ratio", () => {
  const url = new URL(imageLoader({ src, width: 480, quality: 72 }))

  assert.equal(url.searchParams.get("rect"), "40,20,1200,900")
  assert.equal(url.searchParams.get("w"), "480")
  assert.equal(url.searchParams.get("h"), "360")
  assert.equal(url.searchParams.get("q"), "72")
  assert.equal(url.searchParams.get("auto"), "format")
})

test("keeps SVGs and local assets intact and ignores untrusted CMS backgrounds", () => {
  const svg = "https://cdn.sanity.io/images/portfolio/production/logo-40x40.svg"
  assert.equal(sanityImageUrl(svg, 40), svg)
  assert.equal(imageLoader({ src: "/assets/arrow.svg", width: 32 }), "/assets/arrow.svg")
  assert.equal(sanityImageUrl(src.replace("/production/", "/other/"), 420), undefined)
  assert.equal(sanityImageUrl(src.replace("cdn.sanity.io", "example.com"), 420), undefined)
})
