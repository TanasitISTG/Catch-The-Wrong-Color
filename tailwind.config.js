/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/assets/data/colors.json",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
