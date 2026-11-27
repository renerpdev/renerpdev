import assert from "node:assert/strict"
import test from "node:test"
import worker from "./index.ts"

const origin = "https://portfolio.example"
const env = {
  RESEND_API_KEY: "test-token",
  EMAIL_RECIPIENT: "recipient@example.com",
  WEBHOOK_KEY: "webhook-secret",
  MAIL_RELAY_API_URL: "https://mailrelay.example/api",
  MAIL_RELAY_API_KEY: "mailrelay-token",
  CONTACT_RATE_LIMITER: {
    async limit() {
      return { success: true }
    }
  },
  ASSETS: {
    async fetch(input) {
      const url = new URL(input.url ?? input)
      return url.pathname === "/studio" ? new Response("Studio") : new Response("Not found", { status: 404 })
    }
  }
}

function post(path, body, headers = {}) {
  return new Request(origin + path, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body)
  })
}

function get(path) {
  return new Request(origin + path, { headers: { Accept: "text/html" } })
}

test("contact reports success only after Resend accepts the message", async (t) => {
  const fetcher = t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 200 }))
  const body = { name: "Visitor", email: "visitor@example.com", message: "Hello", topics: "Web development" }
  const send = () => worker.fetch(post("/api/contact", body, { Origin: origin }), env)

  const success = await send()
  assert.equal(success.status, 200)
  const [url, options] = fetcher.mock.calls[0].arguments
  assert.equal(url, "https://api.resend.com/emails")
  assert.equal(JSON.parse(options.body).reply_to, body.email)

  fetcher.mock.mockImplementation(async () => new Response(null, { status: 422 }))
  const failure = await send()
  assert.equal(failure.status, 502)
})

test("contact rejects a cross-origin submission and an incomplete message", async () => {
  const crossOrigin = await worker.fetch(post("/api/contact", {}), env)
  const incomplete = await worker.fetch(post("/api/contact", {}, { Origin: origin }), env)
  assert.equal(crossOrigin.status, 403)
  assert.equal(incomplete.status, 400)
})

test("Mailrelay preserves callback authentication and the provider group", async (t) => {
  const fetcher = t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 200 }))
  const body = {
    form: { url: "/proveedores", questions: [{ _id: "email", questionType: "email" }] },
    answer: { answers: [{ q: "email", t: "provider@example.com" }] }
  }

  const unauthorized = await worker.fetch(post("/api/mailrelay/subscribe", body), env)
  assert.equal(unauthorized.status, 403)
  assert.equal(fetcher.mock.callCount(), 0)
  const subscribed = await worker.fetch(post("/api/mailrelay/subscribe", body, { secret: env.WEBHOOK_KEY }), env)
  assert.equal(subscribed.status, 201)
  const [url, options] = fetcher.mock.calls[0].arguments
  assert.equal(url, "https://mailrelay.example/api/subscribers")
  assert.deepEqual(JSON.parse(options.body).group_ids, [3])
})

test("serves the Studio shell on a deep link and keeps unrelated paths at 404", async () => {
  const deepLink = await worker.fetch(get("/studio/structure/hero"), env)
  const missing = await worker.fetch(get("/unknown"), env)
  assert.equal(await deepLink.text(), "Studio")
  assert.equal(missing.status, 404)
})
