import React from "react"

const Footer = () => {
  return (
    <section className="p-5 w-full bg-gray-900 text-white text-center text-sm">
      <span>
        Made with{" "}
        <span className={"relative mx-0.5"}>
          <span className={"animate-pulse"}>❤️</span>
        </span>{" "}
        by{" "}
      </span>
      <a href="https://github.com/renerpdev" target="_blank" rel="noreferrer noopener" className={"underline"}>
        René Ricardo
      </a>{" "}
      © {new Date().getFullYear()}
    </section>
  )
}

export default Footer
