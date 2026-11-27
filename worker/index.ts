/* global Env, ExportedHandler */

import { timingSafeEqual } from "node:crypto"

const RESEND_URL = "https://api.resend.com/emails"
const MAX_BODY_BYTES = 24 * 1024
const encoder = new TextEncoder()

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const pathname = url.pathname.replace(/\/$/, "")

    if (pathname === "/api/contact" || pathname === "/api/mailrelay/subscribe") {
      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } })
      }
      return pathname === "/api/contact" ? sendContact(request, env) : subscribe(request, env)
    }

    const asset = await env.ASSETS.fetch(request)
    if (
      asset.status === 404 &&
      url.pathname.startsWith("/studio/") &&
      (request.method === "GET" || request.method === "HEAD") &&
      request.headers.get("Accept")?.includes("text/html")
    ) {
      return env.ASSETS.fetch(new Request(new URL("/studio", url), request))
    }
    return asset
  }
} satisfies ExportedHandler<Env>

async function sendContact(request: Request, env: Env) {
  if (request.headers.get("Origin") !== new URL(request.url).origin) {
    return new Response("Invalid origin", { status: 403 })
  }

  const { success } = await env.CONTACT_RATE_LIMITER.limit({
    key: request.headers.get("CF-Connecting-IP") ?? "local"
  })
  if (!success) return new Response("Too many requests", { status: 429, headers: { "Retry-After": "60" } })

  const formSubmission = request.headers.get("Content-Type")?.startsWith("application/x-www-form-urlencoded")
  const body = await readBody(request, formSubmission)
  const name = boundedText(body?.name, 120)
  const email = boundedText(body?.email, 254)
  const message = boundedText(body?.message, 4000)
  const topic = boundedText(body?.topics, 240)
  if (!name || /[\r\n]/.test(name) || !email || !isEmail(email) || !message) {
    return new Response("Invalid contact information", { status: 400 })
  }

  const text = [`Name: ${name}`, `Email: ${email}`, topic ? `Topic: ${topic}` : "", "", message].join("\n")
  const sent = await sendEmail(env, `Potential New Client: ${name} <${email}>`, text, email)
  if (formSubmission) {
    return new Response(
      sent ? "Thank you for your interest. I will get back to you shortly." : "Your message could not be sent.",
      { status: sent ? 200 : 502 }
    )
  }
  return Response.json({ sent }, { status: sent ? 200 : 502 })
}

async function subscribe(request: Request, env: Env) {
  const secret = request.headers.get("secret")
  if (!secret || !env.WEBHOOK_KEY || !matchesSecret(secret, env.WEBHOOK_KEY)) {
    return new Response("Invalid secret key", { status: 403 })
  }

  const body = await readBody(request)
  const form = asRecord(body?.form)
  if (typeof form?.url !== "string") return new Response("Invalid payload", { status: 400 })

  const isProvider = form.url.includes("proveedores")
  const questions = Array.isArray(form.questions) ? form.questions : []
  const emailQuestion = questions
    .map((question) => asRecord(question))
    .find((question) => question?.questionType === "email")
  const answers = asRecord(body?.answer)?.answers
  const email =
    emailQuestion && Array.isArray(answers)
      ? boundedText(answers.map((answer) => asRecord(answer)).find((answer) => answer?.q === emailQuestion._id)?.t, 254)
      : undefined

  let message = ""
  if (email) {
    if (!isEmail(email)) return new Response("Invalid email", { status: 400 })

    try {
      const response = await fetch(`${env.MAIL_RELAY_API_URL.replace(/\/$/, "")}/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-AUTH-TOKEN": env.MAIL_RELAY_API_KEY },
        body: JSON.stringify({ status: "active", email, group_ids: [isProvider ? 3 : 2] }),
        signal: AbortSignal.timeout(10_000)
      })
      if (!response.ok) return new Response(response.statusText, { status: response.status })
    } catch {
      return new Response("Mailrelay unavailable", { status: 502 })
    }
    message = `New subscriber added to group ${isProvider ? "PROVIDERS" : "CLIENTS"} with email ${email}!`
  }

  const sent = await sendEmail(
    env,
    email ? "AlaOrden - New Subscriber" : "AlaOrden - New Feedback",
    message || "New feedback submitted."
  )
  return new Response(message, { status: sent || email ? 201 : 502 })
}

async function sendEmail(env: Env, subject: string, text: string, replyTo?: string) {
  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Onboarding <onboarding@resend.dev>",
        to: [env.EMAIL_RECIPIENT],
        subject,
        text,
        reply_to: replyTo
      }),
      signal: AbortSignal.timeout(10_000)
    })
    if (!response.ok) {
      // eslint-disable-next-line no-console -- record provider failures without message contents
      console.error("Resend rejected an email", { status: response.status })
    }
    return response.ok
  } catch {
    // eslint-disable-next-line no-console -- record the failure without message contents
    console.error("Resend could not be reached")
    return false
  }
}

async function readBody(request: Request, formSubmission = false) {
  const reader = request.body?.getReader()
  if (!reader) return

  const decoder = new TextDecoder()
  let size = 0
  let text = ""
  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) {
        text += decoder.decode()
        return formSubmission ? Object.fromEntries(new URLSearchParams(text)) : asRecord(JSON.parse(text))
      }
      size += value.byteLength
      if (size > MAX_BODY_BYTES) {
        await reader.cancel()
        return
      }
      text += decoder.decode(value, { stream: true })
    }
  } catch {
    return
  } finally {
    reader.releaseLock()
  }
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (value && typeof value === "object" && !Array.isArray(value)) return value as Record<string, unknown>
}

function boundedText(value: unknown, maximumLength: number) {
  if (typeof value === "string" && value.length <= maximumLength) return value.trim()
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function matchesSecret(provided: string, expected: string) {
  const left = encoder.encode(provided)
  const right = encoder.encode(expected)
  return left.byteLength === right.byteLength && timingSafeEqual(left, right)
}
