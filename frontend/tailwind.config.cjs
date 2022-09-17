/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        "theme-green": "#86EFAC",
        "theme-black": "#111827",
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
