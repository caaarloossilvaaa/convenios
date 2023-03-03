import { createContext, ReactNode, useEffect, useState } from 'react'
import { parseCookies } from 'nookies'

type User = {
  name: string
  email: string
}

type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User
  signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'convenios.token': token } = parseCookies()

    if(token) {
      
    }
  }, [])
}
