'use client'

import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

import Logout from '@/components/common/Logout'
import ThemeSwitch from '@/components/common/ThemeSwitch'

export default function Header({ user }) {
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
  )
}
