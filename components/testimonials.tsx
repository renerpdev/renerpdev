import Image from "next/image"
import { SwipeCarousel } from "@/components/swipe-carousel"
import { CursorAnimationHandler } from "@/utils/use-cursor-animation"

const Testimonials = ({ setCursorText, setCursorVariant }: CursorAnimationHandler) => {
  const testimonials = [
    {
      name: "Felipe Piquer",
      title: "CEO & Project Manager",
      company: "Informage Studios S.L.U.",
      quote:
        "We have had the opportunity to work together and I can say that he is a professional dedicated to the work assigned to him. He has excellent skills in web layout and frontend development. Socially he is a polite person and concerned about his teammates.",
      image:
        "https://media.licdn.com/dms/image/C5603AQGlbP7E7hapPg/profile-displayphoto-shrink_400_400/0/1517508164173?e=1719446400&v=beta&t=AjX9uKvM9qi-oD8gOmbWC3oefOSjahkujckg0RGbRIM",
      profileUrl: "https://www.linkedin.com/in/felipe-piquer-69129b49/"
    },
    {
      name: "Alexander Escalona",
      title: "Lead Software Engineer",
      company: "Level 6 LLC",
      quote:
        "I can affirm that he fully fulfills the tasks that are assigned. His web design and frontend development skills are excellent. His attitudes as a person and professional seem correct to me and I would recommend him to recruiters and clients who need these qualities in a developer.",
      image:
        "https://media.licdn.com/dms/image/D5635AQEFSCIM3VGyTA/profile-framedphoto-shrink_400_400/0/1703014825234?e=1714532400&v=beta&t=-C3hy_ovX5r2-btg8dR2z7qDc9o7NHYsK0GjrxVVyZg",
      profileUrl: "https://www.linkedin.com/in/alexander-escalona-fern%C3%A1ndez-a59883123/"
    }
  ]

  return (
    <div className="flex justify-center items-center h-full mx-auto max-w-2xl w-full">
      <div className="mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          Testimonials
        </h2>
        <h3 className={"text-center mx-auto max-w-md text-lg md:text-xl font-normal"}>
          What people I worked with have to say...
        </h3>

        <SwipeCarousel className={"mt-8 md:mt-12"} {...{ setCursorText, setCursorVariant }}>
          {testimonials.map((t) => (
            <div key={t.name} className={"flex flex-col items-center space-y-8"}>
              <Image
                src={t.image}
                alt={`Photo of ${t.name}`}
                width={80}
                height={80}
                className={"rounded-full ring-1 ring-cyan-800 pointer-events-none"}
              />
              <q className={"tracking-wide leading-relaxed max-w-xl text-center text-lg font-light"}>{t.quote}</q>
              <div className={"flex flex-col items-center"}>
                <a
                  href={t.profileUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={"font-medium text-cyan-500 lg:cursor-external"}>
                  {t.name}
                </a>
                <p className={"text-sm text-center"}>
                  {t.title}, {t.company}
                </p>
              </div>
            </div>
          ))}
        </SwipeCarousel>
      </div>
    </div>
  )
}

export default Testimonials
