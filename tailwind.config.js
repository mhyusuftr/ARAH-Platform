/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        riasec: {
          r: '#3B82F6', // Blue
          i: '#10B981', // Green
          a: '#8B5CF6', // Purple
          s: '#F59E0B', // Yellow
          e: '#EF4444', // Red
          c: '#374151', // Gray
        }
      }
    },
  },
  plugins: [],
}
