/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#00539A',
        secondary: '#0072C3',
        background: '#F4F4F4',
        'gray-mid': '#8D8D8D',
        'gray-dark': '#262626',
        danger: '#DA1E28',
        white: '#fff',
        black: '#000',
      },

      fontFamily: {
        dana: ['dana-fanum', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
