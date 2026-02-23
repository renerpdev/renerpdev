import type { Project } from "@/sanity/models"

interface ResumeProjectsProps {
  projects: Project[]
}

export function ResumeProjects({ projects }: ResumeProjectsProps) {
  return (
    <section className="mb-5">
      <h3 className="text-xs font-bold uppercase tracking-wider border-b border-white/30 pb-1 mb-2">Projects</h3>
      <ul className="space-y-0.5">
        {projects.map((project) => (
          <li key={project._id} className="text-xs text-white/90">
            <span className="font-medium">{project.title}</span>
            {project.description && (
              <span className="text-white/50 ml-1">
                ({project.description.length > 50 ? `${project.description.slice(0, 50)}...` : project.description})
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
