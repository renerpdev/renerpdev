import { BulbOutlineIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "skill",
  title: "Skills",
  type: "document",
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: "name",
      title: "Skill Name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Soft Skills", value: "soft" },
          { title: "Technologies", value: "technology" }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "proficiencyLevel",
      title: "Proficiency Level",
      type: "number",
      description: "Rating from 1-5 (optional, for future use)",
      validation: (Rule) => Rule.min(1).max(5).integer()
    }),
    defineField({
      name: "icon",
      title: "Icon/Logo",
      type: "image",
      description: "Optional icon for technology skills",
      options: {
        hotspot: true
      }
    })
  ],
  orderings: [
    {
      title: "Category",
      name: "categoryAsc",
      by: [{ field: "category", direction: "asc" }]
    }
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "icon"
    }
  }
})
