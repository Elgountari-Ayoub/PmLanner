/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" 
  ],
  theme: {
    extend: {
      colors: {
        'golden-goal': '#FFD700',
        'silver-goal': '#C0C0C0',
        'bronze-goal': '#CD7F32',
        'golden-goal-light': '#ffe34d',
        'silver-goal-light': '#cdcdcd',
        'bronze-goal-light': '#d28c47',
      },
      boxShadow: {
        // 'golden': '0rem 0rem .1rem .1rem theme("colors.golden-goal-shadow")',
        'goal': '0px 0px 10px rgba(0, 0, 0, 0.3)',
      },
      scale: {
        '101': '1.01',
        '102': '1.02',
        '103': '1.03',
        '104': '1.04',
      }
    },
  },
  plugins: [
    require('flowbite/plugin') 
  ],
}

