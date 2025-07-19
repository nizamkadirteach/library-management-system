import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function BorrowRecordPage() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { data } = await api.get('/borrow-records')
        setRecords(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchRecords()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Borrow Records</h1>
      <ul className="space-y-2">
        {records.map((r) => {
          const overdue = r.returnDate == null && new Date(r.dueDate) < new Date()
          return (
            <li key={r.recordId} className="border p-2 rounded">
              Record {r.recordId} &ndash; Book {r.bookId} &ndash; Member {r.memberId}
              <span className="ml-2">Due: {r.dueDate}</span>
              {overdue && <span className="text-red-600 ml-2">Overdue!</span>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
