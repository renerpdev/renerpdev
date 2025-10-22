import { MenuIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "navbar",
  title: "Navbar",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "reference",
      description: "Select a logo image from Media Library",
      to: [{ type: "media" }],
      options: {
        filter: 'category == "image"'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "menuLinks",
      title: "Menu Links",
      type: "array",
      description: "Navigation menu links",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'Text to display for the link (e.g., "About", "Projects")',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "anchor",
              title: "Anchor Link",
              type: "string",
              description: 'Anchor link (e.g., "#about", "#projects")',
              validation: (Rule) =>
                Rule.required().custom((value) => {
                  if (!value?.startsWith("#")) {
                    return "Anchor link must start with #"
                  }
                  return true
                })
            })
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "anchor"
            }
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1)
    })
  ],
  preview: {
    select: {
      title: "logo.title",
      media: "logo.asset"
    },
    prepare({ title, media }) {
      return {
        title: "Navbar Configuration",
        subtitle: title || "Logo",
        media
      }
    }
  }
})
