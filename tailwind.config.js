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
        sans: ["Geist", "Inter", "system-ui", "sans-serif"],
        mono: ["Geist Mono", '"JetBrains Mono"', "monospace"],
        display: ['"Playfair Display"', "serif"],
        serif: ['"Crimson Pro"', "serif"],
        "pixel-square": ["var(--font-geist-pixel-square)", "monospace"],
        "pixel-grid": ["var(--font-geist-pixel-grid)", "monospace"],
        "pixel-circle": ["var(--font-geist-pixel-circle)", "monospace"],
        "pixel-triangle": ["var(--font-geist-pixel-triangle)", "monospace"],
        "pixel-line": ["var(--font-geist-pixel-line)", "monospace"],
      },
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        muted: "rgba(255,255,255,0.06)",
        "muted-foreground": "rgba(255,255,255,0.4)",
        border: "rgba(255,255,255,0.1)",
        input: "rgba(255,255,255,0.12)",
        ring: "rgba(255,255,255,0.3)",
        card: "rgba(255,255,255,0.03)",
        "card-foreground": "#ffffff",
        paper: "#0a0a0a",
        dark: "#000000",
        accent: {
          DEFAULT: "rgba(255,255,255,0.08)",
          foreground: "#ffffff",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-right": "slideRight 0.5s ease forwards",
        "slide-left": "slideLeft 0.5s ease forwards",
        "letter-stagger": "letterStagger 0.4s ease forwards",
        "line-draw": "lineDraw 1.5s ease forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "scan": "scan 3s linear infinite",
        "flicker": "flicker 0.15s infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marqueeReverse 30s linear infinite",
        "glow": "glow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(24px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideRight: {
          from: { opacity: 0, transform: "translateX(-32px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideLeft: {
          from: { opacity: 0, transform: "translateX(32px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        letterStagger: {
          from: { opacity: 0, transform: "translateY(20px) rotate(5deg)" },
          to: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
        },
        lineDraw: {
          from: { "stroke-dashoffset": "1000" },
          to: { "stroke-dashoffset": "0" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.8 },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,255,255,0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(255,255,255,0.25)" },
        },
      },
    },
  },
  plugins: [],
}
