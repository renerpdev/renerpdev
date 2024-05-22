"use server"

import { Resend } from "resend"
import { EmailTemplate } from "@/components"
import { logger } from "@/logger"
import { ReactElement } from "react"

const resend = new Resend(process.env.RESEND_API_KEY)
const emailRecipient = process.env.EMAIL_RECIPIENT

export type DataType = {
  name: string
  message: string
  email: string
  topics: Array<string>
}

export async function sendEmail(content: DataType | string, customSubject?: string) {
  let subject = "",
    react,
    text = ""

  try {
    if (typeof content === "string") {
      text = content as string
    } else {
      const { message: description, email, topics, name } = content as DataType
      react = EmailTemplate({ description, topics, email, name }) as ReactElement
      subject = `Potential New Client: ${name} <${email}>`
    }

    const { data, error } = await resend.emails.send({
      from: "Onboarding <onboarding@resend.dev>",
      to: [`${emailRecipient}`],
      subject: customSubject || subject,
      react,
      text
    })

    if (error) {
      throw error
    }

    logger.log("Email sent successfully!", data)
  } catch (error) {
    logger.error(error)
  }
}
