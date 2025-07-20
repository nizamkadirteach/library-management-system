import { useEffect, useState, useCallback } from 'react'
import BookCard from '../components/BookCard'
import api from '../api/axios'
import SearchIcon from '../assets/icons/SearchIcon'
import BorrowIcon from '../assets/icons/BorrowIcon'
import ReturnIcon from '../assets/icons/ReturnIcon'

export default function SearchBooks() {
  const [query, setQuery] = useState({ title: '', author: '', category: '' })
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [memberId, setMemberId] = useState(null)
  const [message, setMessage] = useState('')

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

  const loadMember = useCallback(async () => {
    try {
      const { data } = await api.get('/members/me')
      setMemberId(data.memberId)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    loadMember()
  }, [loadMember])

  const handleBorrow = async (bookId) => {
    if (!memberId) return
    try {
      await api.post('/borrow-records/borrow', null, {
        params: { memberId, bookId },
      })
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
        <SearchIcon className="w-6 h-6" /> Search Books
      </h1>
      <div className="grid gap-2 sm:grid-cols-3">
        <div>
          <label htmlFor="filterTitle" className="sr-only">
            Filter by title
          </label>
          <input
            id="filterTitle"
            type="text"
            placeholder="Title"
            value={query.title}
            onChange={(e) => setQuery({ ...query, title: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="filterAuthor" className="sr-only">
            Filter by author
          </label>
          <input
            id="filterAuthor"
            type="text"
            placeholder="Author"
            value={query.author}
            onChange={(e) => setQuery({ ...query, author: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="filterCategory" className="sr-only">
            Filter by category
          </label>
          <input
            id="filterCategory"
            type="text"
            placeholder="Category"
            value={query.category}
            onChange={(e) => setQuery({ ...query, category: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
      </div>
      {message && (
        <div className="p-2 bg-green-100 text-green-700 rounded" role="alert">
          {message}
        </div>
      )}
      {loading && <div>Loading...</div>}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* ✅ Show message when no books match search */}
        {!loading && books.length === 0 && (
          <div className="text-gray-500 col-span-full">No books found</div>
        )}
        {books.map((book) => (
          <BookCard key={book.bookId} book={book}>
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
          </BookCard>
        ))}
      </div>
    </div>
  )
}
