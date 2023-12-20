import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

import Logout from '@/components/auth/Logout'
import ThemeSwitch from '@/components/common/ThemeSwitch'
import RootFooter from '@/components/layout/footer/RootFooter'
import { initPocketBaseServer } from '@/lib/pocketbase/initPocketBaseServer'

export default async function Layout({ children }) {
  const pb = await initPocketBaseServer()
  const user = pb.authStore.model

  return (
    <div className='relative flex min-h-screen flex-col'>
      <Navbar isBordered height='4.5rem'>
        <NavbarBrand>
          <p className='select-none text-2xl font-semibold text-inherit'>Nook</p>
        </NavbarBrand>
        <NavbarContent justify='end'>
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          {user ? (
            <>
              <NavbarItem>
                <Button as={Link} color='default' href='dashboard' variant='flat'>
                  Dashboard
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Logout />
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem>
                <Button as={Link} color='default' href='login' variant='flat'>
                  Log In
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color='primary' href='signup' variant='flat'>
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
      <main className='container mx-auto flex h-auto max-w-5xl flex-grow flex-col justify-center gap-12 p-6'>
        {children}
      </main>
      <RootFooter />
    </div>
  )
}
