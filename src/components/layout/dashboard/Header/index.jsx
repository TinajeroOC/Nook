'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

import Logout from '@/components/common/Logout'
import ThemeSwitch from '@/components/common/ThemeSwitch'

export default function Header() {
  return (
    <Navbar isBordered height='4.5rem'>
      <NavbarBrand>
        <p className='select-none text-2xl font-semibold text-inherit'>Nook</p>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Logout />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
