import { useEffect, useState } from 'react'
import api from '../api/axios'
import Card from '../components/ui/Card'
import FineNotice from '../components/FineNotice'
import RecordIcon from '../assets/icons/RecordIcon'

export default function AdminDashboard() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/borrow-records/overdue')
        setRecords(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <RecordIcon className="w-6 h-6" /> Overdue Tracking
      </h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-2">
          {records.map((r) => (
            <Card
              key={r.recordId}
              className="flex justify-between items-center"
            >
              <span>
                Member {r.memberId} &ndash; Book {r.bookId} (due {r.dueDate})
              </span>
              <FineNotice amount={r.fine || 0} />
            </Card>
          ))}
        </ul>
      )}
    </div>
  )
}
