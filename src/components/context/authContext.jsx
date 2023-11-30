import { createContext, useContext, useCallback, useState, useEffect } from 'react'
import { useInterval } from 'usehooks-ts'
import { jwtDecode } from 'jwt-decode'
import pb from '@/lib/pocketbase/initPocketBase'

const fiveMinutesInMs = 300000
const twoMinutesInMs = 120000

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(pb.authStore.token)
  const [user, setUser] = useState(pb.authStore.model)

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token)
      setUser(model)
    })
  }, [])

  const register = useCallback(async (name, email, password) => {
    return await pb.collection('users').create({ name, email, password, passwordConfirm: password })
  }, [])

  const login = useCallback(async (email, password) => {
    return await pb.collection('users').authWithPassword(email, password)
  }, [])

  const logout = useCallback(() => {
    pb.authStore.clear()
  }, [])

  const refreshSession = useCallback(async () => {
    if (!pb.authStore.isValid) return

    const decodedToken = jwtDecode(token)
    const tokenExpiration = decodedToken.exp
    const expirationWithBuffer = (decodedToken.exp + fiveMinutesInMs) / 1000

    if (tokenExpiration < expirationWithBuffer) {
      await pb.collection('users').authRefresh()
    }
  }, [token])
  useInterval(refreshSession, token ? twoMinutesInMs : null)

  return (
    <AuthContext.Provider value={{ register, login, logout, user, token, pb }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
