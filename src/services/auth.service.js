import axios from 'axios';
const API_URL = 'https://kprint.tech/api/';
class AuthService {
  login(user) {
    // axios.defaults.xsrfCookieName = 'csrftoken'
    // axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    return axios
      .post(API_URL + 'token/', {
        username: "admin",
        password: "Aviatorskaya16"
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
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}
export default new AuthService();