
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['PT Sans', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'glow-gold': {
          '0%, 100%': { boxShadow: '0 0 10px 2px rgba(255,185,0,0.4)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(255,185,0,0.8)' },
        },
        'glow-purple': {
            '0%, 100%': { boxShadow: '0 0 10px 2px rgba(192,38,211,0.4)' },
            '50%': { boxShadow: '0 0 20px 5px rgba(192,38,211,0.8)' },
        },
        'glow-blue': {
            '0%, 100%': { boxShadow: '0 0 10px 2px rgba(59,130,246,0.4)' },
            '50%': { boxShadow: '0 0 20px 5px rgba(59,130,246,0.8)' },
        },
        'glow-green': {
            '0%, 100%': { boxShadow: '0 0 10px 2px rgba(34,197,94,0.4)' },
            '50%': { boxShadow: '0 0 20px 5px rgba(34,197,94,0.8)' },
        },
        'glow-red': {
            '0%, 100%': { boxShadow: '0 0 10px 2px rgba(239,68,68,0.4)' },
            '50%': { boxShadow: '0 0 20px 5px rgba(239,68,68,0.8)' },
        },
        'glow-cyan': {
            '0%, 100%': { boxShadow: '0 0 10px 2px rgba(6,182,212,0.4)' },
            '50%': { boxShadow: '0 0 20px 5px rgba(6,182,212,0.8)' },
        },
        'glow-pink': {
            '0%, 100%': { boxShadow: '0 0 10px 2px rgba(219,39,119,0.4)' },
            '50%': { boxShadow: '0 0 20px 5px rgba(219,39,119,0.8)' },
        },
        'glow-teal': {
            '0%, 100%': { boxShadow: '0 0 10px 2px rgba(20,184,166,0.4)' },
            '50%': { boxShadow: '0 0 20px 5px rgba(20,184,166,0.8)' },
        },
        'glow-orange': {
            '0%, 100%': { boxShadow: '0 0 10px 2px rgba(249,115,22,0.4)' },
            '50%': { boxShadow: '0 0 20px 5px rgba(249,115,22,0.8)' },
        },
        'glow-indigo': {
            '0%, 100%': { boxShadow: '0 0 10px 2px rgba(99,102,241,0.4)' },
            '50%': { boxShadow: '0 0 20px 5px rgba(99,102,241,0.8)' },
        },
        'glow-lime': {
            '0%, 100%': { boxShadow: '0 0 10px 2px rgba(132,204,22,0.4)' },
            '50%': { boxShadow: '0 0 20px 5px rgba(132,204,22,0.8)' },
        },
        'glow-rose': {
            '0%, 100%': { boxShadow: '0 0 10px 2px rgba(244,63,94,0.4)' },
            '50%': { boxShadow: '0 0 20px 5px rgba(244,63,94,0.8)' },
        },
        'glow-emerald': {
            '0%, 100%': { boxShadow: '0 0 10px 2px rgba(16,185,129,0.4)' },
            '50%': { boxShadow: '0 0 20px 5px rgba(16,185,129,0.8)' },
        },
        'glow-sky': {
            '0%, 100%': { boxShadow: '0 0 10px 2px rgba(14,165,233,0.4)' },
            '50%': { boxShadow: '0 0 20px 5px rgba(14,165,233,0.8)' },
        },
        'glow-amber': {
            '0%, 100%': { boxShadow: '0 0 10px 2px rgba(245,158,11,0.4)' },
            '50%': { boxShadow: '0 0 20px 5px rgba(245,158,11,0.8)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        spin: 'spin 4s linear infinite',
        'glow-gold': 'glow-gold 2s ease-in-out infinite',
        'glow-purple': 'glow-purple 2s ease-in-out infinite',
        'glow-blue': 'glow-blue 2s ease-in-out infinite',
        'glow-green': 'glow-green 2s ease-in-out infinite',
        'glow-red': 'glow-red 2s ease-in-out infinite',
        'glow-cyan': 'glow-cyan 2s ease-in-out infinite',
        'glow-pink': 'glow-pink 2s ease-in-out infinite',
        'glow-teal': 'glow-teal 2s ease-in-out infinite',
        'glow-orange': 'glow-orange 2s ease-in-out infinite',
        'glow-indigo': 'glow-indigo 2s ease-in-out infinite',
        'glow-lime': 'glow-lime 2s ease-in-out infinite',
        'glow-rose': 'glow-rose 2s ease-in-out infinite',
        'glow-emerald': 'glow-emerald 2s ease-in-out infinite',
        'glow-sky': 'glow-sky 2s ease-in-out infinite',
        'glow-amber': 'glow-amber 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

    

    

    