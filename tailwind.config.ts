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
  		xs: '450px',
            ...screens
  	},
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			bg: '#ede6e0',
  			bgDark: '#dcd8d5',
  			red: '#8a4044',
  			accent: {
  				DEFAULT: '#bb9c8b',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			textAccent: '#cfd2d3',
  			text: '#594e3f',
  			transparent: 'transparent',
  			current: 'currentColor',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontSize: {
                ...fontSize,
  			'2xl': '1.65rem'
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					color: '#594e3f',
  					a: {
  						color: '#8a4044',
  						'&:hover': {
  							color: '#6b3235'
  						}
  					},
  					h1: {
  						color: '#594e3f'
  					},
  					h2: {
  						color: '#594e3f'
  					},
  					h3: {
  						color: '#594e3f'
  					},
  					h4: {
  						color: '#594e3f'
  					},
  					h5: {
  						color: '#594e3f'
  					},
  					h6: {
  						color: '#594e3f'
  					},
  					strong: {
  						color: '#594e3f'
  					}
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
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
