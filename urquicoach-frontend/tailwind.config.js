/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados para el look deportivo
        dark: "#121212",
        card: "#1E1E1E",
      }
    },
  },
  plugins: [],
}