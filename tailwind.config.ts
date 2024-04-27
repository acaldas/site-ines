import type { Config } from "tailwindcss"
import { nextui } from "@nextui-org/react"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
    colors: {
      red: "#8a4044",
      accent: "#bb9c8b",
      textAccent: "#cfd2d3",
      text: "#594e3f"
    }
  },
  plugins: [require("tailwindcss-animate"), nextui()],
} satisfies Config

export default config