/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#00539A",
        "chat-bg-hover": "#EDF5FF",
        "chat-self-msg": "#3DDBD9",
        "chat-others-msg": "#A6C8FF",
      },
      spacing: {},
    },
  },
  plugins: [],
};
