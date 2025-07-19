import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import BookDetailPage from './pages/BookDetailPage'
import BookListPage from './pages/BookListPage'
import MemberListPage from './pages/MemberListPage'
import SearchBooks from './pages/SearchBooks'
import BorrowPage from './pages/BorrowPage'
import AdminDashboard from './pages/AdminDashboard'
import MemberDashboard from './pages/MemberDashboard'
import BorrowRecordPage from './pages/BorrowRecordPage'
import ReservationPage from './pages/ReservationPage'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './layouts/DashboardLayout'
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
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<MemberDashboard />} />
          <Route path="/search-books" element={<SearchBooks />} />
          <Route path="/borrow" element={<BorrowPage />} />
          <Route path="/my-fines" element={<Dashboard />} />
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
          <Route
            path="/admin-dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
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
