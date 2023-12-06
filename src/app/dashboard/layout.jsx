'use client'

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import { IconDeviceDesktop, IconHelp, IconLogout2 } from '@tabler/icons-react'
import format from 'date-fns/format'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import Footer from '@/components/layouts/Footer'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { useAuthUser } from '@/lib/hooks/useAuthUser'

export default function Layout({ children }) {
  const authUser = useAuthUser()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      Cookies.remove('pb_auth')
      router.push('/login')
    } catch (error) {}
  }

  return (
    <>
      <Navbar isBordered height='4.5rem'>
        <NavbarBrand>
          <p className='select-none text-2xl font-semibold text-inherit'>Nook</p>
        </NavbarBrand>
        <NavbarContent justify='end'>
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          {authUser && (
            <>
              <NavbarItem>
                <Dropdown placement='bottom-end'>
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      showFallback
                      as='button'
                      className='transition-transform'
                      color='default'
                      name={authUser.name}
                      size='md'
                      src=''
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label='Profile Actions' variant='flat'>
                    <DropdownItem showDivider isReadOnly key='summary' className='h-12 gap-2'>
                      <p className='font-semibold'>{authUser.name.substring(0, 18)}</p>
                      <p className='text-xs font-light'>
                        Joined {format(new Date(authUser.created), 'MMMM, yyyy')}
                      </p>
                    </DropdownItem>
                    <DropdownItem
                      key='dashboard'
                      startContent={<IconDeviceDesktop size='20' />}
                      href='/dashboard'
                    >
                      Dashboard
                    </DropdownItem>
                    <DropdownItem
                      showDivider
                      key='help'
                      startContent={<IconHelp size='20' />}
                      href='/help'
                    >
                      Help
                    </DropdownItem>
                    <DropdownItem
                      closeOnSelect
                      key='logout'
                      color='danger'
                      startContent={<IconLogout2 size='20' />}
                      onClick={handleLogout}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
      <main className='mx-auto h-[calc(100vh_-_146px)] w-full max-w-5xl gap-8 p-6'>{children}</main>
      <Footer />
    </>
  )
}