import axios from 'axios'

const API_BASE = process.env.VUE_APP_API_BASE
const USER_API_BASE = process.env.VUE_APP_USER_API_BASE

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch (e) {
    return null
  }
}

function setStoredUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

function clearStoredUser() {
  localStorage.removeItem('user')
}

function getAccessToken(user) {
  if (!user) return null
  return user.accessToken || user.access || null
}

function getRefreshToken(user) {
  if (!user) return null
  return user.refreshToken || user.refresh || null
}

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (!payload || !payload.exp) return true
    return Date.now() >= payload.exp * 1000
  } catch (e) {
    return true
  }
}

const api = axios.create({
  baseURL: API_BASE,
})

const userApi = axios.create({
  baseURL: USER_API_BASE,
})

const publicApi = axios.create({
  baseURL: API_BASE,
})

const refreshClient = axios.create({
  baseURL: API_BASE,
})

let isRefreshing = false
let refreshQueue = []

function processQueue(error, token = null) {
  refreshQueue.forEach(p => {
    if (error) {
      p.reject(error)
    } else {
      p.resolve(token)
    }
  })
  refreshQueue = []
}

async function refreshAccessToken(refreshToken) {
  const response = await refreshClient.post('/api/token/refresh/', { refresh: refreshToken })
  return response.data && response.data.access
}

function attachInterceptors(client) {
  client.interceptors.request.use(config => {
    const user = getStoredUser()
    const access = getAccessToken(user)
    if (access && !isTokenExpired(access)) {
      config.headers.Authorization = `Bearer ${access}`
    }
    return config
  })

  client.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config || {}
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        const user = getStoredUser()
        const refresh = getRefreshToken(user)
        if (!refresh || isTokenExpired(refresh)) {
          clearStoredUser()
          return Promise.reject(error)
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            refreshQueue.push({
              resolve: token => {
                originalRequest.headers.Authorization = `Bearer ${token}`
                resolve(client(originalRequest))
              },
              reject
            })
          })
        }

        originalRequest._retry = true
        isRefreshing = true
        try {
          const newAccess = await refreshAccessToken(refresh)
          const nextUser = { ...(user || {}), access: newAccess }
          setStoredUser(nextUser)
          client.defaults.headers.Authorization = `Bearer ${newAccess}`
          processQueue(null, newAccess)
          originalRequest.headers.Authorization = `Bearer ${newAccess}`
          return client(originalRequest)
        } catch (refreshError) {
          clearStoredUser()
          processQueue(refreshError, null)
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }
      return Promise.reject(error)
    }
  )
}

attachInterceptors(api)
attachInterceptors(userApi)

export { api, userApi, publicApi }
