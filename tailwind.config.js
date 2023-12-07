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
      pattern: /from-(blue|purple|green|red|pink|yellow|cyan)-(400)/,
    },
    {
      pattern: /to-(blue|purple|green|red|pink|yellow|cyan)-(600)/,
    },
    {
      pattern: /bg-(blue|purple|green|red|pink|yellow|cyan)-(500)/,
    },
  ],
  darkMode: 'class',
  plugins: [nextui({ addCommonColors: true })],
}
