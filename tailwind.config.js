const colors = require("./theme-colors.config");
console.log(JSON.stringify(colors, null,2))
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./devtools/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    letterSpacing: {
      tightest: "-.14em",
      tighter: "-.07em",
      tight: "0",
      normal: ".07em",
      wide: ".14em",
    },
    extend: {
      fontSize: {
        xxs: "9px",
        xs: "10px",
        sm: "12px",
        md: "15px",
        lg: "19px",
        xl: "23px",
        "2xl": "29px",
      },
      colors: colors,
    },
  },
  plugins: [],
};
