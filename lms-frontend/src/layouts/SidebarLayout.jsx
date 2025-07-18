import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

export default function SidebarLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}
