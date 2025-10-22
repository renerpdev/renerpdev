import { UserIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "testimonialSection",
  title: "Testimonials Section",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "bgImage",
      title: "Background Image",
      type: "reference",
      description: "Select a background image from the media library",
      to: [{ type: "media" }],
      options: {
        filter: 'category == "image"'
      }
    }),
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
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      description: "Select testimonials to display in this section",
      of: [
        {
          type: "reference",
          to: [{ type: "testimonial" }]
        }
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
