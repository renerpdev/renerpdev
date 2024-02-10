export default function Home() {
  return (
    <main className="flex justify-stretch items-stretch min-h-screen p-5 w-full">
      <div className={"grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 flex-1"}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            className={
              "border-2 border-r-4 border-b-4 hover:border-r-8 hover:border-b-8 border-cyan-600 p-5 min-h-[200px] hover:bg-cyan-100 transition-all duration-100 ease-in-out"
            }
            key={index}>
            blog {index + 1}
          </div>
        ))}
      </div>
    </main>
  )
}
