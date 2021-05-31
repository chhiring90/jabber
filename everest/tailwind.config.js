module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          tertiary: '#0D1C2E',
          primary: '#2A8BF2',
          secondary: '#FF3366',
          'secondary-100': '#FDFBFD',
          gray: '#707C97',
          'gray-100': '#E6ECFE',
          'gray-200': '#FAFBFF',
          'gray-300': '#F3F3FB'
        }
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        montserrat: "'Montserrat', sans-serif",
        quicksand: "'Quicksand', sans-serif"
      },
      minHeight: {
        '2xl': '665px',
      },
      maxWidth: {
        nav: '290px',
      },
      boxShadow: {
        nav: '16px 10px 25px 0 rgba(86,128,248,0.03), 35px 10px 70px 0 rgba(86,128,248,0.05), 24px 6px 70px 0px rgba(0,0,0,0.02)'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
