import assert from "node:assert/strict"
import test from "node:test"

test("selects the exact published Resume Page id from a webhook payload", async () => {
  const webhook = await import("./sanity-webhook.ts")
  assert.equal(typeof webhook.getPublishedResumePageId, "function")

  assert.equal(
    webhook.getPublishedResumePageId({ _id: "resumePage-singleton", _type: "resumePage" }),
    "resumePage-singleton"
  )
})

test("rejects draft and version Resume Page ids", async () => {
  const { getPublishedResumePageId } = await import("./sanity-webhook.ts")

  assert.equal(getPublishedResumePageId({ _id: "drafts.resumePage-singleton", _type: "resumePage" }), null)
  assert.equal(getPublishedResumePageId({ _id: "versions.release.resumePage-singleton", _type: "resumePage" }), null)
})

test("rejects webhook payloads for other document types", async () => {
  const { getPublishedResumePageId } = await import("./sanity-webhook.ts")

  assert.equal(getPublishedResumePageId({ _id: "experience-1", _type: "experience" }), null)
  assert.equal(getPublishedResumePageId(null), null)
})
