/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        facebook: "#2f55a4",
        twitter: "#1DA1F2",
        reddit: "#FF5700",
        youtube: "#FF0000"
      }
    },
  },
  plugins: [],
}

