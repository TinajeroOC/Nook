import { useEffect, useState } from 'react'

export default function useHost() {
  const [host, setHost] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHost(window.location.host)
    }
  }, [])

  return host
}
