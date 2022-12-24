const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", ...defaultTheme.fontFamily.sans],
        serif: ["Playfair Display", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        "primary-dark": "#3d3d3d",
        "primary-light": "#f2f2f2",
        "secondary-dark": "#404040",
        "secondary-light": "#ffffff",
      },
    },
  },
  plugins: [],
};
