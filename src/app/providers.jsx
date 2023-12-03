'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export default function Providers({ children }) {
  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme='dark'>{children}</NextThemesProvider>
    </NextUIProvider>
  )
}
