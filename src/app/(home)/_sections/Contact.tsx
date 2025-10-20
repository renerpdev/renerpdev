import React, { useState } from "react"
import { sendEmail } from "@/lib/actions"
import { useFormStatus } from "react-dom"
import { m } from "framer-motion"
import { type CursorAnimationHandler } from "@/hooks"
import { RocketIcon, Subtitle, Title } from "@/components"

export const Contact = ({ setCursorText, setCursorVariant }: CursorAnimationHandler) => {
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

  return (
    <div className="flex justify-center items-center h-full w-full mx-auto max-w-2xl ">
      <div className="mx-auto w-full">
        {dataSent ? (
          <p className={"text-lg text-center flex items-center justify-center gap-2 flex-wrap"}>
            Thank you for your interest. I will get back to you shortly. <RocketIcon className={"w-8 h-8"} />
          </p>
        ) : (
          <>
            <Title>How can I help?</Title>
            <Subtitle>{"Let me know what you're looking for"}</Subtitle>
            <Form action={handleSubmit} {...{ setCursorText, setCursorVariant }} />
          </>
        )}
      </div>
    </div>
  )
}

const Form = ({
  action,
  setCursorVariant,
  setCursorText
}: { action: (data: FormData) => Promise<void> } & CursorAnimationHandler) => {
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
        <div className="flex items-center">
          <input
            id="default-checkbox1"
            type="radio"
            name="topics"
            defaultChecked
            value="Web Development"
            className="w-4 h-4 text-cyan-600 bg-cyan-100 border-cyan-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="default-checkbox1" className="ms-2 text-sm text-gray-900 ">
            Web Development
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="checked-checkbox2"
            type="radio"
            name="topics"
            value="Web Design"
            className="w-4 h-4 text-cyan-600 bg-cyan-100 border-cyan-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="checked-checkbox2" className="ms-2 text-sm text-gray-900">
            Web Design
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="checked-checkbox3"
            type="radio"
            name="topics"
            value="Mobile Development"
            className="w-4 h-4 text-cyan-600 bg-cyan-100 border-cyan-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="checked-checkbox3" className="ms-2 text-sm text-gray-900">
            Mobile Development
          </label>
        </div>
      </div>
      <Submit {...{ setCursorText, setCursorVariant }} />
    </form>
  )
}

const Submit = ({ setCursorText, setCursorVariant }: CursorAnimationHandler) => {
  const { pending } = useFormStatus()

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
      onMouseEnter={contactEnter}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      type="submit"
      className="max-w-sm mx-auto text-lg flex justify-center text-white items-center bg-cyan-600 px-8 py-3 rounded-3xl border-none disabled:pointer-events-none disabled:opacity-50"
      disabled={pending}>
      {pending ? "Sending..." : "Send message"}
    </m.button>
  )
}
