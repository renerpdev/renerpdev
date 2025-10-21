import React from "react"
import { type CursorAnimationHandler } from "@/hooks"
import { Magnet } from "@/components/Magnet"
import Image from "next/image"
import type { Footer as FooterType } from "@/sanity/models"
import { PortableText } from "@portabletext/react"

interface FooterProps extends CursorAnimationHandler {
  footer: FooterType | null
}

export const Footer = ({ setCursorText, setCursorVariant, footer }: FooterProps) => {
  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function linkEnter() {
    setCursorText("👀")
    setCursorVariant("link")
  }

  function buttonUpEnter() {
    setCursorText("")
    setCursorVariant("action")
  }

  if (!footer) {
    return null
  }

  const bgStyle = {
    background: `radial-gradient(circle at 50% 50%, #1d2839 40%, transparent 90%), url(${footer.bgImage?.image?.asset.url}) repeat center/25% #1d2839`
  }

  return (
    <footer className="px-5 py-16 w-full bg-gray-900 text-white text-center text-sm space-y-8 relative" style={bgStyle}>
      {footer.logo?.image?.asset?.url && (
        <Image
          src={footer.logo.image.asset.url}
          alt={footer.logo.title || "Logo"}
          width={40}
          height={40}
          className={"w-10 h-10 mx-auto"}
        />
      )}

      {footer.heading && (
        <div className={"text-xl lg:text-2xl font-light tracking-wider"}>
          <PortableText
            value={footer.heading}
            components={{
              marks: {
                strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                link: ({ value, children }) => (
                  <a
                    href={value?.href}
                    onMouseEnter={linkEnter}
                    onMouseLeave={onMouseLeave}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-bold hover:text-cyan-500">
                    {children}
                  </a>
                )
              }
            }}
          />
        </div>
      )}

      {footer.socialLinks && footer.socialLinks.length > 0 && (
        <div className={"flex justify-center flex-wrap space-x-4 items-center"}>
          {footer.socialLinks.map((link) => (
            <a
              onMouseEnter={linkEnter}
              onMouseLeave={onMouseLeave}
              href={link.link}
              key={link.name}
              target="_blank"
              rel="noreferrer noopener"
              className={"inline-flex text-white hover:text-cyan-600"}
              aria-label={link.name}>
              {link.icon?.image?.asset?.url && (
                <Image
                  src={link.icon.image.asset.url}
                  alt={link.icon.title || link.name}
                  width={20}
                  height={20}
                  className={"object-contain"}
                />
              )}
            </a>
          ))}
        </div>
      )}

      {footer.subheading && (
        <div className={"text-base lg:text-lg font-light tracking-wide"}>
          <PortableText
            value={footer.subheading}
            components={{
              marks: {
                strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                link: ({ value, children }) => (
                  <a
                    href={value?.href}
                    onMouseEnter={linkEnter}
                    onMouseLeave={onMouseLeave}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-bold hover:text-cyan-500">
                    {children}
                  </a>
                )
              }
            }}
          />
        </div>
      )}

      {footer.description && (
        <div className={"tracking-wider text-xs space-y-0.5 font-light"}>
          <PortableText
            value={footer.description}
            components={{
              block: ({ children }) => <p className="font-light">{children}</p>,
              marks: {
                strong: ({ children }) => <strong className="font-medium">{children}</strong>,
                link: ({ value, children }) => (
                  <a
                    href={value?.href}
                    onMouseEnter={linkEnter}
                    onMouseLeave={onMouseLeave}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-medium hover:text-cyan-500">
                    {children}
                  </a>
                )
              }
            }}
          />
        </div>
      )}

      {footer.scrollToTopButton?.icon?.image?.asset?.url && (
        <div
          className={"absolute top-2 md:top-4 right-4 md:right-8 z-10 cursor-none"}
          onMouseEnter={buttonUpEnter}
          onMouseLeave={onMouseLeave}>
          <Magnet>
            <a
              href={footer.scrollToTopButton.link || "#"}
              className={"w-16 h-16 rounded-full flex items-center justify-center "}
              aria-label="Scroll to top">
              <Image
                src={footer.scrollToTopButton.icon.image.asset.url}
                alt={footer.scrollToTopButton.icon.title || "Scroll to top"}
                width={40}
                height={40}
                className={"w-10 h-10 object-contain"}
              />
            </a>
          </Magnet>
        </div>
      )}
    </footer>
  )
}
