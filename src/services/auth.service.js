import { api } from './http';

class AuthService {
  login(user) {
    // axios.defaults.xsrfCookieName = 'csrftoken'
    // axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    return api
      .post('/api/token/', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        console.log(response.data)
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }
  register(user) {
    return api.post('/api/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}
export default new AuthService();
