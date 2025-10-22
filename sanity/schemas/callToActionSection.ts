import { RocketIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "callToActionSection",
  title: "Call to Action Section",
  type: "document",
  icon: RocketIcon,
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
      name: "cta",
      title: "Call to Action Button",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Button Text",
          type: "string",
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "link",
          title: "Button Link",
          type: "string",
          description: 'URL or anchor link (e.g., "#contact")',
          validation: (Rule) => Rule.required()
        })
      ],
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
