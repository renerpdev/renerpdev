import { getResumePage } from "@/sanity/lib/fetch"

export const revalidate = false

export default async function ResumePrintPage() {
  const resumePage = await getResumePage()

  if (!resumePage) {
    return <div>Resume page not configured</div>
  }

  const experiences = [...(resumePage.experiences || [])].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )

  const educationItems = [...(resumePage.education || [])].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        fontSize: "11px",
        lineHeight: "1.4",
        color: "#1f2937",
        display: "grid",
        gridTemplateColumns: "1fr 240px"
      }}>
      {/* Left column */}
      <div style={{ padding: "28px 24px 28px 32px" }}>
        {/* About */}
        <section style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#164e63",
              borderBottom: "2px solid #164e63",
              paddingBottom: "3px",
              marginBottom: "8px"
            }}>
            About
          </h2>
          <p style={{ fontSize: "11px", lineHeight: "1.5", color: "#374151" }}>{resumePage.aboutText}</p>
        </section>

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h2
              style={{
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#164e63",
                borderBottom: "2px solid #164e63",
                paddingBottom: "3px",
                marginBottom: "10px"
              }}>
              Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {experiences.map((job) => {
                const start = new Date(job.startDate).getFullYear()
                const end = job.endDate ? new Date(job.endDate).getFullYear() : "Present"
                return (
                  <div key={job._id}>
                    <p style={{ fontSize: "11px", fontWeight: 600, color: "#111827" }}>
                      {start} - {end}
                      <span style={{ fontWeight: 400, color: "#6b7280" }}>
                        {" | "}
                        {job.role}
                        {job.workMode
                          ? ` ( ${job.workMode}${job.employmentType ? `, ${job.employmentType}` : ""} )`
                          : ""}
                      </span>
                    </p>
                    <ul style={{ margin: "4px 0 0 0", padding: 0, listStyle: "none" }}>
                      {job.tasks.map((task, i) => (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            gap: "5px",
                            fontSize: "10.5px",
                            lineHeight: "1.4",
                            marginBottom: "2px",
                            color: "#374151"
                          }}>
                          <span style={{ color: "#0e7490", flexShrink: 0, marginTop: "1px" }}>•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                    <p style={{ marginTop: "3px", fontSize: "10px", fontWeight: 500, color: "#155e75" }}>
                      {job.company}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>

      {/* Right column (sidebar) */}
      <div style={{ backgroundColor: "#083344", color: "#ffffff", padding: "28px 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          {resumePage.profileImage?.asset?.url && (
            <div style={{ marginBottom: "12px", display: "flex", justifyContent: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resumePage.profileImage.asset.url}
                alt={resumePage.fullName}
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid rgba(255,255,255,0.2)"
                }}
              />
            </div>
          )}
          {(() => {
            const parts = resumePage.fullName.split(" ")
            const first = parts.slice(0, -1).join(" ")
            const last = parts.at(-1) || ""
            return (
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  lineHeight: "1.15",
                  margin: 0
                }}>
                <span style={{ display: "block" }}>{first}</span>
                <span style={{ display: "block" }}>{last}</span>
              </h1>
            )
          })()}
          <p
            style={{
              marginTop: "6px",
              fontSize: "10px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#67e8f9"
            }}>
            {resumePage.jobTitle}
          </p>
        </div>

        {/* Education */}
        {educationItems.length > 0 && (
          <SidebarSection title="Education">
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {educationItems.map((edu) => {
                const start = new Date(edu.startDate).getFullYear()
                const end = edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"
                return (
                  <div key={edu._id}>
                    <p style={{ fontSize: "10px", color: "#67e8f9" }}>
                      {start} - {end}
                    </p>
                    <p style={{ fontSize: "11px", fontWeight: 500, lineHeight: "1.2" }}>{edu.degree}</p>
                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)" }}>
                      {edu.institution}
                      {edu.location ? `, ${edu.location}` : ""}
                    </p>
                  </div>
                )
              })}
            </div>
          </SidebarSection>
        )}

        {/* Soft Skills */}
        {resumePage.softSkills && resumePage.softSkills.length > 0 && (
          <SidebarSection title="Soft Skills">
            <InlineList items={resumePage.softSkills.map((s) => s.name)} />
          </SidebarSection>
        )}

        {/* Hard Skills */}
        {resumePage.technicalSkills && resumePage.technicalSkills.length > 0 && (
          <SidebarSection title="Hard Skills">
            <InlineList items={resumePage.technicalSkills.map((s) => s.name)} />
          </SidebarSection>
        )}

        {/* Technologies */}
        {resumePage.technologies && resumePage.technologies.length > 0 && (
          <SidebarSection title="Technologies">
            <InlineList items={resumePage.technologies.map((t) => t.name)} />
          </SidebarSection>
        )}

        {/* Languages */}
        {resumePage.languages && resumePage.languages.length > 0 && (
          <SidebarSection title="Languages">
            <InlineList items={resumePage.languages.map((l) => l.name)} />
          </SidebarSection>
        )}

        {/* Projects */}
        {resumePage.projects && resumePage.projects.length > 0 && (
          <SidebarSection title="Projects">
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {resumePage.projects.map((project) => (
                <p key={project._id} style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.9)" }}>
                  <span style={{ fontWeight: 500 }}>{project.title}</span>
                  {project.description && (
                    <span style={{ color: "rgba(255,255,255,0.5)", marginLeft: "4px" }}>
                      (
                      {project.description.length > 50
                        ? `${project.description.slice(0, 50)}...`
                        : project.description}
                      )
                    </span>
                  )}
                </p>
              ))}
            </div>
          </SidebarSection>
        )}

        {/* Contact */}
        {resumePage.contactLinks && resumePage.contactLinks.length > 0 && (
          <SidebarSection title="Contact">
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {resumePage.contactLinks.map((link, i) => (
                <p key={i} style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.9)" }}>
                  {link.value}
                </p>
              ))}
            </div>
          </SidebarSection>
        )}
      </div>
    </div>
  )
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "14px" }}>
      <h3
        style={{
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
          paddingBottom: "3px",
          marginBottom: "6px"
        }}>
        {title}
      </h3>
      {children}
    </section>
  )
}

function InlineList({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 6px" }}>
      {items.map((item, i) => (
        <span key={i} style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.9)" }}>
          {item}
          {i < items.length - 1 && (
            <span style={{ color: "rgba(255,255,255,0.4)", marginLeft: "4px" }}>•</span>
          )}
        </span>
      ))}
    </div>
  )
}
