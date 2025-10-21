import { DocumentTextIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "about",
  title: "About Section",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Section title (e.g., "About Me")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      description: "About description with rich text support",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" }
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL"
                  }
                ]
              }
            ]
          }
        }
      ]
    }),
    defineField({
      name: "cta",
      title: "Call to Action Button",
      type: "object",
      description: "Optional CTA button at the bottom of the About section",
      fields: [
        defineField({
          name: "text",
          title: "Button Text",
          type: "string",
          description: 'Text to display on the button (e.g., "Check Soft Skills")'
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "string",
          description: 'URL or anchor (e.g., "#skills")'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: "title"
    }
  }
})
