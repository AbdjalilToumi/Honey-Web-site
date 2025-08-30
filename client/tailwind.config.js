/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'section-1-bottom': '',
      },
      boxShadow: {
        'header-shdow': '-5px -5px 50px rgba(0, 0, 0, 0.25)',
        'side-shdow': '20% -10px 50px rgba(0, 0, 0, 0.35)',
        'title-shadow': '2px 2px 5px rgba(0, 0, 0, 0.6);',
        'send-button': "1px 1px 50px #ffff00b2",
      },
      backgroundImage: {
        'section-1': "url('/Hero.jpg')",
        'section-1-mobile': "url('/mobile-section-1.jpg')",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
