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
        {records.map((r) => (
          <li key={r.id} className="border p-2 rounded">
            {r.bookTitle} &ndash; {r.memberName}
          </li>
        ))}
      </ul>
    </div>
  )
}
