import assert from "node:assert/strict"
import test from "node:test"
import worker from "./index.ts"

const origin = "https://portfolio.example"
const env = {
  ASSETS: {
    async fetch(input) {
      const url = new URL(input.url ?? input)
      return url.pathname === "/studio" ? new Response("Studio") : new Response("Not found", { status: 404 })
    }
  }
}

function get(path) {
  return new Request(origin + path, { headers: { Accept: "text/html" } })
}

test("returns 404 for retired API endpoints", async () => {
  const contact = await worker.fetch(new Request(origin + "/api/contact", { method: "POST" }), env)
  const mailrelay = await worker.fetch(new Request(origin + "/api/mailrelay/subscribe", { method: "POST" }), env)
  assert.equal(contact.status, 404)
  assert.equal(mailrelay.status, 404)
})

test("serves the Studio shell on a deep link and keeps unrelated paths at 404", async () => {
  const deepLink = await worker.fetch(get("/studio/structure/hero"), env)
  const missing = await worker.fetch(get("/unknown"), env)
  assert.equal(await deepLink.text(), "Studio")
  assert.equal(missing.status, 404)
})
