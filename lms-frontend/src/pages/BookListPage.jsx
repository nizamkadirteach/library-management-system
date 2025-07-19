import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function BookListPage() {
  const [books, setBooks] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.get('/books')
        setBooks(data)
      } catch (err) {
        console.error(err)
      }
    }
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
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
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
      <ul className="space-y-2">
        {books.map((book) => (
          <li key={book.id} className="border p-2 rounded">
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
