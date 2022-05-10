const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      title: ["'Baloo 2'", "sans-serif"],
      paragraph: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        bgcolor: "var(--background)",
        bgcolor2: "var(--background2)",
        txtcolor: "var(--text)",
        txtcolor2: "var(--text2)",
        error: "var(--error)",
        success: "var(--success)",
        warning: "var(--warning)",
        info: "var(--info)",
        accent: "var(--accent)",
        accent2: "var(--accent2)",
      },
    },
  },
  plugins: [
    plugin(
      ({ matchUtilities, theme }) => {
        matchUtilities(
          {
            textshadow: value => ({
              textShadow: value,
            }),
          },
          { values: theme("textShadow") }
        );
      },
      {
        theme: {
          textShadow: {
            default:
              "0px 0px 1px rgb(0 0 0 / 20%), 0px 0px 1px rgb(1 0 5 / 10%)",
            sm: "1px 1px 3px rgb(36 37 47 / 25%)",
            md: "0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)",
            lg: "3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)",
            xl: "1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)",
            none: "none",
          },
        },
      }
    ),
  ],
};
