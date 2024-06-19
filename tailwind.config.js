/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "350px",
        md: "600px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1380px",
      },
    },
    extend: {
      colors: {
        primary: "#0aad0a"
      },
      fontFamily: {
        cairo: 'Cairo'
      }
    },
  },
  plugins: [],
};
