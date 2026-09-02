import assert from "node:assert/strict"
import test from "node:test"

test("downloads a PDF blob and releases its browser resources", async () => {
  const browserDownload = await import("./browser-download.ts")
  assert.equal(typeof browserDownload.downloadBlob, "function", "the client needs a browser download helper")

  const events = []
  const blob = new Blob([new Uint8Array([0x25, 0x50, 0x44, 0x46])], { type: "application/pdf" })
  const anchor = {
    href: "",
    download: "",
    hidden: false,
    click() {
      events.push("click")
    },
    remove() {
      events.push("remove")
    }
  }

  browserDownload.downloadBlob(blob, "resume.pdf", {
    createObjectUrl(receivedBlob) {
      assert.equal(receivedBlob, blob)
      events.push("create")
      return "blob:resume"
    },
    createAnchor() {
      return anchor
    },
    appendAnchor(receivedAnchor) {
      assert.equal(receivedAnchor, anchor)
      events.push("append")
    },
    scheduleRevoke(url) {
      assert.equal(url, "blob:resume")
      events.push("revoke")
    }
  })

  assert.equal(anchor.href, "blob:resume")
  assert.equal(anchor.download, "resume.pdf")
  assert.equal(anchor.hidden, true)
  assert.deepEqual(events, ["create", "append", "click", "remove", "revoke"])
})
