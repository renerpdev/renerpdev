import { TagIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Tag Name",
      type: "string",
      description: 'Name of the tag (e.g., "React", "Backend", "Featured")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier",
      options: {
        source: "name",
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      description: 'Hex color code for the tag (e.g., "#3B82F6")',
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error("Must be a valid hex color")
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current"
    }
  }
})
