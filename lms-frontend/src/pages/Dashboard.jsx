import { useState } from 'react'
import api from '../api/axios'

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
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="number"
          placeholder="Member ID"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          className="border p-1"
        />
        <button
          onClick={fetchFine}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Check Fines
        </button>
      </div>
      {fine !== null && (
        <div className="text-lg">Outstanding Fines: ${fine.toFixed(2)}</div>
      )}
    </div>
  )
}
