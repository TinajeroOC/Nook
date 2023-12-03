import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

import pb from '../pocketbase/initPocketBase'

export function useAuthUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const cookie = Cookies.get('pb_auth')

    async function fetchUser() {
      setUser(pb.getAuthUser(cookie))
    }

    fetchUser()
  }, [])

  return user
}
