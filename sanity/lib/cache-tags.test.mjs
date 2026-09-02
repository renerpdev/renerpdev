import assert from "node:assert/strict"
import test from "node:test"

const cacheTags = await import("./cache-tags.ts").catch(() => ({}))

test("maps shared Experience content to the Experience cache tag", () => {
  assert.equal(typeof cacheTags.getContentRevalidationTags, "function")

  assert.deepEqual(cacheTags.getContentRevalidationTags("experienceSection"), ["sanity:experience"])
  assert.deepEqual(cacheTags.getContentRevalidationTags("experience"), ["sanity:experience"])
})

test("maps shared Project and Tag content to every affected section", () => {
  assert.equal(cacheTags.getContentRevalidationTags("projectSection"), null)
  assert.deepEqual(cacheTags.getContentRevalidationTags("projectsSection"), ["sanity:projects"])
  assert.deepEqual(cacheTags.getContentRevalidationTags("project"), ["sanity:projects"])
  assert.deepEqual(cacheTags.getContentRevalidationTags("tag"), ["sanity:experience", "sanity:projects"])
})

test("keeps Resume Page out of generic content revalidation", () => {
  assert.equal(cacheTags.getContentRevalidationTags("resumePage"), null)
  assert.equal(cacheTags.getContentRevalidationTags("unknown"), null)
})

test("keeps media changes separate from generated resume assets", () => {
  assert.deepEqual(cacheTags.getContentRevalidationTags("media"), ["sanity:media"])
})

test("revalidates every rendered route affected by shared content", () => {
  assert.equal(typeof cacheTags.getContentRevalidationPaths, "function")

  assert.deepEqual(cacheTags.getContentRevalidationPaths("hero"), ["/"])
  assert.deepEqual(cacheTags.getContentRevalidationPaths("experience"), ["/", "/resume"])
  assert.deepEqual(cacheTags.getContentRevalidationPaths("education"), ["/resume"])
})
