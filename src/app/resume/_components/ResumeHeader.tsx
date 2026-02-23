interface ResumeHeaderProps {
  fullName: string
  jobTitle: string
  profileImageUrl?: string
}

export function ResumeHeader({ fullName, jobTitle, profileImageUrl }: ResumeHeaderProps) {
  const nameParts = fullName.split(" ")
  const firstName = nameParts.slice(0, -1).join(" ")
  const lastName = nameParts.at(-1) || ""

  return (
    <div className="mb-6 text-center">
      {profileImageUrl && (
        <div className="mb-4 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profileImageUrl}
            alt={fullName}
            className="w-28 h-28 rounded-full object-cover border-2 border-white/20"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold tracking-wide leading-tight">
        <span className="block">{firstName}</span>
        <span className="block">{lastName}</span>
      </h1>
      <p className="mt-2 text-sm font-medium uppercase tracking-widest text-cyan-300">{jobTitle}</p>
    </div>
  )
}
