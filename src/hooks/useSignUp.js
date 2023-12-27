import { useCallback, useState } from 'react'

import { createUser } from '@/actions/user'

export default function useSignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState()
  const [error, setError] = useState()

  const onSignUp = useCallback(async (username, name, email, password) => {
    setIsLoading(true)
    setUser(undefined)
    setError(undefined)
    try {
      const user = await createUser(username, name, email, password)
      setUser(user)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { onSignUp, isLoading, user, error }
}
