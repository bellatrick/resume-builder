/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateX(-32px)", opacity: "0" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },
        topSlide: {
          "0%": { transform: "translateY(-32px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        downSlide: {
          "0%": { transform: "translateY(32px)", opacity: "1" },
          "100%": { transform: "translateY(0px)", opacity: "0" },
        },
      },
      animation: {
        slide: "slide .8s ease-in-out",
        topslide: "topSlide .8s ease-in-out",
        downslide: "downSlide .8s ease-in-out",
      },
      colors: {
        body: "#F8F8F8",
        primary1: "#26B8E1",
        primary2: "#51bad7",
        lightprimary: "#f2f6f8",
        danger: "#EA5455",
        blue: "#7367F0",
        darkGray: "#6E6B7B",
        darkGray2: "#1D2129",
        dark: "#344054",
        dark2: "#1D2129",
        textGray: "#5E5873",
        textGray2: "#4E5969",
        textGray3: "#667085",
        secondaryDarkGray: " #B9B9C3",
        textBlue: "#175CD3",
        textGreen: "#027A48",
        graphorange:"#FF9F43",
        graphgray:"#5B5B5B",
        graphcyan:"#09CFE7",
        graphred:"#EA5355",
        bgGreen:"#23A540"
      },
      fontFamily: {
        body: ["Montserrat", "sans-serif"],
        helveticabold: ["Helvetica Neue", "Helvetica", "sans-serif"],
        helvetica25: ["Helvetica 25 UltraLight", "Helvetica", "sans-serif"],
        helvetica35: ["Helvetica 35 Thin", "Helvetica", "sans-serif"],
        helvetica45: ["Helvetica 45 Light", "Helvetica", "sans-serif"],
        helvetica55: ["Helvetica 55 Roman", "Helvetica", "sans-serif"],
        helvetica65: ["Helvetica 65 Medium", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
}