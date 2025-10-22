import { ComposeIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: ComposeIcon,
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
      name: "logo",
      title: "Logo",
      type: "reference",
      description: "Select an image from the media library",
      to: [{ type: "media" }],
      options: {
        filter: 'category == "image"'
      }
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "array",
      description: "Rich text heading with support for links and bold text",
      of: [
        {
          type: "block",
          styles: [],
          lists: [],
          marks: {
            decorators: [{ title: "Strong", value: "strong" }],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "string",
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
      name: "subheading",
      title: "Subheading",
      type: "array",
      description: "Rich text subheading with support for links and bold text",
      of: [
        {
          type: "block",
          styles: [],
          lists: [],
          marks: {
            decorators: [{ title: "Strong", value: "strong" }],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "string",
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
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      description: "Add social media links with custom icons",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Platform Name",
              type: "string",
              description: "Name of the social platform (e.g., LinkedIn, GitHub)",
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "reference",
              description: "Select an icon from the media library",
              to: [{ type: "media" }],
              options: {
                filter: 'category == "image"'
              },
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "url",
              description: "URL to the social platform profile",
              validation: (Rule) => Rule.required()
            })
          ],
          preview: {
            select: {
              title: "name",
              media: "icon.image",
              subtitle: "link"
            },
            prepare({ title, media, subtitle }) {
              return {
                title: title || "Social Link",
                subtitle: subtitle,
                media: media
              }
            }
          }
        }
      ]
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      description: "Rich text description with support for links and bold text",
      of: [
        {
          type: "block",
          styles: [],
          lists: [],
          marks: {
            decorators: [{ title: "Strong", value: "strong" }],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "string",
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
      name: "scrollToTopButton",
      title: "Scroll to Top Button",
      type: "object",
      fields: [
        defineField({
          name: "icon",
          title: "Button Icon",
          type: "reference",
          description: "Select an icon from the media library",
          to: [{ type: "media" }],
          options: {
            filter: 'category == "image"'
          },
          validation: (Rule) => Rule.required()
        }),
        defineField({
          name: "link",
          title: "Button Link",
          type: "string",
          description: 'Anchor link (e.g., "#top")'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: "heading",
      media: "logo.image"
    },
    prepare({ title }) {
      return {
        title: "Footer Configuration",
        subtitle: title ? "Configured" : "Not configured"
      }
    }
  }
})
