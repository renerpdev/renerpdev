import { SparklesIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "marqueeSection",
  title: "Marquee Section",
  type: "document",
  icon: SparklesIcon,
  fields: [
    defineField({
      name: "topText",
      title: "Top Marquee Text",
      type: "string",
      description: 'Text for the top/front marquee (e.g., "Web • Mobile • Web • Mobile")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "bottomText",
      title: "Bottom Marquee Text",
      type: "string",
      description: 'Text for the bottom/back marquee (e.g., "Design • Development • Design • Development")',
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: "topText",
      subtitle: "bottomText"
    },
    prepare({ title, subtitle }) {
      return {
        title: "Marquee Section Configuration",
        subtitle: `Top: ${title || "Not set"} | Bottom: ${subtitle || "Not set"}`
      }
    }
  }
})
