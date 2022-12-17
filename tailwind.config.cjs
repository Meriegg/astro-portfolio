/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "main-bg": "#000000",
        "dark-contrast": "#191919",
        "text-primary": "#FFFFFF",
        "text-secondary": "#B2B2B2",
        "green-accent": "#4ADE80",
        "terminal-blue": "#3B78FF",
        "terminal-red": "#E74856",
        "terminal-green": "#13A10E",
        "terminal-bright-green": "#16C60C",
        "terminal-yellow": "#C19C00",
        "hover-contrast": "rgba(255, 255, 255, 0.2)",
        "opaque-gray": "rgba(255, 255, 255, 0.3)",
      },
      screens: {
        "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }

        xsm: { max: "359px" },
        // => @media (max-width: 359px) { ... }
      },
    },
  },
  plugins: [],
};
