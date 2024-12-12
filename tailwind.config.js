/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue": "#0056A4",
        "green": "#4DB848",
        "red": "#E83434"
      }
    },
  },
  plugins: [],
}

