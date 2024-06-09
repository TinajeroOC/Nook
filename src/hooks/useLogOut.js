import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

export function useLogOut() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const pathname = usePathname()
  const router = useRouter()

  const onLogOut = useCallback(() => {
    setIsLoading(true)
    setError(undefined)
    try {
      Cookies.remove('pb_auth')
      pathname === '/' ? router.refresh() : router.push('/')
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [router, pathname])

  return { onLogOut, isLoading, error }
}
