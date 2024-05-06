"use server"

import { Resend } from "resend"
import { EmailTemplate } from "@/components"
import { ReactElement } from "react"
import { logger } from "@/logger"

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

    logger.log("Email sent successfully!", data)
  } catch (error) {
    logger.error(error)
  }
}
