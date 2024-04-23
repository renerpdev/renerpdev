const About = () => {
  return (
    <div className="h-full w-full p-10 sm:p-12 md:p-16 lg:p-20 rounded-xl max-w-3xl lg:max-w-4xl mx-auto shadow-md bg-white">
      <div className="mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-cyan-950 to-cyan-600 bg-clip-text text-transparent">
          About Me
        </h2>
        <p className={"text-lg lg:text-xl tracking-wide !leading-relaxed font-light"}>
          {
            "Hey there! Ever since I started my journey as a developer back in 2017, I've been doing remote work for some big companies and freelance clients. I've had the chance to work with many different technologies and build some really cool stuff, from landing pages to full-stack web applications. I absolutely love what I do and I'm always excited to learn new things."
          }
        </p>
      </div>
    </div>
  )
}

export default About
