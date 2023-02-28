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
        'gray-light': '#E0E0E0',
        danger: '#DA1E28',
        white: '#fff',
        black: '#000',
        body: '#f0f0f0',
      },

      fontFamily: {
        dana: ['dana-fanum', 'Arial', 'sans-serif'],
      },
    },
    fontFamily: {
      body: ['"dana-fanum"'],
    },
  },
  plugins: [],
};
