import AuthService from '../services/auth.service'

function getAccessToken (user) {
  if (!user) return null
  return user.accessToken || user.access || null
}

function getRefreshToken (user) {
  if (!user) return null
  return user.refreshToken || user.refresh || null
}

function isTokenExpired (token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (!payload || !payload.exp) return true
    return Date.now() >= payload.exp * 1000
  } catch (e) {
    return true
  }
}

const storedUser = JSON.parse(localStorage.getItem('user'))
const storedAccess = getAccessToken(storedUser)
const storedRefresh = getRefreshToken(storedUser)
const accessValid = storedAccess && !isTokenExpired(storedAccess)
const refreshValid = storedRefresh && !isTokenExpired(storedRefresh)

if (!accessValid && !refreshValid && storedUser) {
  localStorage.removeItem('user')
}

const initialState = accessValid || refreshValid
  ? { status: { loggedIn: true }, user: storedUser }
  : { status: { loggedIn: false }, user: null }
export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login ({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error)
        }
      )
    },
    logout ({ commit }) {
      AuthService.logout()
      commit('logout')
    },
    register ({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess')
          return Promise.resolve(response.data)
        },
        error => {
          commit('registerFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    loginSuccess (state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    loginFailure (state) {
      state.status.loggedIn = false
      state.user = null
    },
    logout (state) {
      state.status.loggedIn = false
      state.user = null
    },
    registerSuccess (state) {
      state.status.loggedIn = false
    },
    registerFailure (state) {
      state.status.loggedIn = false
    }
  }
}
