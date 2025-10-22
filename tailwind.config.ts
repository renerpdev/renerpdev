import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      cursor: {
        external: "url(/assets/arrow-diagonal-up.svg), pointer"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    // Plugin to make hover styles only apply on devices that support hover
    plugin(function ({ addVariant }) {
      // Override default hover variant to only apply on devices with hover capability
      addVariant("hover", "@media (hover: hover) and (pointer: fine) { &:hover }")
    })
  ]
}
export default config
