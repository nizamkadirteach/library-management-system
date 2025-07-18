import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function MemberListPage() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data } = await api.get('/members')
        setMembers(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchMembers()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <ul className="space-y-2">
        {members.map((m) => (
          <li key={m.id} className="border p-2 rounded">
            {m.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
