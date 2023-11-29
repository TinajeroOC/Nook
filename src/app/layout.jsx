import { Inter } from 'next/font/google'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react'
import Footer from '@/components/layout/footer'
import Providers from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nook',
  description: 'Your corner of the internet',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Navbar>
            <NavbarBrand>
              <p className='select-none text-2xl font-light text-inherit'>Nook</p>
            </NavbarBrand>
            <NavbarContent justify='end'>
              <NavbarItem className='hidden sm:flex'>
                <Link href='#'>Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color='primary' href='#' variant='flat'>
                  Sign Up
                </Button>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
