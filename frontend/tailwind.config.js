// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // IMPORTANTE: Garante que o Tailwind analise seus arquivos JS/JSX/TS/TSX dentro de src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}