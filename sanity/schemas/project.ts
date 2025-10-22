import { RocketIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().max(300)
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(2000).max(2100)
    }),
    defineField({
      name: "githubRepo",
      title: "GitHub Repository",
      type: "url"
    }),
    defineField({
      name: "npmRepo",
      title: "NPM Package",
      type: "url"
    }),
    defineField({
      name: "liveLink",
      title: "Live Demo Link",
      type: "url"
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true
      }
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
      title: "Year (Newest First)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }]
    }
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      media: "featuredImage"
    },
    prepare({ title, year, media }) {
      return {
        title,
        subtitle: year ? year.toString() : "",
        media
      }
    }
  }
})
