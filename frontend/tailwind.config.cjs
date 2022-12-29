/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        "theme-green": "#86EFAC",
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
      }

    },
  },
  plugins: [],
};
