'use client'

import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

import ThemeSwitch from '@/components/common/ThemeSwitch'
import useLogOut from '@/hooks/useLogOut'

export default function Header({ user }) {
  const { onLogOut, isLoading, error } = useLogOut()

  return (
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
              <Button onPress={onLogOut} isLoading={isLoading} variant='flat' color='danger'>
                Logout
              </Button>
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
  )
}
