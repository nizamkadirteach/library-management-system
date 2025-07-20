import { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'
import api from '../api/axios'
import SearchIcon from '../assets/icons/SearchIcon'

export default function SearchBooks() {
  const [query, setQuery] = useState({ title: '', author: '', category: '' })
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const { data } = await api.get('/books/search', { params: query })
        setBooks(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [query])

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
      {loading && <div>Loading...</div>}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* ✅ Show message when no books match search */}
        {!loading && books.length === 0 && (
          <div className="text-gray-500 col-span-full">No books found</div>
        )}
        {books.map((book) => (
          <BookCard key={book.bookId} book={book} />
        ))}
      </div>
    </div>
  )
}
