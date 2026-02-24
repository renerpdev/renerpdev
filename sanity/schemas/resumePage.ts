import { DocumentTextIcon } from "@sanity/icons"
import { defineType, defineField } from "sanity"

export default defineType({
  name: "resumePage",
  title: "Resume Page",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    // --- Page Metadata ---
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: 'HTML page title for SEO (e.g., "René Ricardo - Resume")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "pageDescription",
      title: "Page Description",
      type: "text",
      description: "Meta description for SEO",
      rows: 2
    }),

    // --- Personal Info ---
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      description: "Profile photo displayed at the top of the resume sidebar",
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      description: 'e.g., "Sr. Software Engineer"',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "aboutText",
      title: "About / Summary",
      type: "text",
      description: "Short professional summary for the resume",
      rows: 4,
      validation: (Rule) => Rule.required()
    }),

    // --- References to existing data ---
    defineField({
      name: "experiences",
      title: "Work Experiences",
      type: "array",
      description: "Select work experiences to show on the resume",
      of: [{ type: "reference", to: [{ type: "experience" }] }]
    }),
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      description: "Select education entries to show on the resume",
      of: [{ type: "reference", to: [{ type: "education" }] }]
    }),
    defineField({
      name: "softSkills",
      title: "Soft Skills",
      type: "array",
      description: "Select soft skills to show on the resume",
      of: [
        {
          type: "reference",
          to: [{ type: "skill" }],
          options: { filter: 'category == "soft"' }
        }
      ]
    }),
    defineField({
      name: "technicalSkills",
      title: "Technical Skills (Hard Skills)",
      type: "array",
      description: "Select technical/hard skills to show on the resume",
      of: [
        {
          type: "reference",
          to: [{ type: "skill" }],
          options: { filter: 'category == "hard"' }
        }
      ]
    }),
    defineField({
      name: "projects",
      title: "Personal Projects",
      type: "array",
      description: "Select projects to display on the resume",
      of: [{ type: "reference", to: [{ type: "project" }] }]
    }),

    // --- Inline data ---
    defineField({
      name: "languages",
      title: "Languages",
      type: "array",
      description: "Languages spoken",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Language",
              type: "string",
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "level",
              title: "Proficiency Level",
              type: "string",
              options: {
                list: [
                  { title: "Native", value: "Native" },
                  { title: "Fluent", value: "Fluent" },
                  { title: "Advanced", value: "Advanced" },
                  { title: "Intermediate", value: "Intermediate" },
                  { title: "Basic", value: "Basic" }
                ]
              },
              validation: (Rule) => Rule.required()
            })
          ],
          preview: {
            select: { title: "name", subtitle: "level" }
          }
        }
      ]
    }),
    defineField({
      name: "contactLinks",
      title: "Contact Links",
      type: "array",
      description: "Contact links for the resume sidebar (GitHub, LinkedIn, email, etc.)",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'e.g., "GitHub", "Email", "Phone"',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: 'Display text (e.g., "github.com/renerpdev")',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              description: "Full URL (optional for phone)",
              validation: (Rule) =>
                Rule.uri({
                  allowRelative: true,
                  scheme: ["http", "https", "mailto", "tel"]
                })
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description:
                'Icon identifier (e.g., "github", "linkedin", "email", "phone", "dribbble", "behance", "npm", "globe")'
            })
          ],
          preview: {
            select: { title: "label", subtitle: "value" }
          }
        }
      ]
    }),

    // --- PDF Tracking ---
    defineField({
      name: "currentPdf",
      title: "Current Generated PDF",
      type: "reference",
      description: "Auto-populated: reference to the current generated PDF in the Media Library",
      to: [{ type: "media" }],
      readOnly: true
    }),
    defineField({
      name: "pdfGeneratedAt",
      title: "PDF Generated At",
      type: "datetime",
      description: "Timestamp of when the current PDF was last generated",
      readOnly: true
    })
  ],
  preview: {
    select: { title: "fullName", subtitle: "jobTitle" },
    prepare({ title, subtitle }) {
      return {
        title: "Resume Page",
        subtitle: `${title || "Not configured"} - ${subtitle || ""}`
      }
    }
  }
})
