import { request } from '@/utils/request'

interface LoginInput {
  email: string
  password: string
}

export interface User {
  'email': 'string',
  'token': 'string',
  'username': 'string',
  'bio': 'string',
  'image': 'string'
}

interface LoginPayload {
  user: User
}

// 登录
const login = (data: LoginInput) => {
  return request.post<LoginPayload>('/api/users/login', data)
}

interface RegisterInput {
  username: string
  email: string
  password: string
}

interface RegisterPayload {
  user: User
}

// 注册
const register = (data: RegisterInput) => {
  return request.post<RegisterPayload>('/api/users', data)
}

interface userPayload {
  user: User
}

// 获取用户信息
const getUserInfo = () => {
  return request.get<userPayload>('/api/user')
}

interface updateInput {
  email: string,
  username: string,
  bio: string,
  image: string,
  password: string
}

// 更改用户信息
const updateUserInfo = (data: updateInput) => {
  return request.put<userPayload>('/api/user', data)
}

interface Profile {
  username: string,
  bio: string,
  image: string,
  following: boolean
}

interface ProfilePayload {
  profile: Profile
}

// 获取用户信息
const getUserInfoByName = (username: string) => {
  return request.get<ProfilePayload>(`/api/profiles/${username}`)
}

export {
  login,
  register,
  getUserInfo,
  updateUserInfo,
  getUserInfoByName
}
