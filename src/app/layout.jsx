import './globals.css'

import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/Toaster'
import { AppProvider } from '@/providers/AppProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nook',
  description: 'Your corner of the internet',
}

export default async function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  )
}
