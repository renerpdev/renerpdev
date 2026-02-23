import { getResumePage } from "@/sanity/lib/fetch"
import { ResumeClient } from "./_components/ResumeClient"
import type { Metadata } from "next"

export const revalidate = false

export async function generateMetadata(): Promise<Metadata> {
  const resumePage = await getResumePage()
  return {
    title: resumePage?.pageTitle || "Resume - René Ricardo",
    description: resumePage?.pageDescription || "Professional resume"
  }
}

export default async function ResumePage() {
  const resumePage = await getResumePage()

  if (!resumePage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">Resume page not configured yet.</p>
      </div>
    )
  }

  return <ResumeClient resumePage={resumePage} />
}
