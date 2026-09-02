import { UserIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Person Name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "profilePhoto",
      title: "Profile Image",
      type: "image",
      description: "Upload a profile image directly for this testimonial",
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: "profileUrl",
      title: "LinkedIn/Profile URL",
      type: "url"
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "company",
      media: "profilePhoto"
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || "",
        media
      }
    }
  }
})
