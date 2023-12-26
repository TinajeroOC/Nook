'use client'

import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export default function AppContextProvider({ children }) {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider defaultTheme='dark'>{children}</NextThemesProvider>
    </NextUIProvider>
  )
}
