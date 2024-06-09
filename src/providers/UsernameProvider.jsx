'use client'

import { createContext, useContext, useState } from 'react'

const UsernameContext = createContext({})

export const useUsernameContext = () => useContext(UsernameContext)

export function UsernameProvider({ defaultValue, children }) {
  const [username, setUsername] = useState(defaultValue)

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  )
}
