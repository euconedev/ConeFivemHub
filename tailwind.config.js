/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'bg-main': '#121212',
        'bg-card': '#1e1e1e',
        'border-blue': '#3b82f6',
        'text-purple': '#a78bfa',
        'text-white': '#f5f5f5',
        'btn-blue': '#3B82F6',
        'btn-blue-hover': '#2a71e5',
        'text-text-purple': '#8B5CF6',
      },
    },
  },
  plugins: [],
};
