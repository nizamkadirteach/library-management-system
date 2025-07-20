import { useEffect, useState } from 'react'
import api from '../api/axios'
import MemberForm from '../components/MemberForm'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import SearchIcon from '../assets/icons/SearchIcon'
import UserIcon from '../assets/icons/UserIcon'

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

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this member?')) return
    try {
      await api.delete(`/members/${id}`)
      fetchMembers()
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
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Members</h1>
      <div className="flex flex-col gap-3">
        <form onSubmit={handleSearch} className="flex gap-2 flex-wrap">
          <div>
            <label htmlFor="memberSearch" className="sr-only">
              Search Members
            </label>
            <input
              id="memberSearch"
              type="text"
              placeholder="Search by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border p-2 rounded flex-1 min-w-[150px]"
            />
          </div>
          <Button type="submit" className="bg-primary flex items-center gap-1">
            <SearchIcon className="w-5 h-5" /> Search
          </Button>
        </form>
        <Button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="bg-secondary w-fit"
        >
          <UserIcon className="w-5 h-5 inline mr-1" />
          {showAdd ? 'Close' : 'Add Member'}
        </Button>
      </div>
      {showAdd && (
        <div className="mb-4">
          <MemberForm
            onSuccess={() => {
              setShowAdd(false)
              fetchMembers()
            }}
            onCancel={() => setShowAdd(false)}
          />
        </div>
      )}
      <ul className="space-y-2">
        {members.map((m) => (
          <li key={m.memberId}>
            <Card className="flex justify-between items-start gap-2">
              <span className="font-medium">
                {m.fullName}
                <span className="block text-sm font-normal">
                  Borrows: {m.borrowCount} | Fines: ${m.fineAmount}
                </span>
              </span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => setEditMember(m)}
                  className="bg-primary text-sm"
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  onClick={() => handleDelete(m.memberId)}
                  className="bg-red-600 text-sm"
                >
                  Delete
                </Button>
              </div>
            </Card>
            {editMember && editMember.memberId === m.memberId && (
              <div className="mt-2">
                <MemberForm
                  member={editMember}
                  onSuccess={() => {
                    setEditMember(null)
                    fetchMembers()
                  }}
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
