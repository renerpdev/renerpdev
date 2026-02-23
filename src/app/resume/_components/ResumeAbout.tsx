interface ResumeAboutProps {
  text: string
}

export function ResumeAbout({ text }: ResumeAboutProps) {
  return (
    <section className="mb-6">
      <h2 className="text-base font-bold uppercase tracking-wider text-cyan-900 border-b-2 border-cyan-900 pb-1 mb-3">
        About
      </h2>
      <p className="text-sm leading-relaxed text-gray-700">{text}</p>
    </section>
  )
}
