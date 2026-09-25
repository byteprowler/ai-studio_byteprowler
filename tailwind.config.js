/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050507",
        "slate-dark": "#0c0d12",
        "dark-gray": "#12131a",
        "neon-lime": "#c5ff00",
        "neon-blue": "#00f3ff",
        "neon-purple": "#b65cff",
        "neon-green": "#00ff66",
        "neon-red": "#ff1a1a",
        "neon-nav-blue": "#00f3ff",
      },
      fontFamily: {
        sans: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        "glow-lime": "0 0 12px rgba(197, 255, 0, 0.18)",
        "glow-blue": "0 0 12px rgba(0, 243, 255, 0.18)",
        "glow-purple": "0 0 12px rgba(157, 0, 255, 0.18)",
      },
    },
  },
  plugins: [],
}
