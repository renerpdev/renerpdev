import { headers } from "next/headers"

// enum UserStatus {
//   ACTIVE = "active"
// }
// enum UserGroup {
//   CLIENTS = 2,
//   PROVIDERS = 3
// }

// type Payload = {
//   status: UserStatus
//   email: string
//   group_ids: UserGroup[]
// }

export async function POST(request: Request) {
  const webhookSecretKey = process.env.MAIL_RELAY_WEBHOOK_KEY

  // Ensure secret key is provided in the request headers
  const headersList = headers()
  console.log("*** headersList ***", request.headers)
  const providedSecretKey = headersList.get("secret")

  if (!webhookSecretKey || !providedSecretKey || providedSecretKey !== webhookSecretKey) {
    return new Response("Invalid secret key", {
      status: 403
    })
  }

  const payload = await request.json()

  console.log("*** payload ***", payload)

  if (!payload) {
    return new Response("Invalid payload", {
      status: 400
    })
  }

  // await fetch("https://renerp.ipzmarketing.com/api/v1/subscribers", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: {
  //     status: UserStatus.ACTIVE,
  //     email: payload.email,
  //     group_ids: [UserGroup.CLIENTS]
  //   } as Payload as any
  // })

  return new Response("New subscriber added", { status: 200 })
}
