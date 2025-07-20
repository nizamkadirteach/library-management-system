import { NavLink } from 'react-router-dom'
import { getUserRole } from '../utils/auth'
import BookIcon from '../assets/icons/BookIcon'
import UserIcon from '../assets/icons/UserIcon'
import CalendarIcon from '../assets/icons/CalendarIcon'
import RecordIcon from '../assets/icons/RecordIcon'
import SearchIcon from '../assets/icons/SearchIcon'
import FineIcon from '../assets/icons/FineIcon'

export default function TabNav({ role }) {
  const userRole = (role || getUserRole() || '').toUpperCase()
  const linkClass = ({ isActive }) =>
    `flex items-center gap-1 px-3 py-2 border-b-2 hover:text-primary ${
      isActive
        ? 'border-primary text-primary font-semibold'
        : 'border-transparent'
    }`

  const adminTabs = [
    { to: '/admin-dashboard', label: 'Overdue Tracking', icon: CalendarIcon },
    { to: '/books', label: 'Manage Books', icon: BookIcon },
    {
      to: '/members',
      label: 'Manage Members',
      icon: UserIcon, // ✅ Only show Manage Members tab for Admin
    },
    {
      to: '/admin-logs',
      label: 'Borrow/Reserve Logs',
      icon: RecordIcon,
    },
  ]

  const memberTabs = [
    { to: '/search-books', label: 'Search Books', icon: SearchIcon },
    {
      to: '/borrow-records',
      label: 'My Borrowed Books',
      icon: BookIcon, // 🧠 Reused BookCard component under My Borrowed Books
    },
    { to: '/borrowing-history', label: 'Borrowing History', icon: RecordIcon },
    { to: '/reservations', label: 'My Reservations', icon: CalendarIcon },
    { to: '/my-fines', label: 'My Fines', icon: FineIcon },
  ]

  const tabs = userRole === 'ADMIN' ? adminTabs : memberTabs

  return (
    <nav className="bg-white border-b px-2 flex overflow-x-auto">
      {tabs.map(({ to, label, icon }) => {
        const Icon = icon
        return (
          <NavLink key={label} to={to} className={linkClass} end>
            <Icon className="w-5 h-5" />
            <span className="hidden sm:inline">{label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
