import type { Config } from "tailwindcss"
import { nextui } from "@nextui-org/react"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx,astro}',
    './components/**/*.{ts,tsx,astro}',
    './app/**/*.{ts,tsx,astro}',
    './src/**/*.{ts,tsx,astro}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        bg: "#ede6e0",
        bgDark: "#dcd8d5",
        red: "#8a4044",
        accent: "#bb9c8b",
        textAccent: "#cfd2d3",
        text: "#594e3f",
        transparent: 'transparent',
        current: 'currentColor',
      },
      fontSize: {
        '2xl': '1.65rem'
      }
    }
  },
  plugins: [require("tailwindcss-animate"), nextui({
    addCommonColors: true,
    themes: {
      light: {
        colors: {
        }
      }
    }
  })],
} satisfies Config

export default config