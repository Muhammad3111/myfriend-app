/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#5932EA",
      },
      screens: {
        sx: { max: "640px" },
      },
    },
  },
  plugins: [],
};
