const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full px-5 md:px-10 py-6 text-white flex justify-end items-center gap-4 md:gap-6">
      <a href="#skills" className={"font-semibold border-b-2 border-transparent hover:text-cyan-600 transition-colors"}>
        Skills
      </a>
      <a
        href="#contact"
        className={"font-semibold border-b-2 border-transparent hover:text-cyan-600 transition-colors"}>
        Contact
      </a>
    </nav>
  )
}

export default Navbar
