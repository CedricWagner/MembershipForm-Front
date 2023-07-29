module.exports = {
  content: ['index.html','./src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      colors: {
        primary: "#facd05",
        secondary: "#3c83c8",
        dark: "#282828",
        scale: {
          "-100": "-1",
        },
      },
    },
  },
  plugins: [],
}
