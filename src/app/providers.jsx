'use client'

import { AuthProvider } from '@/components/context/authContext'
import { NextUIProvider } from '@nextui-org/react'

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </AuthProvider>
  )
}
