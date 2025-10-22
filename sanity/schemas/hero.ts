import { RocketIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  icon: RocketIcon,
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
      name: "header",
      title: "Header",
      type: "array",
      description: 'Main headline with rich text support (e.g., "Hello, I\'m [Your Name]")',
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" }
            ],
            annotations: []
          }
        }
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "subheader",
      title: "Subheader",
      type: "array",
      description: "Tagline or brief description with rich text support",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" }
            ],
            annotations: []
          }
        }
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
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
          title: "Link",
          type: "string",
          description: 'URL or anchor (e.g., "#contact")',
          validation: (Rule) => Rule.required()
        })
      ]
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "object",
      description: "Secondary call-to-action button (e.g., Download Resume)",
      fields: [
        defineField({
          name: "text",
          title: "Button Text",
          type: "string",
          description: 'Text to display on the button (e.g., "Download Resume")',
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "file",
          title: "File",
          type: "reference",
          description: "Select a file from Media Library",
          to: [{ type: "media" }],
          options: {
            filter: 'category != "image"'
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: "header",
      subtitle: "subheader"
    }
  }
})
