import { RocketIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "projectsSection",
  title: "Projects Section",
  type: "document",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Section title (e.g., "Projects")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      description: "Optional subtitle or description for the section",
      rows: 3
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      description: "Select projects to display in this section",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }]
        }
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "cta",
      title: "Call to Action Button",
      type: "object",
      description: "Optional CTA button at the bottom of the Projects section",
      fields: [
        defineField({
          name: "text",
          title: "Button Text",
          type: "string",
          description: "Text to display on the button"
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "string",
          description: 'URL or anchor (e.g., "#contact", "https://github.com/...")'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle"
    }
  }
})
