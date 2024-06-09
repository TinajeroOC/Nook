import { useCallback, useState } from 'react'

import { authenticateUser } from '@/actions/auth'

export function useLogIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState()
  const [error, setError] = useState()

  const onLogIn = useCallback(async (email, password) => {
    setIsLoading(true)
    setUser(undefined)
    setError(undefined)
    try {
      const user = await authenticateUser(email, password)
      setUser(user)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { onLogIn, isLoading, user, error }
}
