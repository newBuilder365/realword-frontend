import { User } from '@/api/user'
import { store } from '@/store'
import axios from 'axios'

export const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

// 请求拦截器
request.interceptors.request.use((config: any) => {
  // const { user } = store.state
  const user: User = store.state.user!
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})
