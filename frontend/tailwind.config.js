/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1400px'
      },
    },
    extend: {
      backgroundImage: {
        fundo: 'url("/assets/init_background.jpg")',
        dashboard: 'url("/assets/dashboard_background.jpg")',
      },
      boxShadow: {
        custom: '0px 3.17px 19.04px rgba(189, 189, 189, 0.23)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        comicNeue: ['Comic Neue', 'sans-serif'],
      },
      fontSize: {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '5rem',
      },
      colors: {
        primaryLight: '#FCFCFC',
        secondaryLight: '#666666',
        buttonModal: '#FBBC05',
        buttonModalHover: '#F9A825',
        fontPrimaryLight: '#FFF',
        fontPrimaryDark: '#100F14',
        primaryDark: '#19181F',
        secondaryDark: '#010B0F',
        tertiaryDark: '#0F172A',
        ringColor: '#CBCAD7',
        ringRedColor: '#ef4444',
        homeButton: '#9EE2FF',
        labelInput: '#49475A',
        

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.responsive-px': {
          paddingLeft: '0.5rem',  // px-2
          paddingRight: '0.5rem',
          '@screen sm': {
            paddingLeft: '4rem',   // sm:px-16
            paddingRight: '4rem',
          },
          '@screen md': {
            paddingLeft: '5rem',   // md:px-20
            paddingRight: '5rem',
          },
          '@screen lg': {
            paddingLeft: '6rem',   // lg:px-24
            paddingRight: '6rem',
          },
        },
      });
    },
  ],
}