/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 Scan all React components
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",      // Indigo
        secondary: "#fbbf24",    // Amber
        soft: "#f1f5f9"          // Light grayish blue
      },
      fontFamily: {
        marathi: ['"Baloo 2"', 'Mukta', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', 'Mukta', 'sans-serif'],
        english: ['"Inter"', 'sans-serif'], // or whatever you like
      },
    },
  },
  plugins: [],
};