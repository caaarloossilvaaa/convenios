import { API } from './api'

type SignInData = {
  email: string
  password: string
}

export async function SignIn({ email, password }: SignInData) {
  const response = await API.post('/login', { email, password })
  return response.data
}

export async function RecoverUserRequest() {
  const response = await API.get('/me')
  return response.data
}
