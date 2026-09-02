import { createClient } from "@sanity/client"

import { getTestimonialProfileImageMigrationPatch } from "../sanity/lib/testimonial-profile-image.ts"

/* eslint-disable no-console -- this migration reports its terminal result */

const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, NEXT_PUBLIC_SANITY_DATASET: dataset } = process.env
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-02-10"
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_WRITE_TOKEN are required")
}

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  token,
  useCdn: false
})

const testimonials = await client.fetch(
  `*[_type == "testimonial" && profileImage._type == "reference"]{
    _id,
    _rev,
    "legacyMedia": profileImage->{image}
  }`
)

const patches = testimonials.flatMap((testimonial) => {
  const patch = getTestimonialProfileImageMigrationPatch(testimonial)
  return patch ? [patch] : []
})

if (patches.length === 0) {
  console.log("No legacy testimonial profile images to migrate")
} else {
  await client.mutate(patches)
  console.log(`Migrated ${patches.length} testimonial profile image${patches.length === 1 ? "" : "s"}`)
}
