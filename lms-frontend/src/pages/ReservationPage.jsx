import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function ReservationPage() {
  const [reservations, setReservations] = useState([])
  const [memberId, setMemberId] = useState('')
  const [bookId, setBookId] = useState('')

  const fetchReservations = async () => {
    try {
      const { data } = await api.get('/reservations/my')
      setReservations(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchReservations()
  }, [])

  const handleReserve = async (e) => {
    e.preventDefault()
    try {
      await api.post('/reservations', null, { params: { memberId, bookId } })
      setMemberId('')
      setBookId('')
      fetchReservations()
    } catch (err) {
      console.error(err)
      alert('Failed to reserve')
    }
  }

  const handleCancel = async (id) => {
    try {
      await api.delete(`/reservations/${id}`)
      fetchReservations()
    } catch (err) {
      console.error(err)
      alert('Failed to cancel')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reservations</h1>
      <form onSubmit={handleReserve} className="mb-4 flex gap-2">
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
          Reserve
        </button>
      </form>
      <ul className="space-y-2">
        {reservations.map((r) => (
          <li key={r.reservationId} className="border p-2 rounded flex justify-between items-center">
            <span>
              Member {r.memberId} reserved Book {r.bookId} ({r.status})
            </span>
            {r.status === 'ACTIVE' && (
              <button
                onClick={() => handleCancel(r.reservationId)}
                className="text-red-500"
              >
                Cancel
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
