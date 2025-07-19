import { useState } from 'react'
import api from '../api/axios'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import FineIcon from '../assets/icons/FineIcon'

export default function Dashboard() {
  const [memberId, setMemberId] = useState('')
  const [fine, setFine] = useState(null)

  const fetchFine = async () => {
    if (!memberId) return
    try {
      const { data } = await api.get(`/fines/${memberId}`)
      setFine(parseFloat(data))
    } catch (err) {
      console.error(err)
      setFine(null)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Card className="flex items-center gap-2 w-fit">
        <input
          type="number"
          placeholder="Member ID"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          className="border p-2 rounded"
        />
        <Button onClick={fetchFine} className="bg-primary">
          <FineIcon className="w-5 h-5 inline mr-1" /> Check Fines
        </Button>
      </Card>
      {fine !== null && (
        <div className="text-lg font-medium">
          Outstanding Fines: ${fine.toFixed(2)}
        </div>
      )}
    </div>
  )
}
