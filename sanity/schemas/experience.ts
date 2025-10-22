import { CaseIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "experience",
  title: "Work Experience",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "company",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "role",
      title: "Role/Position",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      options: {
        list: [
          { title: "Full-Time", value: "Full-Time" },
          { title: "Part-Time", value: "Part-Time" },
          { title: "Freelance", value: "Freelance" },
          { title: "Contract", value: "Contract" }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "workMode",
      title: "Work Mode",
      type: "string",
      options: {
        list: [
          { title: "Remote", value: "Remote" },
          { title: "On-site", value: "On-site" },
          { title: "Hybrid", value: "Hybrid" }
        ]
      }
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
      description: "Leave empty if currently working here"
    }),
    defineField({
      name: "companyUrl",
      title: "Company Website",
      type: "url"
    }),
    defineField({
      name: "companyLogo",
      title: "Company Logo",
      type: "image",
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: "tasks",
      title: "Key Responsibilities",
      type: "array",
      of: [{ type: "text" }],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      description: "Select existing tags or create new ones for technologies used",
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
          options: {
            filter: '_type == "tag"'
          }
        }
      ]
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
      title: "company",
      subtitle: "role",
      media: "companyLogo",
      startDate: "startDate"
    },
    prepare({ title, subtitle, media, startDate }) {
      return {
        title: `${title} - ${subtitle}`,
        subtitle: startDate ? new Date(startDate).getFullYear().toString() : "",
        media
      }
    }
  }
})
