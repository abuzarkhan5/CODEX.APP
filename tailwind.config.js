/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          light: "#F8FAFC",
          dark: "#0F172A"
        }
      }
    }
  },
  plugins: []
};
