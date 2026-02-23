import type { Skill, Tag } from "@/sanity/models"

interface ResumeSkillsProps {
  title: string
  skills?: Skill[]
  tags?: Tag[]
}

export function ResumeSkills({ title, skills, tags }: ResumeSkillsProps) {
  const items = skills?.map((s) => s.name) || tags?.map((t) => t.name) || []

  if (items.length === 0) return null

  return (
    <section className="mb-5">
      <h3 className="text-xs font-bold uppercase tracking-wider border-b border-white/30 pb-1 mb-2">{title}</h3>
      <ul className="flex flex-wrap gap-x-1.5 gap-y-0.5">
        {items.map((name, i) => (
          <li key={i} className="text-xs text-white/90">
            {name}
            {i < items.length - 1 && <span className="text-white/40 ml-1.5">•</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}
