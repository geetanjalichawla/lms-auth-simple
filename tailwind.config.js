/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#F3E8FF', // Very light shade
          200: '#D5B9FF', // Light shade
          300: '#B78AFF', // Lighter shade
          400: '#9961FF', // Light shade
          500: '#8C52FF', // Exact primary color
          600: '#7E44E6', // Darker shade
          700: '#713BCD', // Darker shade
          800: '#6433B4', // Darker shade
          900: '#562B9B', // Very dark shade
        },
      },
    },
  },
  plugins: [],
}
