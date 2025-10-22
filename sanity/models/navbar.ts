import type { Media } from "./media"

export interface MenuLink {
  label: string
  anchor: string
}

export interface Navbar {
  _id: string
  _type: "navbar"
  logo: Media
  menuLinks: MenuLink[]
}
