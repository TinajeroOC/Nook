'use client'

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

import { ThemeSwitch } from '@/components/ui/ThemeSwitch'
import { useLogOut } from '@/hooks/useLogOut'

export function DashboardHeader() {
  const { onLogOut, isLoading } = useLogOut()

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
          <Button onPress={onLogOut} isLoading={isLoading} variant='flat' color='danger'>
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
