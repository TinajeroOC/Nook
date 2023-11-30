import { Inter } from 'next/font/google'
import Providers from '../providers'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Log In or Sign Up',
}

export default function AuthLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <main className='flex min-h-screen flex-1 flex-col overflow-hidden p-8'>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
