import { useEffect, useState } from 'react'
import api from '../api/axios'
import FineIcon from '../assets/icons/FineIcon'
import Card from '../components/ui/Card'

export default function MyFinesPage() {
  const [fine, setFine] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFine = async () => {
      try {
        const { data: member } = await api.get('/members/me')
        const res = await api.get(`/fines/${member.memberId}`)
        setFine(parseFloat(res.data))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchFine()
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <FineIcon className="w-6 h-6" /> My Fines
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Card className="w-fit" role="status" aria-live="polite">
          <p>
            Total Outstanding Fines:{' '}
            <span className="font-semibold">${fine.toFixed(2)}</span>
          </p>
        </Card>
      )}
    </div>
  )
}
