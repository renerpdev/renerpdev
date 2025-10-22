import { type SchemaTypeDefinition } from "sanity"
import navbar from "./schemas/navbar"
import hero from "./schemas/hero"
import about from "./schemas/about"
import marqueeSection from "./schemas/marqueeSection"
import experience from "./schemas/experience"
import experienceSection from "./schemas/experienceSection"
import project from "./schemas/project"
import projectsSection from "./schemas/projectsSection"
import skill from "./schemas/skill"
import skillsSection from "./schemas/skillsSection"
import tag from "./schemas/tag"
import media from "./schemas/media"
import testimonial from "./schemas/testimonial"
import testimonialSection from "./schemas/testimonialSection"
import callToActionSection from "./schemas/callToActionSection"
import contactSection from "./schemas/contactSection"
import footer from "./schemas/footer"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    navbar,
    hero,
    about,
    marqueeSection,
    experience,
    experienceSection,
    project,
    projectsSection,
    skill,
    skillsSection,
    tag,
    media,
    testimonial,
    testimonialSection,
    callToActionSection,
    contactSection,
    footer
  ]
}
