import { useEffect, useState } from 'react'
import api from '../api/axios'
import MemberForm from '../components/MemberForm'

export default function MemberListPage() {
  const [members, setMembers] = useState([])
  const [query, setQuery] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [editMember, setEditMember] = useState(null)

  const fetchMembers = async () => {
    try {
      const { data } = await api.get('/members')
      setMembers(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.get('/members/search', {
        params: { name: query },
      })
      setMembers(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <div className="mb-4 flex gap-2 items-center">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <input
            type="text"
            placeholder="Search by name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-1 flex-1"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
            Search
          </button>
        </form>
        <button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          {showAdd ? 'Close' : 'Add Member'}
        </button>
      </div>
      {showAdd && (
        <div className="mb-4">
          <MemberForm onSuccess={() => { setShowAdd(false); fetchMembers(); }} onCancel={() => setShowAdd(false)} />
        </div>
      )}
      <ul className="space-y-2">
        {members.map((m) => (
          <li key={m.memberId} className="border p-2 rounded">
            <div className="flex justify-between items-center">
              <span>{m.fullName}</span>
              <button
                className="text-blue-600 underline"
                onClick={() => setEditMember(m)}
              >
                Edit
              </button>
            </div>
            {editMember && editMember.memberId === m.memberId && (
              <div className="mt-2">
                <MemberForm
                  member={editMember}
                  onSuccess={() => { setEditMember(null); fetchMembers(); }}
                  onCancel={() => setEditMember(null)}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
