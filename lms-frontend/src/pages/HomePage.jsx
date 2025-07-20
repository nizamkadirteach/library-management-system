import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Button from '../components/ui/Button'
import BookIcon from '../assets/icons/BookIcon'
import UserIcon from '../assets/icons/UserIcon'
import RecordIcon from '../assets/icons/RecordIcon'
import SearchIcon from '../assets/icons/SearchIcon'
import Card from '../components/ui/Card'
import BookCard from '../components/BookCard'
import BorrowIcon from '../assets/icons/BorrowIcon'
import ReturnIcon from '../assets/icons/ReturnIcon'
import Logo from '../components/common/Logo'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [memberId, setMemberId] = useState(null)
  const [records, setRecords] = useState([])

  const loadUserData = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const { data: member } = await api.get('/members/me')
      setMemberId(member.memberId)
      const res = await api.get('/borrow-records/my')
      setRecords(res.data || [])
    } catch (err) {
      console.error(err)
    }
  }, [])

  const fetchResults = useCallback(async () => {
    if (!query.trim()) return
    setLoading(true)
    setSearched(true)
    try {
      const { data } = await api.get('/books/search', { params: { title: query } })
      setResults(data)
      loadUserData()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [query, loadUserData])


  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  const handleSearch = async (e) => {
    e.preventDefault()
    fetchResults()
  }

  const handleBorrow = async (bookId) => {
    if (!memberId) return
    try {
      await api.post('/borrow-records/borrow', null, { params: { memberId, bookId } })
      await fetchResults()
    } catch (err) {
      console.error(err)
    }
  }

  const handleReserve = async (bookId) => {
    if (!memberId) return
    try {
      await api.post('/reservations', null, { params: { memberId, bookId } })
      await fetchResults()
    } catch (err) {
      console.error(err)
    }
  }

  const handleReturn = async (recordId) => {
    try {
      await api.put(`/borrow-records/return/${recordId}`)
      await fetchResults()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header
        className="relative h-96 bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?library')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 flex flex-col items-center justify-center text-white text-center px-4">
          {/* ✅ Logo added to homepage */}
          <Logo size="large" variant="hero" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Our Library
          </h1>
          <p className="mb-6 text-lg md:text-xl max-w-2xl">
            Explore, manage and borrow books with ease through our Library
            Management System.
          </p>
          <div className="flex gap-4">
            <Button as={Link} to="/login" className="bg-primary">
              Login
            </Button>
            <Button as={Link} to="/register" className="bg-secondary">
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* 🔍 Search bar for books */}
      <section className="bg-background py-8 px-4">
        <form
          onSubmit={handleSearch}
          className="max-w-xl mx-auto flex w-full border rounded-md overflow-hidden"
        >
          <label htmlFor="homeSearch" className="sr-only">
            Search books by title
          </label>
          <input
            id="homeSearch"
            type="text"
            placeholder="Search books by title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 outline-none"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 flex items-center justify-center"
          >
            <SearchIcon className="w-5 h-5 mr-1" />
            Search
          </button>
        </form>

        {/* 🧠 Render results dynamically from backend */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading && (
            <div className="text-center col-span-full">Loading...</div>
          )}
          {!loading && searched && results.length === 0 && (
            <div className="text-center col-span-full text-gray-500">
              No books found
            </div>
          )}
          {!loading &&
            results.map((book) => {
              const record = records.find(
                (r) => r.bookId === book.bookId && r.returnDate == null
              )
              return (
                <BookCard key={book.bookId} book={book}>
                  {record ? (
                    <button
                      type="button"
                      onClick={() => handleReturn(record.recordId)}
                      className="mt-2 bg-primary text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <ReturnIcon className="w-4 h-4" /> Return
                    </button>
                  ) : (
                    <>
                      {book.status === 'AVAILABLE' && (
                        <button
                          type="button"
                          onClick={() => handleBorrow(book.bookId)}
                          className="mt-2 bg-primary text-white px-3 py-1 rounded flex items-center gap-1"
                        >
                          <BorrowIcon className="w-4 h-4" /> Borrow
                        </button>
                      )}
                      {book.status === 'BORROWED' && (
                        <button
                          type="button"
                          onClick={() => handleReserve(book.bookId)}
                          className="mt-2 bg-secondary text-white px-3 py-1 rounded flex items-center gap-1"
                        >
                          <ReturnIcon className="w-4 h-4" /> Reserve
                        </button>
                      )}
                    </>
                  )}
                </BookCard>
              )
            })}
        </div>
      </section>

      {/* Features Section */}
      <section className="flex-1 py-12 px-4 bg-background">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          <Card className="text-center space-y-2">
            <BookIcon className="w-10 h-10 mx-auto text-primary" />
            <h3 className="text-xl font-semibold">Book Search and Borrowing</h3>
            <p className="text-gray-600">
              Find books quickly and check them out effortlessly.
            </p>
          </Card>
          <Card className="text-center space-y-2">
            <UserIcon className="w-10 h-10 mx-auto text-primary" />
            <h3 className="text-xl font-semibold">Member Management</h3>
            <p className="text-gray-600">
              Manage library members and privileges with ease.
            </p>
          </Card>
          <Card className="text-center space-y-2">
            <RecordIcon className="w-10 h-10 mx-auto text-primary" />
            <h3 className="text-xl font-semibold">
              Borrowing Records Tracking
            </h3>
            <p className="text-gray-600">
              Keep track of borrowed books and due dates in one place.
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-4 mt-auto">
        <div className="font-semibold">Library Management System</div>
        <div>contact@library.com</div>
        <div className="text-sm mt-1">
          &copy; {new Date().getFullYear()} Library
        </div>
      </footer>
    </div>
  )
}
