const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
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
          color: theme("colors.indigo.600"),
        },
        "a:hover": {
          color: theme("colors.indigo.400"),
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
