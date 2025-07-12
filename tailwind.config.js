module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'aquarius-dark': '#1a365d',
        'aquarius-light': '#4a69bd',
        'aquarius-accent': '#82ccdd',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
