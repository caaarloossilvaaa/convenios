'use client'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { API } from '@/services/api'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  name: string
  email: string
}

type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  signIn: (data: SignInData) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user
  const router = useRouter()

  useEffect(() => {
    const { 'convenios.token': token } = parseCookies()

    if (token) {
      API.get('/me').then((response) => {
        const { name, email, sub: id } = response.data.user
        setUser({ id, name, email })
      })
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    const response = await API.post('/login', { email, password })

    if (response.data.message !== undefined) {
      return alert('Email/Senha incorretos')
    }

    const { token, user } = await response.data

    setCookie(undefined, 'convenios.token', token, {
      maxAge: 60 * 60 * 24,
    })

    API.defaults.headers.Authorization = `Bearer ${token}`
    setUser(user)
    router.push('/admin')
  }

  async function logout() {
    API.defaults.headers.Authorization = ''
    destroyCookie(undefined, 'convenios.token')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
