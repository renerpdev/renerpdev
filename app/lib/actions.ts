"use server"

import { Resend } from "resend"
import EmailTemplate from "@/components/email-template"
import { ReactElement } from "react"

const resend = new Resend(process.env.RESEND_API_KEY)
const emailRecipient = process.env.EMAIL_RECIPIENT

export type DataType = {
  name: string
  message: string
  email: string
  topics: Array<string>
}

export async function sendEmail(data: DataType) {
  const { message, email, topics, name } = data

  try {
    const { data, error } = await resend.emails.send({
      from: "Onboarding <onboarding@resend.dev>",
      to: [`${emailRecipient}`],
      subject: `Potential New Client: ${name} <${email}>`,
      react: EmailTemplate({ description: message, topics, email, name }) as ReactElement
    })

    if (error) {
      throw error
    }

    console.log("Email sent successfully!", data)
  } catch (error) {
    console.error(error)
  }
}
