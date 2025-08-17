/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",         // if you have this at the root
    "./public/index.html",  // add this to satisfy the check
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
