"use client"

import type { ResumePage } from "@/sanity/models"
import { ResumeHeader } from "./ResumeHeader"
import { ResumeAbout } from "./ResumeAbout"
import { ResumeExperience } from "./ResumeExperience"
import { ResumeEducation } from "./ResumeEducation"
import { ResumeSkills } from "./ResumeSkills"
import { ResumeProjects } from "./ResumeProjects"
import { ResumeLanguages } from "./ResumeLanguages"
import { ResumeContactLinks } from "./ResumeContactLinks"
import { useResumeDownload } from "@/hooks/useResumeDownload"

interface ResumeClientProps {
  resumePage: ResumePage
}

export function ResumeClient({ resumePage }: ResumeClientProps) {
  const { handleDownload, isDownloading } = useResumeDownload()

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 print:bg-white print:p-0">
      {/* Download button — hidden in print */}
      <div className="max-w-[210mm] mx-auto mb-4 flex justify-end print:hidden">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="bg-cyan-900 text-white px-6 py-2 rounded-lg hover:bg-cyan-800 transition-colors disabled:opacity-50 text-sm font-medium">
          {isDownloading ? "Downloading..." : "Download PDF"}
        </button>
      </div>

      {/* Resume container — A4 proportions */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-lg print:shadow-none">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] min-h-[297mm]">
          {/* Left column (main content) */}
          <div className="p-8 pr-6 order-2 md:order-1">
            <ResumeAbout text={resumePage.aboutText} />

            {resumePage.experiences && resumePage.experiences.length > 0 && (
              <ResumeExperience experiences={resumePage.experiences} />
            )}
          </div>

          {/* Right column (sidebar) */}
          <div className="bg-cyan-950 text-white p-6 order-1 md:order-2">
            <ResumeHeader
              fullName={resumePage.fullName}
              jobTitle={resumePage.jobTitle}
              profileImageUrl={resumePage.profileImage?.asset?.url}
            />

            {resumePage.education && resumePage.education.length > 0 && (
              <ResumeEducation education={resumePage.education} />
            )}

            {resumePage.softSkills && resumePage.softSkills.length > 0 && (
              <ResumeSkills title="Soft Skills" skills={resumePage.softSkills} />
            )}

            {resumePage.technicalSkills && resumePage.technicalSkills.length > 0 && (
              <ResumeSkills title="Hard Skills" skills={resumePage.technicalSkills} />
            )}

            {resumePage.languages && resumePage.languages.length > 0 && (
              <ResumeLanguages languages={resumePage.languages} />
            )}

            {resumePage.projects && resumePage.projects.length > 0 && <ResumeProjects projects={resumePage.projects} />}

            {resumePage.contactLinks && resumePage.contactLinks.length > 0 && (
              <ResumeContactLinks contactLinks={resumePage.contactLinks} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
