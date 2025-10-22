"use client"

import React, { useState } from "react"
import { sendEmail } from "@/lib/actions"
import { useFormStatus } from "react-dom"
import { m } from "framer-motion"
import { type CursorAnimationHandler, useBreakpoint } from "@/hooks"
import { RocketIcon, Subtitle, Title } from "@/components"
import type { ContactSection } from "@/sanity/models"

interface ContactProps extends CursorAnimationHandler {
  contactSection: ContactSection | null
}

export const Contact = ({ setCursorText, setCursorVariant, contactSection }: ContactProps) => {
  const [dataSent, setDataSent] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    const { name, message, email, topics } = Object.fromEntries(formData) as Record<string, string>

    await sendEmail({
      name,
      message,
      email,
      topics: topics.split(",")
    })

    setDataSent(true)
  }

  if (!contactSection) {
    return null
  }

  return (
    <div className="flex justify-center items-center h-full w-full mx-auto max-w-2xl ">
      <div className="mx-auto w-full">
        {dataSent ? (
          <p className={"text-lg text-center flex items-center justify-center gap-2 flex-wrap"}>
            Thank you for your interest. I will get back to you shortly. <RocketIcon className={"w-8 h-8"} />
          </p>
        ) : (
          <>
            <Title>{contactSection.title}</Title>
            {contactSection.subtitle && <Subtitle>{contactSection.subtitle}</Subtitle>}
            <Form action={handleSubmit} contactSection={contactSection} {...{ setCursorText, setCursorVariant }} />
          </>
        )}
      </div>
    </div>
  )
}

const Form = ({
  action,
  setCursorVariant,
  setCursorText,
  contactSection
}: { action: (data: FormData) => Promise<void>; contactSection: ContactSection } & CursorAnimationHandler) => {
  const topics = contactSection.topics
  return (
    <form className="mt-8 space-y-4" action={action}>
      <input
        type="text"
        required
        placeholder="Name"
        name="name"
        className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-blue-500"
      />
      <input
        type="email"
        required
        placeholder="Email"
        name="email"
        className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-blue-500"
      />
      <textarea
        placeholder="Message"
        rows={6}
        name="message"
        className="w-full min-h-32 rounded-md px-4 bg-gray-100 text-sm pt-3 outline-blue-500"
        required
      />
      <div className={"flex flex-row flex-wrap justify-center gap-4 pb-4 md:pb-8"}>
        {topics.map((topic, index) => (
          <div key={topic} className="flex items-center">
            <input
              id={`topic-${index}`}
              type="radio"
              name="topics"
              defaultChecked={index === 0}
              value={topic}
              className="w-4 h-4 text-cyan-600 bg-cyan-100 border-cyan-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={`topic-${index}`} className="ms-2 text-sm text-gray-900">
              {topic}
            </label>
          </div>
        ))}
      </div>
      <Submit submitButtonLabel={contactSection.submitButtonLabel} {...{ setCursorText, setCursorVariant }} />
    </form>
  )
}

const Submit = ({
  submitButtonLabel,
  setCursorText,
  setCursorVariant
}: CursorAnimationHandler & { submitButtonLabel: string }) => {
  const { pending } = useFormStatus()
  const { isMobile } = useBreakpoint()

  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function contactEnter() {
    setCursorText("🚀")
    setCursorVariant("link")
  }

  return (
    <m.button
      onMouseEnter={isMobile ? undefined : contactEnter}
      onMouseLeave={isMobile ? undefined : onMouseLeave}
      whileHover={isMobile ? undefined : { scale: 1.1 }}
      whileTap={isMobile ? undefined : { scale: 1 }}
      transition={isMobile ? undefined : { type: "spring" as const, stiffness: 400, damping: 10 }}
      type="submit"
      className="max-w-sm mx-auto text-lg flex justify-center text-white items-center bg-cyan-600 px-8 py-3 rounded-3xl border-none disabled:pointer-events-none disabled:opacity-50"
      disabled={pending}>
      {pending ? "Sending..." : submitButtonLabel}
    </m.button>
  )
}
