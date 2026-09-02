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
