import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /bg-(white|black)/,
      pattern: /bg-(blue|purple|green|red|pink|yellow|cyan)-(500)/,
    },
  ],
  darkMode: 'class',
  plugins: [nextui({ addCommonColors: true })],
}
