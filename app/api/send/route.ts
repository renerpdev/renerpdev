import { EmailTemplate } from "@/components/email-template"
import { Resend } from "resend"
import * as React from "react"

export const revalidate = 0 // disables cache revalidation

const resend = new Resend(process.env.RESEND_API_KEY)
const emailRecipient = process.env.EMAIL_RECIPIENT

type DataType = {
  name: "string"
  description: "string"
  email: "string"
  topics: Array<string>
}

export async function POST(request: Request) {
  const { description, email, topics, name }: DataType = await request.json()

  try {
    const { data, error } = await resend.emails.send({
      from: "Onboarding <onboarding@resend.dev>",
      to: [`${emailRecipient}`],
      subject: `Potential New Client: ${name} <${email}>`,
      react: EmailTemplate({ description, topics, email, name }) as React.ReactElement
    })

    if (error) {
      return Response.json({ error })
    }

    return Response.json({ data })
  } catch (error) {
    return Response.json({ error })
  }
}
