'use client'

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import format from 'date-fns/format'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import Footer from '@/components/layout/footer'
import { useUserData } from '@/lib/hooks/useUserData'

export default function MarketingLayout({ children }) {
  const user = useUserData()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      Cookies.remove('pb_auth')
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className='select-none text-2xl font-light text-inherit'>Nook</p>
        </NavbarBrand>
        <NavbarContent justify='end'>
          {user ? (
            <>
              <NavbarItem>
                <Dropdown placement='bottom-end'>
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      showFallback
                      radius='lg'
                      as='button'
                      className='transition-transform'
                      color='default'
                      name={user.name}
                      size='sm'
                      src=''
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label='Profile Actions' variant='flat'>
                    <DropdownItem isReadOnly key='summary' className='h-12 gap-2'>
                      <p className='font-semibold'>{user.name.substring(0, 20)}</p>
                      <p className='text-xs font-light'>
                        Joined {format(new Date(user.created), 'MMMM, yyyy')}
                      </p>
                    </DropdownItem>
                    <DropdownItem key='dashboard' href='/dashboard'>
                      Dashboard
                    </DropdownItem>
                    <DropdownItem key='settings' href='/settings'>
                      Settings
                    </DropdownItem>
                    <DropdownItem key='help' href='/help'>
                      Help
                    </DropdownItem>
                    <DropdownItem closeOnSelect key='logout' color='danger' onClick={handleLogout}>
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
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
      <main className='mx-auto flex min-h-screen w-full max-w-5xl flex-grow justify-center'>
        {children}
      </main>
      <Footer />
    </>
  )
}
