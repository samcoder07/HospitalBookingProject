/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{jsx,ts,js,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0067FF",
        yellowColor: "#FEB60D",
        purpleColor: "#9771FF",
        irisBlueColor: "#01B5C5",
        headingColor: "#181A1E",
        textColor: "#4ES45F"
      },
      // boxShadow: {
      //   panelShadow: "rgba(17,12,46,.15) 0px 48px 100px 0px;"
      // }
    },
  },
  plugins: [],
}

