import type { ResumeLanguage } from "@/sanity/models"

interface ResumeLanguagesProps {
  languages: ResumeLanguage[]
}

export function ResumeLanguages({ languages }: ResumeLanguagesProps) {
  return (
    <section className="mb-5">
      <h3 className="text-xs font-bold uppercase tracking-wider border-b border-white/30 pb-1 mb-2">Languages</h3>
      <ul className="flex flex-wrap gap-x-1.5 gap-y-0.5">
        {languages.map((lang, i) => (
          <li key={i} className="text-xs text-white/90">
            {lang.name}
            {i < languages.length - 1 && <span className="text-white/40 ml-1.5">•</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}
