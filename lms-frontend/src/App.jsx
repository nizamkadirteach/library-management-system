import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import BookListPage from './pages/BookListPage'
import MemberListPage from './pages/MemberListPage'
import BorrowRecordPage from './pages/BorrowRecordPage'
import Dashboard from './pages/Dashboard'
import SidebarLayout from './layouts/SidebarLayout'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="books" element={<BookListPage />} />
          <Route path="members" element={<MemberListPage />} />
          <Route path="borrow-records" element={<BorrowRecordPage />} />
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}
