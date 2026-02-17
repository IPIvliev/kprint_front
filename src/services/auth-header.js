function getAccessToken (user) {
  if (!user) return null
  return user.accessToken || user.access || null
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

export default function authHeader () {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = getAccessToken(user)
  if (token && !isTokenExpired(token)) {
    return { Authorization: 'Bearer ' + token }
  }
  return {}
}
