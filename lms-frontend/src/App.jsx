import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import BookDetailPage from './pages/BookDetailPage'
import BookListPage from './pages/BookListPage'
import MemberListPage from './pages/MemberListPage'
import BorrowRecordPage from './pages/BorrowRecordPage'
import ReservationPage from './pages/ReservationPage'
import Dashboard from './pages/Dashboard'
import SidebarLayout from './layouts/SidebarLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminRoute from './routes/AdminRoute'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/books"
            element={
              <AdminRoute>
                <BookListPage />
              </AdminRoute>
            }
          />
          <Route
            path="/members"
            element={
              <AdminRoute>
                <MemberListPage />
              </AdminRoute>
            }
          />
          <Route path="/borrow-records" element={<BorrowRecordPage />} />
          <Route path="/reservations" element={<ReservationPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
