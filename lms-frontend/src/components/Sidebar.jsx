import { NavLink } from 'react-router-dom'
import { getUserRole } from '../utils/auth'

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 hover:bg-gray-200 ${isActive ? 'font-bold' : ''}`

  return (
    <aside className="w-48 bg-gray-100 min-h-screen">
      <nav className="p-4 space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        {getUserRole() === 'ADMIN' && (
          <>
            <NavLink to="/books" className={linkClass}>
              Books
            </NavLink>
            <NavLink to="/members" className={linkClass}>
              Members
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
    </aside>
  )
}
