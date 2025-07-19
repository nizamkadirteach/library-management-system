import { useEffect, useState } from 'react'
import api from '../api/axios'
import BookForm from '../components/BookForm'

export default function BookListPage() {
  const [books, setBooks] = useState([])
  const [query, setQuery] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [editBook, setEditBook] = useState(null)

  const fetchBooks = async () => {
    try {
      const { data } = await api.get('/books')
      setBooks(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.get('/books/search', {
        params: { title: query },
      })
      setBooks(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <div className="mb-4 flex gap-2 items-center">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <input
            type="text"
            placeholder="Search by title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-1 flex-1"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
            Search
          </button>
        </form>
        <button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          {showAdd ? 'Close' : 'Add Book'}
        </button>
      </div>
      {showAdd && (
        <div className="mb-4">
          <BookForm onSuccess={() => { setShowAdd(false); fetchBooks(); }} onCancel={() => setShowAdd(false)} />
        </div>
      )}
      <ul className="space-y-2">
        {books.map((book) => (
          <li key={book.bookId} className="border p-2 rounded">
            <div className="flex justify-between items-center">
              <span>{book.title}</span>
              <button
                className="text-blue-600 underline"
                onClick={() => setEditBook(book)}
              >
                Edit
              </button>
            </div>
            {editBook && editBook.bookId === book.bookId && (
              <div className="mt-2">
                <BookForm
                  book={editBook}
                  onSuccess={() => { setEditBook(null); fetchBooks(); }}
                  onCancel={() => setEditBook(null)}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
