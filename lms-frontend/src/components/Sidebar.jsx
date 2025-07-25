import { NavLink, useNavigate } from 'react-router-dom'
import { getUserRole, getUsername, logout } from '../utils/auth'
import Logo from './common/Logo'

export default function Sidebar() {
  const navigate = useNavigate()
  const role = getUserRole()
  const username = getUsername()
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-primary/10 ${isActive ? 'font-bold' : ''}`

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="w-48 bg-background border-r min-h-screen flex flex-col">
      <nav className="p-4 space-y-2 flex-1">
        {/* ✅ Logo added to sidebar */}
        <Logo size="small" variant="navbar" />
        {username && (
          <div className="text-xs text-gray-500 px-1">
            {username} ({role})
          </div>
        )}
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/search-books" className={linkClass}>
          Search Books
        </NavLink>
        <NavLink to="/borrow" className={linkClass}>
          Borrow
        </NavLink>
        {role === 'ADMIN' && (
          <>
            <NavLink to="/books" className={linkClass}>
              Books
            </NavLink>
            <NavLink to="/members" className={linkClass}>
              Members
            </NavLink>
            <NavLink to="/admin-dashboard" className={linkClass}>
              Admin Dashboard
            </NavLink>
          </>
        )}
        <NavLink to="/borrow-records" className={linkClass}>
          Borrow Records
        </NavLink>
        <NavLink to="/reservations" className={linkClass}>
          Reservations
        </NavLink>
      </nav>
      <button
        onClick={handleLogout}
        className="m-4 block px-4 py-2 rounded hover:bg-primary/10 text-left"
      >
        Logout
      </button>
    </aside>
  )
}
