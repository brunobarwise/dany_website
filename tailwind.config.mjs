/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mer: {
          DEFAULT: '#1E6091',
          dark: '#0B3B6A',
          light: '#2A7FC7',
        },
        turquoise: '#1EACB7',
        ecume: '#E8F4F8',
        sable: {
          DEFAULT: '#D4AA72',
          dark: '#B8894A',
        },
        dusk: '#2D3748',
        muted: '#6B7280',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
