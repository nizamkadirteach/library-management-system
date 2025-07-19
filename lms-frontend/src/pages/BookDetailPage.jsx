import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Logo from '../components/common/Logo'
import api from '../api/axios'
import Card from '../components/ui/Card'

export default function BookDetailPage() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await api.get(`/books/${id}`)
        setBook(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [id])

  if (loading) return <div className="p-4">Loading...</div>
  if (!book) return <div className="p-4">Book not found</div>

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      {/* ✅ Logo added to book detail */}
      <Logo size="small" variant="navbar" />
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-gray-600">by {book.author}</p>
      <Card className="space-y-1">
        <p>
          <strong>ISBN:</strong> {book.isbn}
        </p>
        <p>
          <strong>Category:</strong> {book.category}
        </p>
        <p>
          <strong>Publication Year:</strong> {book.publicationYear}
        </p>
        <p>
          <strong>Status:</strong> {book.status}
        </p>
        <p>
          <strong>Copies Available:</strong> {book.copiesAvailable}
        </p>
      </Card>
    </div>
  )
}
