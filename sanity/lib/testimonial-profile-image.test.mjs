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

test("moves a current direct image into the new Profile Photo field", () => {
  assert.equal(typeof profileImage.getTestimonialProfilePhotoMigrationPatch, "function")

  const image = {
    _type: "image",
    asset: { _ref: "image-abc-400x400-png", _type: "reference" }
  }

  assert.deepEqual(
    profileImage.getTestimonialProfilePhotoMigrationPatch({
      _id: "testimonial-1",
      _rev: "revision-1",
      currentImage: image
    }),
    {
      patch: {
        id: "testimonial-1",
        ifRevisionID: "revision-1",
        set: { profilePhoto: image }
      }
    }
  )
})

test("does not overwrite an existing Profile Photo", () => {
  assert.equal(
    profileImage.getTestimonialProfilePhotoMigrationPatch({
      _id: "testimonial-1",
      _rev: "revision-1",
      currentImage: { _type: "image", asset: {} },
      profilePhoto: { _type: "image", asset: {} }
    }),
    null
  )
})
