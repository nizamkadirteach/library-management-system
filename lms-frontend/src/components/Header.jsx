import { useNavigate } from 'react-router-dom'
import Logo from './common/Logo'
import LogoutIcon from '../assets/icons/LogoutIcon'
import { getUsername, getUserRole, logout } from '../utils/auth'

export default function Header() {
  const navigate = useNavigate()
  const username = getUsername()
  const role = getUserRole()

  const handleLogout = () => {
    // ✅ Clear token and redirect on logout
    logout()
    navigate('/login')
  }

  return (
    // 🧠 Top navigation bar shown after login
    <header className="bg-white border-b flex items-center justify-between px-4 py-2">
      {/* Logo navigates to dashboard */}
      <Logo size="small" variant="navbar" />
      <div className="flex items-center gap-3">
        {/* 🧠 Displaying user role and name in top right */}
        {username && (
          <span className="text-sm font-medium" aria-label="Logged in user">
            Welcome, {username}
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
