export function getUserRole() {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.role || null
  } catch {
    return null
  }
}

export function getUsername() {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.sub || payload.username || null
  } catch {
    return null
  }
}

export function getFullName() {
  return localStorage.getItem('fullName')
}

export function setFullName(name) {
  if (name) {
    localStorage.setItem('fullName', name)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('fullName')
}
