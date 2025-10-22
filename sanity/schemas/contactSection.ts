import { EnvelopeIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "contactSection",
  title: "Contact Section",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "text",
      description: "Optional subtitle or description"
    }),
    defineField({
      name: "topics",
      title: "Contact Topics",
      type: "array",
      description: "Topics to display as radio button options",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: "submitButtonLabel",
      title: "Submit Button Label",
      type: "string",
      description: "Text for the submit button",
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle"
    }
  }
})
