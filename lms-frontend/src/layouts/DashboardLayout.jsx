import { Outlet } from 'react-router-dom'
import { getUserRole } from '../utils/auth'
import TabNav from '../components/TabNav'
import Header from '../components/Header'

export default function DashboardLayout({ role }) {
  const userRole = (role || getUserRole() || '').toLowerCase()
  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ New shared header with logo and logout */}
      <Header />
      <TabNav role={userRole} />
      <main className="flex-1 p-4 bg-background">
        <Outlet />
      </main>
    </div>
  )
}
