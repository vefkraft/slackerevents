/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/src/**/*.{js,ts,jsx,tsx,mdx}",
    // Tilføj evt. andre paths hvis du har komponenter andre steder
  ],
  theme: {
    extend: {
      fontFamily: {
        squada: ['"Squada One"', 'sans-serif'],
        // Hvis du vil gøre Squada One til default sans:
        sans: ['"Squada One"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};