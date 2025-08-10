/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ChelseaMarket : [ "Chelsea Market", "system-ui"]
      },
    },
  },
  plugins: [],
}

