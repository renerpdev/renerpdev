import { client } from "@/sanity/lib/client"
import { Blog } from "@/sanity/models/blog"
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import Link from "next/link"
import Button from "@/components/button"

export const revalidate = 30 // revalidate every 30 seconds

async function getData(): Promise<Blog[]> {
  const query = `
  *[_type == "blog"] | order(_createdAt desc){
    title,
    "slug": slug.current,
    image,
    thumbnail,
    description,
    content,
}`

  return client.fetch(query)
}

export default async function Home() {
  const data = await getData()

  return (
    <div className="flex flex-col ">
      <h1 className={"text-4xl font-bold text-black mb-5 text-center"}>Latest Blogs</h1>
      <Button />
      <br />
      <div className={"grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 flex-1"}>
        {Array.from(data).map((blog) => (
          <div className={"shadow shadow-gray-400 rounded overflow-hidden hover:transform-[scale-1]"} key={blog.slug}>
            <Image
              src={urlForImage(blog.image)}
              alt={blog.title}
              width={200}
              height={200}
              className={"object-fill w-full"}
            />
            <div className={"p-4"}>
              <h3 className={"text-lg leading-6 line-clamp-2 text-black font-bold mb-2"}>{blog.title}</h3>
              <p className={"text-sm line-clamp-4"}>{blog.description}</p>
              <Link
                href={`/blog/${blog.slug}`}
                className={
                  "bg-cyan-600 hover:bg-cyan-800 text-white font-bold rounded w-full block p-2 text-center mt-4"
                }>
                View more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
