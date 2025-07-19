import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function BorrowRecordPage() {
  const [records, setRecords] = useState([])
  const [memberId, setMemberId] = useState('')
  const [bookId, setBookId] = useState('')

  const fetchRecords = async () => {
    try {
      const { data } = await api.get('/borrow-records/my')
      setRecords(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  const handleBorrow = async (e) => {
    e.preventDefault()
    try {
      await api.post('/borrow-records/borrow', null, {
        params: { memberId, bookId },
      })
      setMemberId('')
      setBookId('')
      fetchRecords()
    } catch (err) {
      console.error(err)
      alert('Failed to borrow')
    }
  }

  const handleReturn = async (id) => {
    try {
      await api.put(`/borrow-records/return/${id}`)
      fetchRecords()
    } catch (err) {
      console.error(err)
      alert('Failed to return')
    }
  }

  const handleRenew = async (id) => {
    try {
      await api.put(`/borrow-records/renew/${id}`)
      fetchRecords()
    } catch (err) {
      console.error(err)
      alert('Failed to renew')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Borrow Records</h1>
      <form onSubmit={handleBorrow} className="mb-4 flex gap-2">
        <input
          type="number"
          placeholder="Member ID"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          className="border p-1"
        />
        <input
          type="number"
          placeholder="Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="border p-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          Borrow
        </button>
      </form>
      <ul className="space-y-2">
        {records.map((r) => {
          const overdue = r.returnDate == null && new Date(r.dueDate) < new Date()
          return (
            <li key={r.recordId} className="border p-2 rounded flex justify-between items-center">
              <span>
                Record {r.recordId} &ndash; Book {r.bookId} &ndash; Member {r.memberId}
                <span className="ml-2">Due: {r.dueDate}</span>
                {overdue && <span className="text-red-600 ml-2">Overdue!</span>}
              </span>
              {r.returnDate == null && (
                <div className="flex gap-2">
                  <button onClick={() => handleReturn(r.recordId)} className="text-red-500">
                    Return
                  </button>
                  <button onClick={() => handleRenew(r.recordId)} className="text-blue-600">
                    Renew
                  </button>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
