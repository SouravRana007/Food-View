import lineClamp from "@tailwindcss/line-clamp";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'class' if you want manual dark mode
  theme: {
    extend: {},
  },
  plugins: [lineClamp],
};
