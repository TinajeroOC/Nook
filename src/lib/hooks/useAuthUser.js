import { useEffect, useState } from 'react'

import { getPocketBaseClient } from '../pocketbase/initPocketBaseClient'

export function useAuthUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const pb = getPocketBaseClient()
    setUser(pb.authStore.model)
  }, [])

  return user
}
