import { groq } from "next-sanity"

// Navbar Query (Singleton)
export const navbarQuery = groq`
  *[_type == "navbar"][0]{
    _id,
    logo->{
      _id,
      title,
      category,
      image{
        asset->{
          _id,
          url
        }
      }
    },
    menuLinks[]{
      label,
      anchor
    }
  }
`

// Hero Query (Singleton)
export const heroQuery = groq`
  *[_type == "hero"][0]{
    _id,
    bgImage->{
      _id,
      title,
      category,
      image{
        asset->{
          _id,
          url
        }
      }
    },
    header,
    subheader,
    primaryCta,
    secondaryCta{
      text,
      file->{
        _id,
        title,
        category,
        file{
          asset->{
            _id,
            url
          }
        }
      }
    }
  }
`

// About Query (Singleton)
export const aboutQuery = groq`
  *[_type == "about"][0]{
    _id,
    title,
    description,
    cta
  }
`

// Marquee Section Query (Singleton)
export const marqueeSectionQuery = groq`
  *[_type == "marqueeSection"][0]{
    _id,
    topText,
    bottomText
  }
`

// Call to Action Section Query (Singleton)
export const callToActionSectionQuery = groq`
  *[_type == "callToActionSection"][0]{
    _id,
    title,
    subtitle,
    cta
  }
`

// Contact Section Query (Singleton)
export const contactSectionQuery = groq`
  *[_type == "contactSection"][0]{
    _id,
    title,
    subtitle,
    topics,
    submitButtonLabel
  }
`

// Footer Query (Singleton)
export const footerQuery = groq`
  *[_type == "footer"][0]{
    _id,
    bgImage->{
      _id,
      title,
      category,
      image{
        asset->{
          _id,
          url
        }
      }
    },
    logo->{
      _id,
      title,
      category,
      image{
        asset->{
          _id,
          url
        }
      }
    },
    heading,
    subheading,
    socialLinks[]{
      name,
      icon->{
        _id,
        title,
        category,
        image{
          asset->{
            _id,
            url
          }
        }
      },
      link
    },
    description,
    scrollToTopButton{
      icon->{
        _id,
        title,
        category,
        image{
          asset->{
            _id,
            url
          }
        }
      },
      link
    }
  }
`

// Experience Section Query (Singleton)
export const experienceSectionQuery = groq`
  *[_type == "experienceSection"][0]{
    _id,
    title,
    subtitle,
    experiences[]->{
      _id,
      company,
      role,
      employmentType,
      workMode,
      startDate,
      endDate,
      companyUrl,
      companyLogo{
        asset->{
          _id,
          url
        }
      },
      tasks,
      technologies[]->{
        _id,
        name,
        slug,
        color
      }
    },
    cta{
      text,
      file->{
        _id,
        title,
        category,
        file{
          asset->{
            _id,
            url
          }
        }
      }
    }
  }
`

// Experience Queries
export const experienceQuery = groq`
  *[_type == "experience"] | order(startDate desc){
    _id,
    company,
    role,
    employmentType,
    workMode,
    startDate,
    endDate,
    companyUrl,
    companyLogo{
      asset->{
        _id,
        url
      }
    },
    tasks,
    technologies[]->{
      _id,
      name,
      slug,
      color
    }
  }
`

// Projects Section Query (Singleton)
export const projectsSectionQuery = groq`
  *[_type == "projectsSection"][0]{
    _id,
    title,
    subtitle,
    projects[]->{
      _id,
      title,
      description,
      year,
      githubRepo,
      npmRepo,
      liveLink,
      featuredImage{
        asset->{
          _id,
          url
        }
      },
      technologies[]->{
        _id,
        name,
        slug,
        color
      }
    },
    cta
  }
`

// Projects Queries
export const projectsQuery = groq`
  *[_type == "project"] | order(year desc){
    _id,
    title,
    description,
    year,
    githubRepo,
    npmRepo,
    liveLink,
    featuredImage{
      asset->{
        _id,
        url
      }
    },
    technologies[]->{
      _id,
      name,
      slug,
      color
    }
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project"] | order(year desc){
    _id,
    title,
    description,
    year,
    githubRepo,
    npmRepo,
    liveLink,
    featuredImage{
      asset->{
        _id,
        url
      }
    },
    technologies[]->{
      _id,
      name,
      slug,
      color
    }
  }
`

// Skills Section Query (Singleton)
export const skillsSectionQuery = groq`
  *[_type == "skillsSection"][0]{
    _id,
    title,
    subtitle,
    skills[]->{
      _id,
      name,
      category,
      proficiencyLevel,
      icon{
        asset->{
          _id,
          url
        }
      }
    }
  }
`

// Skills Queries
export const skillsQuery = groq`
  *[_type == "skill"] | order(category asc){
    _id,
    name,
    category,
    proficiencyLevel,
    icon{
      asset->{
        _id,
        url
      }
    }
  }
`

export const skillsByCategoryQuery = (category: "soft" | "technology") => groq`
  *[_type == "skill" && category == "${category}"] | order(name asc){
    _id,
    name,
    proficiencyLevel,
    icon{
      asset->{
        _id,
        url
      }
    }
  }
`

// Testimonial Section Query (Singleton)
export const testimonialSectionQuery = groq`
  *[_type == "testimonialSection"][0]{
    _id,
    bgImage->{
      _id,
      title,
      category,
      image{
        asset->{
          _id,
          url
        }
      }
    },
    title,
    subtitle,
    testimonials[]->{
      _id,
      name,
      title,
      company,
      quote,
      profileImage->{
        _id,
        title,
        category,
        image{
          asset->{
            _id,
            url
          }
        }
      },
      profileUrl
    }
  }
`

// Testimonials Query
export const testimonialsQuery = groq`
  *[_type == "testimonial"]{
    _id,
    name,
    title,
    company,
    quote,
    profileImage->{
      _id,
      title,
      category,
      image{
        asset->{
          _id,
          url
        }
      }
    },
    profileUrl
  }
`
