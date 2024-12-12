/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue": "#0056A4",
        "green": "#4DB848",
        "red": "#E83434",
      },
    },
  },
  darkMode: "class",
  plugins: [daisyui, nextui()],
};
