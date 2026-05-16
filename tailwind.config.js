/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Crimson Pro"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        syne: ['"Syne"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        paper: '#f4f1ea',
        skyblue: '#6b9ebb',
        ink: {
          DEFAULT: '#1a1510',
          70: 'rgba(26, 21, 16, 0.70)',
        },
        cream: '#fafaf7',
        mpink: 'rgba(252, 218, 218, 0.45)',
        mcream: 'rgba(250, 247, 242, 0.4)',
        mcyan: 'rgba(224, 247, 247, 0.45)',
      }
    },
  },
  plugins: [],
}
