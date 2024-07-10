/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translate(0px)" },
          "100%": { transform: "translate(100%)" },
        },
      },
      animation: {
        ["slide-in"]: "slide 0.2s ease-out",
        ["slide-out"]: "slide 0.2s ease-in reverse",
      },
    },
  },
  plugins: [],
};
