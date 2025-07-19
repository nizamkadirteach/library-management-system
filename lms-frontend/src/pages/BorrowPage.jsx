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

  useEffect(() => {
    const loadMember = async () => {
      try {
        const { data } = await api.get('/members/me')
        setMemberId(data.memberId)
      } catch (err) {
        console.error(err)
      }
    }
    loadMember()
  }, [])

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
    } catch (err) {
      console.error(err)
      setMessage('Failed to reserve')
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <BorrowIcon className="w-6 h-6" /> Borrow Books
      </h1>
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
            {book.status === 'AVAILABLE' ? (
              <button
                type="button"
                onClick={() => handleBorrow(book.bookId)}
                className="mt-2 bg-primary text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <BorrowIcon className="w-4 h-4" /> Borrow
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleReserve(book.bookId)}
                className="mt-2 bg-secondary text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <ReturnIcon className="w-4 h-4" /> Reserve
              </button>
            )}
          </BookCard>
        ))}
      </div>
    </div>
  )
}
