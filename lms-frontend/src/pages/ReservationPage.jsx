import { useEffect, useState } from 'react'
import api from '../api/axios'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import BorrowIcon from '../assets/icons/BorrowIcon'
import ReturnIcon from '../assets/icons/ReturnIcon'

export default function ReservationPage() {
  const [reservations, setReservations] = useState([])
  const [memberId, setMemberId] = useState(null)
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
    const fetchMember = async () => {
      try {
        const { data } = await api.get('/members/me')
        setMemberId(data.memberId)
      } catch (err) {
        console.error(err)
      }
    }
    fetchMember()
  }, [])

  const handleReserve = async (e) => {
    e.preventDefault()
    try {
      await api.post('/reservations', null, { params: { memberId, bookId } })
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
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Reservations</h1>
      <form onSubmit={handleReserve} className="flex gap-2 flex-wrap">
        <div>
          <label htmlFor="reserveBookId" className="sr-only">
            Book ID
          </label>
          <input
            id="reserveBookId"
            type="number"
            placeholder="Book ID"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <Button type="submit" className="bg-primary flex items-center gap-1">
          <BorrowIcon className="w-5 h-5" /> Reserve
        </Button>
      </form>
      <ul className="space-y-2">
        {reservations.map((r) => (
          <li key={r.reservationId}>
            <Card className="flex justify-between items-center gap-2">
              <span>
                Member {r.memberName} (ID {r.memberId}) reserved Book {r.bookTitle} (ID {r.bookId}) ({r.status})
              </span>
              {r.status === 'ACTIVE' && (
                <Button
                  type="button"
                  onClick={() => handleCancel(r.reservationId)}
                  className="bg-secondary text-xs"
                >
                  <ReturnIcon className="w-4 h-4 mr-1" /> Cancel
                </Button>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
