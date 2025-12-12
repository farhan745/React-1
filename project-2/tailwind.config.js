/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gray:"#5A5959",
        yellow:"#FFEAAE",
        "dark-yellow":"#FCCA3F",
        orange:"#F6820C",
      },
    },
  },
  plugins: [],
}
