import './globals.css'

import { Inter } from 'next/font/google'

import Toaster from '@/components/common/Toaster'
import AppContextProvider from '@/contexts/AppContextProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nook',
  description: 'Your corner of the internet',
}

export default async function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppContextProvider>
          {children}
          <Toaster />
        </AppContextProvider>
      </body>
    </html>
  )
}
