import { useEffect, useState, useCallback } from 'react'
import BookCard from '../components/BookCard'
import api from '../api/axios'
import BorrowIcon from '../assets/icons/BorrowIcon'
import ReturnIcon from '../assets/icons/ReturnIcon'

export default function BorrowPage() {
  const [memberId, setMemberId] = useState(null)
  const [query, setQuery] = useState({ title: '', author: '', category: '' })
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [activeCount, setActiveCount] = useState(0)
  const [hasOverdue, setHasOverdue] = useState(false)
  const [totalFine, setTotalFine] = useState(0)
  const loadMember = useCallback(async () => {
    try {
      const { data } = await api.get('/members/me')
      setMemberId(data.memberId)
      // 🧠 Fetch current borrow status for restrictions
      const recordsRes = await api.get('/borrow-records/my')
      const records = recordsRes.data || []
      const active = records.filter((r) => r.returnDate == null)
      setActiveCount(active.length)
      setHasOverdue(active.some((r) => new Date(r.dueDate) < new Date()))
      const fineRes = await api.get(`/fines/${data.memberId}`)
      setTotalFine(parseFloat(fineRes.data))
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    loadMember()
  }, [loadMember])

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/books/search', { params: query })
      setBooks(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [query])

  useEffect(() => {
    const timer = setTimeout(fetchBooks, 500)
    return () => clearTimeout(timer)
  }, [fetchBooks])

  const handleBorrow = async (bookId) => {
    if (!memberId) return
    try {
      await api.post('/borrow-records/borrow', null, { params: { memberId, bookId } })
      setMessage('Borrowed successfully')
      fetchBooks()
      loadMember()
    } catch (err) {
      console.error(err)
      setMessage('Failed to borrow')
    }
  }

  const handleReserve = async (bookId) => {
    if (!memberId) return
    try {
      await api.post('/reservations', null, { params: { memberId, bookId } })
      setMessage('Reserved successfully')
      fetchBooks()
      loadMember()
    } catch (err) {
      console.error(err)
      setMessage('Failed to reserve')
    }
  }

  const canBorrow = activeCount < 3 && !hasOverdue && totalFine <= 10

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <BorrowIcon className="w-6 h-6" /> Borrow Books
      </h1>
      {!canBorrow && (
        <div className="p-2 bg-red-100 text-red-700 rounded" role="alert">
          You cannot borrow right now due to outstanding limits or fines.
        </div>
      )}
      <div className="grid gap-2 sm:grid-cols-3">
        <input
          type="text"
          placeholder="Title"
          value={query.title}
          onChange={(e) => setQuery({ ...query, title: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={query.author}
          onChange={(e) => setQuery({ ...query, author: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={query.category}
          onChange={(e) => setQuery({ ...query, category: e.target.value })}
          className="border p-2 rounded"
        />
      </div>
      {message && (
        <div className="p-2 bg-green-100 text-green-700 rounded" role="alert">
          {message}
        </div>
      )}
      {loading && <div>Loading...</div>}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.bookId} book={book}>
            {book.status === 'AVAILABLE' && (
              <button
                type="button"
                onClick={() => handleBorrow(book.bookId)}
                disabled={!canBorrow}
                className="mt-2 bg-primary text-white px-3 py-1 rounded flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BorrowIcon className="w-4 h-4" /> Borrow
              </button>
            )}
            {book.status === 'BORROWED' && (
              <button
                type="button"
                onClick={() => handleReserve(book.bookId)}
                disabled={!canBorrow}
                className="mt-2 bg-secondary text-white px-3 py-1 rounded flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ReturnIcon className="w-4 h-4" /> Reserve
              </button>
            )}
            {!canBorrow && (
              <p className="text-xs text-red-600 mt-1" role="alert">
                {/* ⚠️ Disabled borrow button if fine exceeds threshold */}
                Borrowing disabled due to account status
              </p>
            )}
          </BookCard>
        ))}
      </div>
    </div>
  )
}
