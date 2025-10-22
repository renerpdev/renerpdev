"use client"

import { CheckmarkIcon } from "@sanity/icons"
import React from "react"
import { type CursorAnimationHandler } from "@/hooks"
import { Title } from "@/components"
import type { About as AboutType } from "@/sanity/models"
import { PortableText } from "@portabletext/react"

interface AboutProps extends CursorAnimationHandler {
  about: AboutType | null
}

export const About = ({ setCursorText, setCursorVariant, about }: AboutProps) => {
  function onMouseLeave() {
    setCursorText("")
    setCursorVariant("default")
  }

  function linkEnter() {
    setCursorText("👀")
    setCursorVariant("link")
  }

  return (
    <div className="h-full w-full px-6 py-8 sm:py-10 md:p-12 lg:p-16 rounded-xl max-w-3xl lg:max-w-4xl mx-auto shadow-md bg-white">
      <div className="mx-auto w-full">
        <Title>{about?.title || "About Me"}</Title>
        {about?.description && (
          <div className={"md:text-lg tracking-wide !leading-relaxed font-light"}>
            <PortableText
              value={about.description}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4 mb-4">{children}</ul>
                  )
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li className="text-left text-cyan-700 text-base flex gap-1 items-center">
                      <CheckmarkIcon />
                      <span>{children}</span>
                    </li>
                  )
                },
                marks: {
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  em: ({ children }) => <em>{children}</em>,
                  link: ({ children, value }) => (
                    <a
                      href={value?.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-cyan-600 hover:text-cyan-700 underline">
                      {children}
                    </a>
                  )
                }
              }}
            />
          </div>
        )}
      </div>
      {about?.cta && (
        <a
          onMouseEnter={linkEnter}
          onMouseLeave={onMouseLeave}
          href={about.cta.link}
          className={
            "mt-8 underline underline-offset-2 max-w-max text-center mx-auto text-sm flex justify-center px-3 py-1"
          }>
          <span className={"text-cyan-950"}>{about.cta.text}</span>
        </a>
      )}
    </div>
  )
}
