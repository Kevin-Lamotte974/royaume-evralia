/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'forest': "url('/bg.webp')",
        'night-forest': "url('/bg2.webp')",
      },
      colors: {
        primary: '#4169E1', // Bleu Royal
        secondary: '#E6E6FA', // Argent
        background: '#FFFFF0', // Ivoire
        text: '#2F4F4F', // Gris Foncé
      },
    }
  },
  plugins: [],
}