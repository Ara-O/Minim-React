/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "minim-gray-a": "#1D1D1D",
        "minim-gray-b": "#1A1A1A",
      },
      backgroundImage: {
        "hexagon-pattern": "url('src/assets/backgrounds/hexagon-pattern.png')",
      },
    },
  },
  plugins: [],
};
