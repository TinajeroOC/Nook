import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

import Logout from '@/components/auth/Logout'
import ThemeSwitcher from '@/components/common/ThemeSwitcher'
import RootFooter from '@/components/layout/footer/RootFooter'

export default async function Layout({ children }) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <Navbar isBordered height='4.5rem'>
        <NavbarBrand>
          <p className='select-none text-2xl font-semibold text-inherit'>Nook</p>
        </NavbarBrand>
        <NavbarContent justify='end'>
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          <NavbarItem>
            <Logout />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main className='container mx-auto h-auto max-w-5xl flex-grow p-6'>{children}</main>
      <RootFooter />
    </div>
  )
}
