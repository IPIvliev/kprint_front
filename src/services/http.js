import axios from 'axios'

const API_BASE = process.env.VUE_APP_API_BASE
const USER_API_BASE = process.env.VUE_APP_USER_API_BASE

export const api = axios.create({
  baseURL: API_BASE,
})

export const userApi = axios.create({
  baseURL: USER_API_BASE,
})
