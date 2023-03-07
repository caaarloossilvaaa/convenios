import axios from 'axios'
import { parseCookies } from 'nookies'
import env from '@/../environment'

export function getApiClient(ctx?: any) {
  const { 'convenios.token': token } = parseCookies(ctx)
  const api = axios.create({
    baseURL: env.API_URL,
  })

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  }

  return api
}
