import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('urquicoach_token'))
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('urquicoach_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = ({ token: newToken, user: newUser }) => {
    localStorage.setItem('urquicoach_token', newToken)
    localStorage.setItem('urquicoach_user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem('urquicoach_token')
    localStorage.removeItem('urquicoach_user')
    setToken(null)
    setUser(null)
  }

  const value = useMemo(() => ({ token, user, login, logout }), [token, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
