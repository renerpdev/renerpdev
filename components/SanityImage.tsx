import Image, { type ImageProps } from "next/image"

export function SanityImage({ src, alt, ...props }: ImageProps & { src: string }) {
  const isSvg = src.split("?")[0].toLowerCase().endsWith(".svg")
  return <Image {...props} src={src} alt={alt} unoptimized={isSvg} />
}
