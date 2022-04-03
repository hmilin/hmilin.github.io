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
        h1: { fontSize: theme("fontSize.2xl") },
        h2: { fontSize: theme("fontSize.xl") },
        h3: { fontSize: theme("fontSize.lg") },
        h4: { fontSize: theme("fontSize.base") },
        h5: { fontSize: theme("fontSize.sm") },
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
        "ul > li::before": {
          content: '""',
          width: "0.75em",
          height: "0.125em",
          position: "absolute",
          top: "calc(0.875em - 0.0625em)",
          left: 0,
          borderRadius: "999px",
          backgroundColor: theme("colors.slate.300"),
        },
        a: {
          fontWeight: theme("fontWeight.semibold"),
          textDecoration: "none",
          borderBottom: `1px solid ${theme("colors.sky.300")}`,
        },
        "a:hover": {
          borderBottomWidth: "2px",
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
          padding: theme("padding.2"),
          boxShadow: theme("boxShadow.md"),
          display: "flex",
          marginTop: `${20 / 14}em`,
          marginBottom: `${32 / 14}em`,
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
