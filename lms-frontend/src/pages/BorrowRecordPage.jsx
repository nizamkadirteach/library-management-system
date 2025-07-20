import { useEffect, useState } from 'react'
import api from '../api/axios'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import SearchIcon from '../assets/icons/SearchIcon'
import BorrowIcon from '../assets/icons/BorrowIcon'
import ReturnIcon from '../assets/icons/ReturnIcon'

export default function BorrowRecordPage() {
  const [records, setRecords] = useState([])
  const [memberId, setMemberId] = useState(null)
  const [bookId, setBookId] = useState('')
  const [search, setSearch] = useState({
    title: '',
    startDate: '',
    endDate: '',
  })

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

  const handleBorrow = async (e) => {
    e.preventDefault()
    try {
      await api.post('/borrow-records/borrow', null, {
        params: { memberId, bookId },
      })
      setBookId('')
      fetchRecords()
    } catch (err) {
      console.error(err)
      alert('Failed to borrow')
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.get('/borrow-records/my/search', {
        params: {
          title: search.title,
          startDate: search.startDate,
          endDate: search.endDate,
        },
      })
      setRecords(data)
    } catch (err) {
      console.error(err)
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
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Borrow Records</h1>
      <form onSubmit={handleSearch} className="flex gap-2 flex-wrap">
        <div>
          <label htmlFor="searchTitle" className="sr-only">
            Title
          </label>
          <input
            id="searchTitle"
            type="text"
            placeholder="Title"
            value={search.title}
            onChange={(e) => setSearch({ ...search, title: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="sr-only">
            Start date
          </label>
          <input
            id="startDate"
            type="date"
            value={search.startDate}
            onChange={(e) => setSearch({ ...search, startDate: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="sr-only">
            End date
          </label>
          <input
            id="endDate"
            type="date"
            value={search.endDate}
            onChange={(e) => setSearch({ ...search, endDate: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <Button type="submit" className="bg-primary flex items-center gap-1">
          <SearchIcon className="w-5 h-5" /> Search
        </Button>
      </form>
      <form onSubmit={handleBorrow} className="flex gap-2 flex-wrap">
        <div>
          <label htmlFor="borrowBookId" className="sr-only">
            Book ID
          </label>
          <input
            id="borrowBookId"
            type="number"
            placeholder="Book ID"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <Button type="submit" className="bg-secondary flex items-center gap-1">
          <BorrowIcon className="w-5 h-5" /> Borrow
        </Button>
      </form>
      <ul className="space-y-2">
        {records.map((r) => {
          const overdue =
            r.returnDate == null && new Date(r.dueDate) < new Date()
          return (
            <li key={r.recordId}>
              <Card className="flex justify-between items-center gap-2">
                {/* 🧠 Reused BookCard component under My Borrowed Books */}
                <span className="flex-1">
                  Record {r.recordId} &ndash; Book {r.bookTitle} (ID {r.bookId}) &ndash; Member {r.memberName} (ID {r.memberId})
                  <span className="ml-2">Due: {r.dueDate}</span>
                  {overdue && (
                    <span className="text-red-600 ml-2">Overdue!</span>
                  )}
                </span>
                {r.returnDate == null && (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={() => handleReturn(r.recordId)}
                      className="bg-primary text-xs"
                    >
                      <ReturnIcon className="w-4 h-4 mr-1" /> Return
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleRenew(r.recordId)}
                      className="bg-secondary text-xs"
                    >
                      Renew
                    </Button>
                  </div>
                )}
              </Card>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
