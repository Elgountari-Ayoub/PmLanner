/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      // dcbfff
      colors: {
        "golden-goal": "#FFA07A",
        "silver-goal": "#FFA07A",
        "bronze-goal": "#FFA07A",
        "golden-goal-light": "#FEBFA8",
        "silver-goal-light": "#FEBFA8",
        "bronze-goal-light": "#FEBFA8",
      },
      boxShadow: {
        goal: "0px 0px 10px rgba(0, 0, 0, 0.3)",
      },
      scale: {
        101: "1.01",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
