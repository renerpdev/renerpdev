"use client"

import Image from "next/image"
import React from "react"
import { Subtitle, SwipeCarousel, Title } from "@/components"
import { type CursorAnimationHandler } from "@/hooks"
import type { TestimonialSection } from "@/sanity/models"

interface TestimonialsProps extends CursorAnimationHandler {
  testimonialSection: TestimonialSection | null
}

export const Testimonials = ({ setCursorText, setCursorVariant, testimonialSection }: TestimonialsProps) => {
  const testimonials = testimonialSection?.testimonials || []

  if (!testimonialSection) {
    return null
  }

  return (
    <div className="flex justify-center items-center h-full mx-auto max-w-2xl w-full">
      <div className="mx-auto w-full">
        <Title className={"text-white"}>{testimonialSection.title}</Title>
        {testimonialSection.subtitle && <Subtitle>{testimonialSection.subtitle}</Subtitle>}
        <SwipeCarousel className={"mt-8 md:mt-12"} {...{ setCursorText, setCursorVariant }}>
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className={"flex flex-col items-center space-y-8"}>
              {testimonial.profileImage?.image?.asset?.url && (
                <Image
                  src={testimonial.profileImage.image.asset.url}
                  alt={`Photo of ${testimonial.name}`}
                  width={80}
                  height={80}
                  className={"rounded-full ring-1 ring-cyan-800 pointer-events-none"}
                />
              )}
              <q className={"tracking-wide leading-relaxed max-w-xl text-center text-lg font-light"}>
                {testimonial.quote}
              </q>
              <div className={"flex flex-col items-center"}>
                {testimonial.profileUrl ? (
                  <a
                    href={testimonial.profileUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={"font-medium text-cyan-500 lg:cursor-external"}>
                    {testimonial.name}
                  </a>
                ) : (
                  <span className={"font-medium text-cyan-500"}>{testimonial.name}</span>
                )}
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
