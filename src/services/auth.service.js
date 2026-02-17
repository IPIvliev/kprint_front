import { api } from './http'

class AuthService {
  login (user) {
    // axios.defaults.xsrfCookieName = 'csrftoken'
    // axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    return api
      .post('/api/token/', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        const data = response.data || {}
        if (data.accessToken || data.access) {
          localStorage.setItem('user', JSON.stringify(data))
        }
        console.log(response.data)
        return response.data
      })
  }

  logout () {
    localStorage.removeItem('user')
  }

  register (user) {
    return api.post('/api/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }

  requestPasswordReset (email) {
    return api.post('/api/password-reset/request', { email })
  }

  confirmPasswordReset (payload) {
    return api.post('/api/password-reset/confirm', {
      uid: payload.uid,
      token: payload.token,
      new_password: payload.new_password
    })
  }
}
export default new AuthService()
