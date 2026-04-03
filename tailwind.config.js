/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        night: {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a25',
        },
        neon: {
          amber: '#ff9f43',
          pink: '#ff6b9d',
          blue: '#54a0ff',
          purple: '#5f27cd',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
