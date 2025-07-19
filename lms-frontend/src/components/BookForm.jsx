import { useState, useEffect } from 'react'
import api from '../api/axios'

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
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <div>
        <input
          name="isbn"
          type="text"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      <div>
        <input
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
        <input
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
        <input
          name="category"
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      <div>
        <input
          name="publicationYear"
          type="number"
          placeholder="Publication Year"
          value={form.publicationYear}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      <div>
        <input
          name="copiesAvailable"
          type="number"
          placeholder="Copies Available"
          value={form.copiesAvailable}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      {book && (
        <div>
          <select
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
          Save
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="border px-4 py-1 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
