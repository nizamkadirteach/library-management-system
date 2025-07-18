import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function BookListPage() {
  const [books, setBooks] = useState([])

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Books</h1>
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
