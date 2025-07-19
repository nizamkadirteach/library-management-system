import Card from './ui/Card'

export default function BookCard({ book, children }) {
  const statusStyles = {
    AVAILABLE: 'bg-green-100 text-green-800',
    BORROWED: 'bg-red-100 text-red-800',
    RESERVED: 'bg-yellow-100 text-yellow-800',
  }
  const statusClass = statusStyles[book.status] || 'bg-gray-100 text-gray-800'
  return (
    <Card className="space-y-1">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="font-semibold">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${statusClass}`}>{book.status}</span>
      </div>
      {children}
    </Card>
  )
}
