import { useState, useEffect } from 'react'
import api from '../api/axios'
import Button from './ui/Button'

export default function BookForm({ book, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    isbn: '',
    title: '',
    author: '',
    category: '',
    publicationYear: '',
    copiesAvailable: '',
    status: 'AVAILABLE',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (book) {
      setForm({
        isbn: book.isbn || '',
        title: book.title || '',
        author: book.author || '',
        category: book.category || '',
        publicationYear: book.publicationYear || '',
        copiesAvailable: book.copiesAvailable || '',
        status: book.status || 'AVAILABLE',
      })
    }
  }, [book])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!form.title || !form.author) {
      setError('Title and Author are required')
      return
    }
    const payload = {
      ...form,
      publicationYear: form.publicationYear
        ? parseInt(form.publicationYear)
        : null,
      copiesAvailable: form.copiesAvailable
        ? parseInt(form.copiesAvailable)
        : null,
    }
    try {
      if (book && book.bookId) {
        await api.put(`/books/${book.bookId}`, payload)
      } else {
        await api.post('/books', payload)
      }
      setSuccess('Saved successfully')
      if (onSuccess) onSuccess()
    } catch (err) {
      console.error(err)
      setError('Failed to save')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded bg-gray-50">
      {error && (
        <div className="text-red-600" id="book-form-error" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-600" role="status">
          {success}
        </div>
      )}
      <div className="space-y-1">
        <label htmlFor="isbn" className="block text-sm font-medium">
          ISBN
        </label>
        <input
          id="isbn"
          name="isbn"
          type="text"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
          aria-describedby="book-form-error"
          className="border p-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-1 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="author" className="sr-only">
          Author
        </label>
        <input
          id="author"
          name="author"
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="border p-1 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="category" className="sr-only">
          Category
        </label>
        <input
          id="category"
          name="category"
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="publicationYear" className="sr-only">
          Publication Year
        </label>
        <input
          id="publicationYear"
          name="publicationYear"
          type="number"
          placeholder="Publication Year"
          value={form.publicationYear}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="copiesAvailable" className="sr-only">
          Copies Available
        </label>
        <input
          id="copiesAvailable"
          name="copiesAvailable"
          type="number"
          placeholder="Copies Available"
          value={form.copiesAvailable}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      {book && (
        <div className="space-y-1">
          <label htmlFor="status" className="block text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-1 w-full"
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="BORROWED">BORROWED</option>
            <option value="RESERVED">RESERVED</option>
          </select>
        </div>
      )}
      <div className="flex gap-2">
        <Button type="submit" className="bg-primary">
          Save
        </Button>
        {onCancel && (
          <Button type="button" onClick={onCancel} className="border text-text">
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
