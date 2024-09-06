import Image from "next/image"
import React from "react"
import { Subtitle, SwipeCarousel, Title } from "@/components"
import { type CursorAnimationHandler } from "@/hooks"
import { TESTIMONIALS } from "@/app/(home)/_sections/constants"

export const Testimonials = ({ setCursorText, setCursorVariant }: CursorAnimationHandler) => {
  return (
    <div className="flex justify-center items-center h-full mx-auto max-w-2xl w-full">
      <div className="mx-auto w-full">
        <Title className={"text-white"}>Testimonials</Title>
        <Subtitle>What people I worked with have to say...</Subtitle>
        <SwipeCarousel className={"mt-8 md:mt-12"} {...{ setCursorText, setCursorVariant }}>
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.name} className={"flex flex-col items-center space-y-8"}>
              <Image
                src={testimonial.imageUrl}
                alt={`Photo of ${testimonial.name}`}
                width={80}
                height={80}
                className={"rounded-full ring-1 ring-cyan-800 pointer-events-none"}
              />
              <q className={"tracking-wide leading-relaxed max-w-xl text-center text-lg font-light"}>
                {testimonial.quote}
              </q>
              <div className={"flex flex-col items-center"}>
                <a
                  href={testimonial.profileUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={"font-medium text-cyan-500 lg:cursor-external"}>
                  {testimonial.name}
                </a>
                <p className={"text-sm text-center"}>
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </SwipeCarousel>
      </div>
    </div>
  )
}
