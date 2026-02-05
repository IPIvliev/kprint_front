export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user && (user.accessToken || user.access)) {
    return { Authorization: 'Bearer ' + (user.accessToken || user.access) };
  } else {
    return {};
  }
}
