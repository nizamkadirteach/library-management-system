function decodePayload() {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

export function getUserRole() {
  const payload = decodePayload()
  return payload ? payload.role || null : null
}

export function getUsername() {
  const payload = decodePayload()
  return payload ? payload.sub || payload.username || null : null
}

export function logout() {
  localStorage.removeItem('token')
}
