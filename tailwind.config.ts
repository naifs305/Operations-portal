import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#016564',
          50: '#e6f2f1',
          100: '#cde6e4',
          200: '#9bcdca',
          300: '#69b5af',
          400: '#379c95',
          500: '#016564',
          600: '#015857',
          700: '#014b4a',
          800: '#013d3c',
          900: '#012f2f'
        },
        gold: {
          DEFAULT: '#d0b284',
          50: '#fbf7f1',
          100: '#f6efe3',
          200: '#eddcc6',
          300: '#e3caab',
          400: '#d0b284',
          500: '#c2a16f',
          600: '#a88758',
          700: '#866b45',
          800: '#655033',
          900: '#443521'
        },
        support: {
          light: '#f8f9f9',
          gray: '#d6d7d4',
          muted: '#98aaaa',
          teal: '#498983',
          burgundy: '#7c1e3e',
          brown: '#8c6968'
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif']
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.06)'
      }
    }
  },
  plugins: []
};

export default config;
