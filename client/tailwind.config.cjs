module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pri_orange: "#ff8100",
        darkBg: "#202226",
        darkNavprimary: "#282d35",
        darkNavsecondary: "#36393f",
      },
    },
  },
  plugins: [],
};
