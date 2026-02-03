import type { Config } from "tailwindcss";
import { screens, fontSize } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,astro}",
    "./components/**/*.{ts,tsx,astro}",
    "./app/**/*.{ts,tsx,astro}",
    "./src/**/*.{ts,tsx,astro}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      xs: "450px",
      ...screens,
    },
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
        transparent: "transparent",
        current: "currentColor",
      },
      fontSize: {
        ...fontSize,
        "2xl": "1.65rem",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#594e3f",
            a: {
              color: "#8a4044",
              "&:hover": {
                color: "#6b3235",
              },
            },
            h1: { color: "#594e3f" },
            h2: { color: "#594e3f" },
            h3: { color: "#594e3f" },
            h4: { color: "#594e3f" },
            h5: { color: "#594e3f" },
            h6: { color: "#594e3f" },
            strong: { color: "#594e3f" },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {},
        },
      },
    }),
  ],
} satisfies Config;

export default config;
