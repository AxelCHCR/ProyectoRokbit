import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#6900FF',
        'custom-blue': '#00A3FF',
        'custom-pink': '#BB0081',
        'custom-dark-blue': '#1983bf',
        'custom-gray': '#F4F6F9',
        'custom-dark-gray': '#B4B4B4',
        'custom-light-gray': '#E4E6EB',
        'custom-darker-gray': '#101010',
      },
      fontFamily: {
        'poppins': ["var(--font-poppins)"],
      },
    },
  },
  plugins: [],
}

export default config
