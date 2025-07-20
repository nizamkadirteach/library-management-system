import { useEffect, useState } from 'react'
import api from '../api/axios'
import RecordIcon from '../assets/icons/RecordIcon'
import Card from '../components/ui/Card'

export default function BorrowingHistoryPage() {
  const [records, setRecords] = useState([])
  const sortRecords = (list) =>
    list.sort((a, b) => new Date(b.borrowDate) - new Date(a.borrowDate))

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get('/borrow-records/my')
        setRecords(sortRecords(data))
      } catch (err) {
        console.error(err)
      }
    }
    fetchHistory()
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <RecordIcon className="w-6 h-6" /> Borrowing History
      </h1>
      <ul className="space-y-2">
        {records.map((r) => (
          <li key={r.recordId}>
            <Card className="flex flex-col gap-1">
              <span>
                Record {r.recordId} &ndash; Book {r.bookTitle} (ID {r.bookId})
              </span>
              <span>Borrowed: {r.borrowDate}</span>
              <span>Due: {r.dueDate}</span>
              {r.returnDate && <span>Returned: {r.returnDate}</span>}
              {r.fine > 0 && (
                <span className="text-red-600">Fine: ${parseFloat(r.fine).toFixed(2)}</span>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
