/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // add all color from colors.json to safelist
  safelist: [
    'bg-red-700',
    'bg-red-800',
    'bg-blue-600',
    'bg-blue-700',
    'bg-green-400',
    'bg-green-500',
    'bg-yellow-400',
    'bg-yellow-500',
    'bg-purple-600',
    'bg-purple-500',
    'bg-pink-900',
    'bg-rose-900',
    'bg-indigo-800',
    'bg-indigo-700',
    'bg-neutral-900',
    'bg-neutral-800',
    'bg-emerald-200',
    'bg-green-200',
    'bg-blue-800',
    'bg-teal-800',
    'bg-teal-900',
    'bg-slate-600',
    'bg-gray-600',
    'bg-amber-400'
  ]
}