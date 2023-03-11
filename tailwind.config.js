/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  safelist: [
    'bg-slate-50', 'bg-stone-50', 'bg-cosmic-50',
    'text-slate-400', 'text-stone-400', 'text-cosmic-400',
    'text-slate-600', 'te85xt-stone-600', 'text-cosmic-600',
    'text-slate-800', 'text-stone-800', 'text-cosmic-800',
    'text-slate-900', 'text-stone-900', 'text-cosmic-900',
    'stroke-slate-500', 'stroke-stone-500', 'stroke-cosmic-500',
    'accent-slate-600', 'accent-stone-600', 'accent-cosmic-600',
    'border-slate-300', 'border-stone-300', 'border-cosmic-300',
    'border-slate-400', 'border-stone-400', 'border-cosmic-400',
    'sm:module-slate-border', 'sm:module-stone-border', 'sm:module-cosmic-border'
  ],
  theme: {
    extend: {
      colors: {
        cosmic: { // Indigo but 400 up shifted 2 shades darker.
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#8f8be5',
          500: '#8f8be5',
          600: '#6159c7',
          700: '#1e3a8a',
          800: '#1e3a8a',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}
