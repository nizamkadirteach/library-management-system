import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import UserIcon from '../assets/icons/UserIcon'
import Logo from '../components/common/Logo'
import { getUserRole, setFullName } from '../utils/auth'

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    fullName: '',
    contactInfo: '',
    address: '',
    membershipStart: '',
    membershipEnd: '',
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/register', {
        username: form.username,
        password: form.password,
        fullName: form.fullName,
        contactInfo: form.contactInfo,
        address: form.address,
        membershipStart: form.membershipStart,
        membershipEnd: form.membershipEnd,
      })
      localStorage.setItem('token', data.token)
      try {
        const res = await api.get('/members/me')
        setFullName(res.data.fullName)
      } catch (err) {
        console.error(err)
      }
      const role = getUserRole()
      if (role === 'ADMIN') {
        navigate('/admin-dashboard')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      console.error(err)
      alert('Registration failed')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      {/* ✅ Logo added above register form */}
      <Logo size="medium" variant="auth" />
      {/* ⬆️ Improved: theme card layout */}
      <Card className="w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <UserIcon className="w-8 h-8 text-primary" /> Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="fullName" className="sr-only">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="contactInfo" className="sr-only">
              Contact Info
            </label>
            <input
              id="contactInfo"
              type="text"
              name="contactInfo"
              placeholder="Contact Info"
              value={form.contactInfo}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="address" className="sr-only">
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          {/* ✅ Added label for Membership Start Date */}
          <div className="space-y-1">
            <label
              className="block text-sm font-medium"
              htmlFor="membershipStart"
            >
              Membership Start Date
            </label>
            <small className="text-xs text-gray-500">e.g., 01/01/2025</small>
            <input
              id="membershipStart"
              type="date"
              name="membershipStart"
              placeholder="Start"
              value={form.membershipStart}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          {/* ✅ Added label for Membership End Date */}
          <div className="space-y-1">
            <label
              className="block text-sm font-medium"
              htmlFor="membershipEnd"
            >
              Membership End Date
            </label>
            <small className="text-xs text-gray-500">e.g., 01/01/2025</small>
            <input
              id="membershipEnd"
              type="date"
              name="membershipEnd"
              placeholder="End"
              value={form.membershipEnd}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <Button type="submit" className="bg-secondary w-full">
            Register
          </Button>
        </form>
      </Card>
    </div>
  )
}
