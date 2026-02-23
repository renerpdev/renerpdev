import type { Experience } from "@/sanity/models"

interface ResumeExperienceProps {
  experiences: Experience[]
}

function formatDateRange(startDate: string, endDate?: string): string {
  const start = new Date(startDate).getFullYear()
  const end = endDate ? new Date(endDate).getFullYear() : "Present"
  return `${start} - ${end}`
}

export function ResumeExperience({ experiences }: ResumeExperienceProps) {
  const sorted = [...experiences].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )

  return (
    <section className="mb-6">
      <h2 className="text-base font-bold uppercase tracking-wider text-cyan-900 border-b-2 border-cyan-900 pb-1 mb-3">
        Experience
      </h2>
      <div className="space-y-4">
        {sorted.map((job) => (
          <div key={job._id}>
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
              <p className="text-sm font-semibold text-gray-900">
                {formatDateRange(job.startDate, job.endDate)}
                <span className="font-normal text-gray-500">
                  {" | "}
                  {job.role}
                  {job.workMode ? ` ( ${job.workMode}${job.employmentType ? `, ${job.employmentType}` : ""} )` : ""}
                </span>
              </p>
            </div>
            <ul className="mt-1.5 space-y-1 text-sm text-gray-700">
              {job.tasks.map((task, i) => (
                <li key={i} className="flex gap-1.5 leading-snug">
                  <span className="text-cyan-700 shrink-0 mt-0.5">•</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
            <p className="mt-1 text-xs font-medium text-cyan-800">{job.company}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
