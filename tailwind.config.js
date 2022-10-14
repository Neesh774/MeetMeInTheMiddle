/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["SignPainter", "serif"],
        sans: ["Lexend Deca", "sans-serif"],
      },
      colors: {
        primary: {
          600: "#ED4548",
          400: "#EF5D60",
        },
        secondary: {
          600: "#DB926B",
          400: "#E09F7D",
        },
        tertiary: {
          600: "#81b29a",
          400: "#81b29a",
        },
      },
    },
    keyframes: {
      modalOpen: {
        "0%": {
          opacity: 0,
          transform: "translateY(20%)",
        },
        "100%": {
          opacity: 1,
          transform: "translateY(0%)",
        },
      },
    },
    animation: {
      modalOpen: "modalOpen 0.3s ease-in-out",
    },
  },
  plugins: [],
};
