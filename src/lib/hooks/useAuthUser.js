import { useEffect, useState } from 'react'

import { initPocketBaseClient } from '../pocketbase/initPocketBaseClient'

export function useAuthUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      const pb = await initPocketBaseClient()
      setUser(pb.authStore.model)
    }
    fetchUser()
  }, [])

  return user
}
