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
  const headersList = await headers()
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
  const emailQuestionId = payload.form.questions?.find((question: any) => question.questionType === "email")?._id
  const email = payload.answer.answers.find((answer: any) => answer.q === emailQuestionId)?.t

  if (email) {
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
  }

  const groupName = Object.keys(UserGroup).find((key) => UserGroup[key as keyof typeof UserGroup] === groupId)
  const title = email ? "AlaOrden - New Subscriber" : "AlaOrden - New Feedback"
  const message = email ? `New subscriber added to group ${groupName} with email ${email}!` : ""

  await sendEmail(message, title)

  return new Response(message, { status: 201 })
}
