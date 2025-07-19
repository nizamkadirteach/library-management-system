import { useEffect, useState } from 'react'
import api from '../api/axios'
import BookForm from '../components/BookForm'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import SearchIcon from '../assets/icons/SearchIcon'
import BookIcon from '../assets/icons/BookIcon'

export default function BookListPage() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState({
    title: '',
    author: '',
    category: '',
  })
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
        params: {
          title: search.title,
          author: search.author,
          category: search.category,
        },
      })
      setBooks(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Books</h1>
      <div className="flex flex-col gap-3">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search by title"
            value={search.title}
            onChange={(e) => setSearch({ ...search, title: e.target.value })}
            className="border p-2 rounded flex-1 min-w-[150px]"
          />
          <input
            type="text"
            placeholder="Author"
            value={search.author}
            onChange={(e) => setSearch({ ...search, author: e.target.value })}
            className="border p-2 rounded flex-1 min-w-[150px]"
          />
          <input
            type="text"
            placeholder="Category"
            value={search.category}
            onChange={(e) => setSearch({ ...search, category: e.target.value })}
            className="border p-2 rounded flex-1 min-w-[150px]"
          />
          <Button type="submit" className="bg-primary flex items-center gap-1">
            <SearchIcon className="w-5 h-5" /> Search
          </Button>
        </form>
        <Button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="bg-secondary w-fit"
        >
          <BookIcon className="w-5 h-5 inline mr-1" />
          {showAdd ? 'Close' : 'Add Book'}
        </Button>
      </div>
      {showAdd && (
        <div className="mb-4">
          <BookForm
            onSuccess={() => {
              setShowAdd(false)
              fetchBooks()
            }}
            onCancel={() => setShowAdd(false)}
          />
        </div>
      )}
      <ul className="space-y-2">
        {books.map((book) => (
          <li key={book.bookId}>
            <Card className="flex justify-between items-start gap-2">
              <span className="font-medium">{book.title}</span>
              <Button
                type="button"
                onClick={() => setEditBook(book)}
                className="bg-primary text-sm"
              >
                Edit
              </Button>
            </Card>
            {editBook && editBook.bookId === book.bookId && (
              <div className="mt-2">
                <BookForm
                  book={editBook}
                  onSuccess={() => {
                    setEditBook(null)
                    fetchBooks()
                  }}
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
