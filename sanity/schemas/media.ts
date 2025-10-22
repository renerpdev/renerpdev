import { DocumentIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "media",
  title: "Media Library",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Descriptive name for this file (e.g., "Resume 2025", "Profile Photo")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Optional description of this file",
      rows: 3
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Categorize this file for easier organization",
      options: {
        list: [
          { title: "Document", value: "document" },
          { title: "Image", value: "image" },
          { title: "Resume", value: "resume" },
          { title: "Certificate", value: "certificate" },
          { title: "Other", value: "other" }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      description: "Upload a file (PDF, DOC, etc.)",
      options: {
        accept: ".pdf,.doc,.docx,.txt,.zip"
      },
      hidden: ({ parent }) => parent?.category === "image"
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Upload an image file",
      options: {
        hotspot: true
      },
      hidden: ({ parent }) => parent?.category !== "image"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image"
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Untitled",
        subtitle: subtitle ? `Category: ${subtitle}` : "No category",
        media
      }
    }
  }
})
