import { userApi } from './http';
import authHeader from './auth-header';
const API_URL = '/api/test/';
class UserService {
  getPublicContent() {
    return userApi.get(API_URL + 'all');
  }
  getUserBoard() {
    return userApi.get(API_URL + 'user', { headers: authHeader() });
  }
  getModeratorBoard() {
    return userApi.get(API_URL + 'mod', { headers: authHeader() });
  }
  getAdminBoard() {
    return userApi.get(API_URL + 'admin', { headers: authHeader() });
  }
}
export default new UserService();
