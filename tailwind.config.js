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
        paper: '#0f0f1a',
        dark: '#0f0f1a',
        card: '#1a1a2e',
        skyblue: '#00d9ff',
        cyan: '#00d9ff',
        pink: '#ff006e',
        purple: '#8338ec',
        gold: '#ffd60a',
        text: {
          primary: '#f0f0f5',
          secondary: '#b0b0c0',
          tertiary: 'rgba(240, 240, 245, 0.6)',
        },
        ink: {
          DEFAULT: '#f0f0f5',
          70: 'rgba(240, 240, 245, 0.7)',
          45: 'rgba(240, 240, 245, 0.45)',
          20: 'rgba(240, 240, 245, 0.2)',
          '08': 'rgba(240, 240, 245, 0.08)',
        },
        cream: '#f0f0f5',
        mpink: 'rgba(255, 0, 110, 0.1)',
        mcream: 'rgba(0, 217, 255, 0.08)',
        mcyan: 'rgba(0, 217, 255, 0.15)',
      }
    },
  },
  plugins: [],
}
