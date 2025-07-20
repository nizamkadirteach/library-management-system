import { useEffect, useState } from 'react'
import api from '../api/axios'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import RecordIcon from '../assets/icons/RecordIcon'

export default function AdminLogsPage() {
  const [view, setView] = useState('borrow')
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (view === 'borrow') {
          const { data } = await api.get('/borrow-records')
          setRecords(data)
        } else {
          const { data } = await api.get('/reservations')
          setRecords(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [view])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <RecordIcon className="w-6 h-6" /> Borrow/Reserve Logs
      </h1>
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={() => setView('borrow')}
          className={`${view === 'borrow' ? 'bg-primary' : 'bg-secondary'} text-sm`}
        >
          Borrow Records
        </Button>
        <Button
          type="button"
          onClick={() => setView('reservation')}
          className={`${view === 'reservation' ? 'bg-primary' : 'bg-secondary'} text-sm`}
        >
          Reservations
        </Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-2">
          {view === 'borrow' &&
            records.map((r) => (
              <li key={r.recordId}>
                <Card className="flex flex-col gap-1">
                  <span>
                    Record {r.recordId} &ndash; Book {r.bookId} &ndash; Member{' '}
                    {r.memberId}
                  </span>
                  <span>Borrowed: {r.borrowDate}</span>
                  <span>Due: {r.dueDate}</span>
                  {r.returnDate && <span>Returned: {r.returnDate}</span>}
                  {r.fine > 0 && (
                    <span className="text-red-600">
                      Fine: ${parseFloat(r.fine).toFixed(2)}
                    </span>
                  )}
                </Card>
              </li>
            ))}
          {view === 'reservation' &&
            records.map((r) => (
              <li key={r.reservationId}>
                <Card className="flex justify-between items-center">
                  <span>
                    Member {r.memberId} reserved Book {r.bookId} on{' '}
                    {r.reservationDate}
                  </span>
                  <span className="text-xs">{r.status}</span>
                </Card>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
