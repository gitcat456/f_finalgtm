/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  /**
   * Dark mode is class-based so JS can toggle it explicitly.
   * Do NOT use @media (prefers-color-scheme: dark) in CSS — they conflict.
   */
  darkMode: 'class',

  theme: {
    extend: {
      // ─── Brand Colour Tokens ───────────────────────────────────────────────
      // Primary: indigo family (used for interactive elements, headings)
      // Secondary: violet/purple family (used for gradients, accents)
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
      },

      // ─── Typography ────────────────────────────────────────────────────────
      // 'sans' maps to Inter (loaded in index.html) — this MUST be declared so
      // Tailwind utilities like `font-sans` resolve correctly.
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Georgia', 'serif'],
      },

      // ─── Font Scale ────────────────────────────────────────────────────────
      fontSize: {
        xs:   ['0.75rem',  { lineHeight: '1rem'    }],
        sm:   ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem',     { lineHeight: '1.5rem'  }],
        lg:   ['1.125rem', { lineHeight: '1.75rem' }],
        xl:   ['1.25rem',  { lineHeight: '1.75rem' }],
        '2xl':['1.5rem',   { lineHeight: '2rem'    }],
        '3xl':['1.875rem', { lineHeight: '2.25rem' }],
        '4xl':['2.25rem',  { lineHeight: '2.5rem'  }],
        '5xl':['3rem',     { lineHeight: '1.1'     }],
        '6xl':['3.75rem',  { lineHeight: '1'       }],
      },

      // ─── Animations ────────────────────────────────────────────────────────
      // Only declare animations that are NOT handled by Framer Motion.
      // Framer Motion manages all scroll-reveal / page-transition animations.
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },

      // ─── Spacing ───────────────────────────────────────────────────────────
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },

      // ─── Shadows ───────────────────────────────────────────────────────────
      boxShadow: {
        'card':     '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)',
        'elevated': '0 20px 25px -5px rgba(0,0,0,0.10), 0 10px 10px -5px rgba(0,0,0,0.04)',
        'glow':     '0 0 0 3px rgba(79,70,229,0.3)',
      },

      // ─── Border Radius ─────────────────────────────────────────────────────
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
