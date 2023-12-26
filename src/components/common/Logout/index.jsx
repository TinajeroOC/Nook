'use client'

import { Button } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove('pb_auth')
    router.push('/login')
  }

  return (
    <Button onClick={handleLogout} color='danger' variant='flat'>
      Logout
    </Button>
  )
}
