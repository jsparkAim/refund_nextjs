/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "360px",
      tablet: "768px",
      desktop: "1280px",
    },
    extend: {},
  },
  plugins: [],
};
