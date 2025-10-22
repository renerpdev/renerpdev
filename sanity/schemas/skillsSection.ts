import { BulbOutlineIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "skillsSection",
  title: "Skills Section",
  type: "document",
  icon: BulbOutlineIcon,
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
      name: "skills",
      title: "Skills",
      type: "array",
      description: "Select skills to display in this section",
      of: [
        {
          type: "reference",
          to: [{ type: "skill" }]
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
