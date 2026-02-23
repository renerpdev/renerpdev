import { CaseIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "experienceSection",
  title: "Experience Section",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Section title (e.g., "Experience")',
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
      name: "experiences",
      title: "Work Experiences",
      type: "array",
      description: "Select work experiences to display in this section",
      of: [
        {
          type: "reference",
          to: [{ type: "experience" }]
        }
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "maxDisplayedItems",
      title: "Max Displayed Items",
      type: "number",
      description: "Maximum number of experiences to show before truncating. Remaining items are accessible via the full resume.",
      initialValue: 2,
      validation: (Rule) => Rule.min(1).integer()
    }),
    defineField({
      name: "cta",
      title: "Call to Action Button",
      type: "object",
      description: 'Optional CTA button at the bottom of the Experience section (e.g., "Download Resume")',
      fields: [
        defineField({
          name: "text",
          title: "Button Text",
          type: "string",
          description: 'Text to display on the button (e.g., "Download Resume")'
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
