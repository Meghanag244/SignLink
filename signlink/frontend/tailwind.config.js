/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom colors for high contrast mode
        'high-contrast': {
          text: '#000000',
          background: '#FFFFFF',
          primary: '#0000FF',
          secondary: '#FF0000',
        },
      },
    },
  },
  plugins: [],
}
