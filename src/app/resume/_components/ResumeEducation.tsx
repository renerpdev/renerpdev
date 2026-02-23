import type { Education } from "@/sanity/models"

interface ResumeEducationProps {
  education: Education[]
}

export function ResumeEducation({ education }: ResumeEducationProps) {
  const sorted = [...education].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )

  return (
    <section className="mb-5">
      <h3 className="text-xs font-bold uppercase tracking-wider border-b border-white/30 pb-1 mb-2">Education</h3>
      <div className="space-y-2">
        {sorted.map((edu) => {
          const start = new Date(edu.startDate).getFullYear()
          const end = edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"
          return (
            <div key={edu._id}>
              <p className="text-xs text-cyan-300">
                {start} - {end}
              </p>
              <p className="text-sm font-medium leading-tight">{edu.degree}</p>
              <p className="text-xs text-white/70">
                {edu.institution}
                {edu.location ? `, ${edu.location}` : ""}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
