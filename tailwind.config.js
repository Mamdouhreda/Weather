module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color1': '#9E9E9E',
        'color2': '#FF3A20',
        'color3': '#29339B',
      },
    },
    fontFamily: {
      'sans': ['Poppins', 'sans-serif'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['Open Sans'],
    },
  },
  plugins: [],
}
