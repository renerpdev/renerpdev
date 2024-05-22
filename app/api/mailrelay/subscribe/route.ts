import { headers } from "next/headers"
import { sendEmail } from "@/lib/actions"

enum UserStatus {
  ACTIVE = "active"
}

enum UserGroup {
  CLIENTS = 2,
  PROVIDERS = 3
}

export async function POST(request: Request) {
  const webhookSecretKey = process.env.WEBHOOK_KEY

  // Ensure secret key is provided in the request headers
  const headersList = headers()
  const providedSecretKey = headersList.get("secret")

  if (!webhookSecretKey || !providedSecretKey || providedSecretKey !== webhookSecretKey) {
    return new Response("Invalid secret key", {
      status: 403
    })
  }

  const payload = await request.json()

  if (!payload || !payload.form) {
    return new Response("Invalid payload", {
      status: 400
    })
  }

  const groupId = payload.form.url.includes("proveedores") ? UserGroup.PROVIDERS : UserGroup.CLIENTS
  const emailQuestionId =
    groupId === UserGroup.PROVIDERS ? process.env.PROVIDER_EMAIL_QUESTION_ID : process.env.CLIENT_EMAIL_QUESTION_ID
  const email = payload.answer.answers.find((answer: any) => answer.q === emailQuestionId)?.t

  if (!email) {
    return new Response("", {
      status: 204
    })
  }

  const mailRelayApiKey = process.env.MAIL_RELAY_API_KEY || ""
  const mailRelayApiUrl = process.env.MAIL_RELAY_API_URL || ""
  const response = await fetch(`${mailRelayApiUrl}/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": mailRelayApiKey
    },
    body: JSON.stringify({
      status: UserStatus.ACTIVE,
      email: email,
      group_ids: [groupId]
    })
  })

  if (!response.ok) {
    return new Response(response.statusText, {
      status: response.status
    })
  }

  const groupName = Object.keys(UserGroup).find((key) => UserGroup[key as keyof typeof UserGroup] === groupId)
  const message = `New subscriber added to group ${groupName}!`

  await sendEmail(message, "New subscriber!")

  return new Response(message, { status: 201 })
}
