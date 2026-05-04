import React, { createContext, useContext, useState } from 'react'
import { getApiUrl } from '@/lib/api'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const signUp = async (email, password) => {
    setLoading(true)
    try {
      const response = await fetch(getApiUrl('/signup.php'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`)
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Sign up failed')
      }

      setUser(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
      return true
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    setLoading(true)
    try {
      const response = await fetch(getApiUrl('/signin.php'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`)
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Sign in failed')
      }

      setUser(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
      return true
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        signUp,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
