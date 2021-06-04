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
          'gray-300': '#F3F3FB',
          'gray-400': 'rgba(112, 124, 151, 0.1)'
        }
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        montserrat: "'Montserrat', sans-serif",
        quicksand: "'Quicksand', sans-serif"
      },
      height: {
        message: '505px'
      },
      minHeight: {
        '2xl': '665px',
        chat: '220px',
        page: '722px',
      },
      maxWidth: {
        nav: '290px',
        message: '505px'
      },
      boxShadow: {
        nav: '16px 10px 25px 0 rgba(86,128,248,0.03), 35px 10px 70px 0 rgba(86,128,248,0.05), 24px 6px 70px 0px rgba(0,0,0,0.02)',
        navlink: '1px 0 10px rgba(42, 139, 242, 0.45), 0 0 10px rgba(42, 139, 242, 0.55), 4px 0 25px rgba(42, 139, 242, 0.75)',
        chat: '0 7px 12px rgb(0,0,0, 0.01), 0 0 12px 0px rgb(0,0,0,0.08), -1px 0 5px rgb(0,0,0,0.01)',
        message: '0 10px 55px rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.02), 0 10px 25px rgba(0, 0, 0, 0.05)',
        send: '4px 4px 25px rgba(42, 139, 242, 0.15), 2px 2px 25px rgba(42, 139, 242, 0.05), 4px 6px 10px rgba(42, 139, 242, 0.15);',
        'message-alt': '10px 10px 20px rgba(42, 139, 242, 0.1), 15px 15px 25px rgba(42, 139, 242, 0.05), 10px 10px 22px rgba(42, 139, 242, 0.01)'
      },
      flex: {
        full: '0 0 100%'
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
      flexGrow: ['even']
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
