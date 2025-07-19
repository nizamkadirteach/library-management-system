import { useEffect, useState } from 'react'
import api from '../api/axios'
import FineNotice from '../components/FineNotice'
import UserIcon from '../assets/icons/UserIcon'
import BorrowPage from './BorrowPage'

export default function MemberDashboard() {
  const [fine, setFine] = useState(null)

  useEffect(() => {
    const fetchFine = async () => {
      try {
        const { data: member } = await api.get('/members/me')
        const res = await api.get(`/fines/${member.memberId}`)
        setFine(parseFloat(res.data))
      } catch (err) {
        console.error(err)
      }
    }
    fetchFine()
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <UserIcon className="w-6 h-6" /> Member Dashboard
      </h1>
      {fine !== null && <FineNotice amount={fine} />}
      {/* 🧠 Allow searching/borrowing books directly from dashboard */}
      <BorrowPage />
    </div>
  )
}
