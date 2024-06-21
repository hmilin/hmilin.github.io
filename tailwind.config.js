const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#DCE1FF',
          100: '#B6C4FF',
          200: '#9AA9E4',
          300: '#7F8EC8',
          400: '#6675AC',
          500: '#4d5c92',
          600: '#415085',
          700: '#354478',
          800: '#29386C',
          900: '#1D2D60',
          950: '#112255',
        },
        amber: {
          950: "#2D2500",
          900: "#393000",
          800: "#463B00",
          700: "#534600",
          600: "#605200",
          500: "#6D5E0E",
          400: "#877728",
          300: "#A3903F",
          200: "#BEAB56",
          100: "#DBC66E",
          50: "#F8E287",
        },
        primary: {
          '50': '#fefde8',
          '100': '#fdf9c4',
          '200': '#fdf28b',
          '300': '#fbe349',
          '400': '#f8d117',
          '500': '#f4c10b',
          '600': '#c88e06',
          '700': '#9f6609',
          '800': '#84500f',
          '900': '#704113',
          '950': '#412107',
        },
      }
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        hr: {
          borderColor: theme("colors.slate.100"),
          marginTop: "3em",
          marginBottom: "3em",
        },
        h1: {
          fontSize: theme("fontSize.2xl"),
          fontWeight: theme("fontWeight.bold"),
        },
        h2: {
          fontSize: theme("fontSize.xl"),
          fontWeight: theme("fontWeight.semibold"),
        },
        h3: {
          fontSize: theme("fontSize.lg"),
          fontWeight: theme("fontWeight.medium"),
        },
        h4: {
          fontSize: theme("fontSize.base"),
          fontWeight: theme("fontWeight.medium"),
        },
        h5: {
          fontSize: theme("fontSize.sm"),
          fontWeight: theme("fontWeight.medium"),
        },
        "h1, h2, h3, h4, h5": {
          marginBottom: "0.6em",
        },
        p: {
          fontSize: theme("fontSize.sm"),
          marginBottom: "1em",
        },
        ul: {
          listStyleType: "none",
          paddingLeft: 0,
        },
        "ul > li": {
          position: "relative",
          paddingLeft: "1.75em",
        },
        a: {
          fontWeight: theme("fontWeight.semibold"),
          color: theme("colors.blue.600"),
        },
        "a:hover": {
          color: theme("colors.blue.400"),
        },
        "a code": {
          color: "inherit",
          fontWeight: "inherit",
        },
        code: {
          fontWeight: theme("fontWeight.medium"),
          fontVariantLigatures: "none",
        },
        pre: {
          color: theme("colors.slate.50"),
          borderRadius: theme("borderRadius.lg"),
          boxShadow: theme("boxShadow.md"),
          display: "flex",
          marginTop: `${20 / 14}em`,
          marginBottom: `${32 / 14}em`,
          overflow: "auto"
        },
        "pre code": {
          borderRadius: theme("borderRadius.lg"),
        },
        "p + pre": {
          marginTop: `${-4 / 14}em`,
        },
        "pre + pre": {
          marginTop: `${-16 / 14}em`,
        },
        "pre > div": {
          flex: "none",
          minWidth: "100%",
        },
      });
    }),
  ],
};
