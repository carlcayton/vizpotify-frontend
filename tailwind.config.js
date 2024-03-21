/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      colors: {
        "theme-green": "#1DB954",
        "theme-green-1": "#21C25C",
        "theme-black": "#111827",
        "theme-dark-indigo": "#374151"
      },
      invert: {
        101: '.91',
      },
      sepia: {
        101: '.16'
      },
      saturate: {
        101: '10.57'
      },
      hueRotate: {
        101: '75deg'
      },
      contrast: {
        101: '.1'
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("daisyui")
  ],
}