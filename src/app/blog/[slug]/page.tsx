import { urlForImage } from "@/sanity/lib/image"
import Image from "next/image"
import { Blog } from "@/sanity/models/blog"
import { client } from "@/sanity/lib/client"
import { PortableText } from "@portabletext/react"
import Link from "next/link"

export const revalidate = 30 // revalidate every 30 seconds

async function getData(slug: string): Promise<Blog> {
  const query = `
  *[_type == "blog" && slug.current == '${slug}']{
    title,
    image,
    content
  }[0]`

  return client.fetch(query)
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = (await getData(slug)) || {}

  return (
    <div className={"flex flex-col"}>
      <Link href={"/"}>{"<"} Back</Link>
      <Image
        src={urlForImage(blog.image) || ""}
        alt={blog.title}
        width={800}
        height={800}
        priority
        className={"object-fill self-center mb-4 rounded"}
      />
      <div className={"flex flex-col items-center px-6"}>
        <h1 className={"text-4xl leading-normal font-bold text-center max-w-[800px]"}>{blog.title}</h1>
        <div className={"mt-14 prose lg:prose-xl max-w-[800px]"}>
          <PortableText value={blog.content} />
        </div>
      </div>
    </div>
  )
}
