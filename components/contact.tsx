import React, { useState } from "react"
import { RocketIcon } from "@/components/icons/rocket"
import { sendEmail } from "@/app/lib/actions"
import { useFormStatus } from "react-dom"
import { m } from "framer-motion"

const Contact = () => {
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
        {!dataSent ? (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-950 to-cyan-600 bg-clip-text text-transparent">
              How can I help?
            </h2>
            <Form action={handleSubmit} />
          </>
        ) : (
          <p className={"text-lg text-center flex items-center justify-center gap-2 flex-wrap"}>
            Thank you for your interest. I will get back to you shortly. <RocketIcon className={"w-8 h-8"} />
          </p>
        )}
      </div>
    </div>
  )
}

const Form = ({ action }: { action: (data: FormData) => Promise<void> }) => {
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
        defaultValue={"I would like to know more about your services."}
        className="w-full min-h-32 rounded-md px-4 bg-gray-100 text-sm pt-3 outline-blue-500"
        required
      />
      <div className={"flex flex-col gap-4 pb-2"}>
        <div className="flex items-center">
          <input
            id="default-checkbox1"
            type="radio"
            name="topics"
            defaultChecked
            value="Web Development"
            className="w-4 h-4 text-cyan-600 bg-cyan-100 border-cyan-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="default-checkbox1" className="ms-2 text-sm font-medium text-gray-900 ">
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
          <label htmlFor="checked-checkbox2" className="ms-2 text-sm font-medium text-gray-900">
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
          <label htmlFor="checked-checkbox3" className="ms-2 text-sm font-medium text-gray-900">
            Mobile Development
          </label>
        </div>
      </div>
      <Submit />
    </form>
  )
}

const Submit = () => {
  const { pending } = useFormStatus()
  return (
    <m.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      type="submit"
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="text-white bg-cyan-600 hover:bg-cyan-500 font-semibold rounded-3xl text-sm px-10 py-3 block w-full lg:w-auto max-w-sm lg:max-w-xs mx-auto disabled:pointer-events-none disabled:opacity-50"
      disabled={pending}>
      {pending ? "Sending..." : "Send message"}
    </m.button>
  )
}

export default Contact
