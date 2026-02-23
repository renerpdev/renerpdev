import { BookIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "education",
  title: "Education",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "degree",
      title: "Degree / Certificate",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "City, Country (optional)"
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Leave empty if currently studying"
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Optional description or focus area",
      rows: 3
    })
  ],
  orderings: [
    {
      title: "Start Date (Newest First)",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }]
    }
  ],
  preview: {
    select: {
      title: "degree",
      subtitle: "institution",
      startDate: "startDate"
    },
    prepare({ title, subtitle, startDate }) {
      return {
        title,
        subtitle: `${subtitle}${startDate ? ` - ${new Date(startDate).getFullYear()}` : ""}`
      }
    }
  }
})
