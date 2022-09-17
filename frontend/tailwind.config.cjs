/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {


      colors: {
        "theme-green": "#86EFAC",
        "theme-black": "#111827",
      },
    },
  },
  plugins: [],
};
