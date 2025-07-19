import { Navigate } from 'react-router-dom'
import { getUserRole } from '../utils/auth'

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  const role = getUserRole()
  if (role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />
  }
  return children
}
