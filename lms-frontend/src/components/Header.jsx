import { useNavigate } from 'react-router-dom'
import Logo from './common/Logo'
import LogoutIcon from '../assets/icons/LogoutIcon'
import { getFullName, getUserRole, logout } from '../utils/auth'

export default function Header() {
  const navigate = useNavigate()
  const fullName = getFullName()
  const role = getUserRole()
  const logoDestination = role === 'ADMIN' ? '/admin-dashboard' : '/dashboard'

  const handleLogout = () => {
    // ✅ Clear token and redirect on logout
    logout()
    navigate('/login')
  }

  return (
    // 🧠 Top navigation bar shown after login
    <header className="bg-white border-b flex items-center justify-between px-4 py-2">
      {/* Logo navigates to dashboard */}
      <Logo size="small" variant="navbar" to={logoDestination} />
      <div className="flex items-center gap-3">
        {/* 🧠 Displaying user role and name in top right */}
        {fullName && (
          <span className="text-sm font-medium" aria-label="Logged in user">
            Welcome, {fullName}
          </span>
        )}
        {role && <span className="text-xs text-gray-500">Role: {role}</span>}
        {/* ✅ Added logout button to header */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <LogoutIcon className="w-5 h-5" /> Logout
        </button>
      </div>
    </header>
  )
}
