import axiosInstance from './axiosInstance'

export const loginUser = (credentials) =>
  axiosInstance.post('/auth/login', credentials)

export const registerUser = (data) =>
  axiosInstance.post('/auth/register', data)

export const getUsers = (page = 1, limit = 10) =>
  axiosInstance.get(`/auth/users?page=${page}&limit=${limit}`)

export const getStats = () =>
  axiosInstance.get('/stats')

export const healthCheck = () =>
  axiosInstance.get('/')
