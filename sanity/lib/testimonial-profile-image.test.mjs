import assert from "node:assert/strict"
import test from "node:test"

const profileImage = await import("./testimonial-profile-image.ts").catch(() => ({}))

test("copies a legacy Media Library image into a direct testimonial image field", () => {
  assert.equal(typeof profileImage.getDirectTestimonialProfileImage, "function")

  const image = {
    _type: "image",
    asset: { _ref: "image-abc-400x400-png", _type: "reference" },
    crop: { _type: "sanity.imageCrop", top: 0.1, bottom: 0.1, left: 0, right: 0 },
    hotspot: { _type: "sanity.imageHotspot", x: 0.5, y: 0.5, height: 1, width: 1 }
  }

  assert.deepEqual(profileImage.getDirectTestimonialProfileImage({ image }), image)
})

test("skips legacy media documents without an image", () => {
  assert.equal(profileImage.getDirectTestimonialProfileImage(null), null)
  assert.equal(profileImage.getDirectTestimonialProfileImage({}), null)
})

test("creates a revision-guarded patch for a legacy testimonial image", () => {
  assert.equal(typeof profileImage.getTestimonialProfileImageMigrationPatch, "function")

  const image = {
    _type: "image",
    asset: { _ref: "image-abc-400x400-png", _type: "reference" }
  }

  assert.deepEqual(
    profileImage.getTestimonialProfileImageMigrationPatch({
      _id: "testimonial-1",
      _rev: "revision-1",
      legacyMedia: { image }
    }),
    {
      patch: {
        id: "testimonial-1",
        ifRevisionID: "revision-1",
        set: { profileImage: image }
      }
    }
  )
})

test("skips direct or concurrently changed testimonial images", () => {
  assert.equal(
    profileImage.getTestimonialProfileImageMigrationPatch({
      _id: "testimonial-1",
      _rev: "revision-1",
      legacyMedia: null
    }),
    null
  )
  assert.equal(
    profileImage.getTestimonialProfileImageMigrationPatch({
      _id: "testimonial-1",
      legacyMedia: { image: { _type: "image", asset: {} } }
    }),
    null
  )
})
