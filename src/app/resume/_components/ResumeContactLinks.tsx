import type { ResumeContactLink } from "@/sanity/models"

interface ResumeContactLinksProps {
  contactLinks: ResumeContactLink[]
}

export function ResumeContactLinks({ contactLinks }: ResumeContactLinksProps) {
  return (
    <section className="mb-5">
      <h3 className="text-xs font-bold uppercase tracking-wider border-b border-white/30 pb-1 mb-2">Contact</h3>
      <ul className="space-y-1">
        {contactLinks.map((link, i) => (
          <li key={i} className="text-xs">
            {link.url ? (
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-white/90 hover:text-white transition-colors underline underline-offset-2">
                {link.value}
              </a>
            ) : (
              <span className="text-white/90">{link.value}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
