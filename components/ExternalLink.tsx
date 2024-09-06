import Image from "next/image"
import React from "react"

export const ExternalLink = () => (
  <Image
    width={18}
    height={18}
    src={"/assets/arrow-diagonal-up.svg"}
    className={"invert translate-y-[2px]"}
    role="presentation"
    aria-hidden="true"
    alt="arrow icon"
  />
)
