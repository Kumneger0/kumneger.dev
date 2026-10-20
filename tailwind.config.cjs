const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      lineHeight: {
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
      },
      fontFamily: {
        sans: ["Onest", ...fontFamily.sans],
        mono: ['"JetBrains Mono"', '"Fira Code"', "Menlo", "Monaco", "Consolas", "monospace"],
      },
      colors: {
        primary: {
          50: '#f0fde4',
          100: '#dcfbb4',
          200: '#c6f78a',
          300: '#b6f09c',
          400: '#a3e87a',
          500: '#8ad45e',
          600: '#6db348',
          700: '#518f34',
          800: '#376b22',
          900: '#1e4712',
        },
        terminal: {
          bg: '#080a08',
          surface: '#101510',
          text: '#f0f2ed',
          muted: '#aab3a7',
          accent: '#b6f09c',
          border: '#1e2a1e',
        },
        gray: {
          50: '#f0f2ed',
          100: '#e0e4db',
          200: '#c5cbbf',
          300: '#aab3a7',
          400: '#8a9485',
          500: '#6b7566',
          600: '#4d5548',
          700: '#2d3529',
          800: '#1e2a1e',
          900: '#101510',
          950: '#080a08',
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.terminal.accent"),
              "&:hover": {
                color: theme("colors.primary.200"),
              },
              code: { color: theme("colors.terminal.accent") },
            },
            "h1,h2": {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
            },
            h3: {
              fontWeight: "600",
            },
            code: {
              color: theme("colors.terminal.accent"),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme("colors.terminal.accent"),
              "&:hover": {
                color: theme("colors.primary.200"),
              },
              code: { color: theme("colors.terminal.accent") },
            },
            "h1,h2,h3,h4,h5,h6": {
              color: theme("colors.terminal.text"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
