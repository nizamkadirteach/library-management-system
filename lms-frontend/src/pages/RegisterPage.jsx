import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

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
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      alert('Registration failed')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-2"
      >
        <h2 className="text-xl mb-2 font-bold text-center">Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border p-1 w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-1 w-full"
          required
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="border p-1 w-full"
        />
        <input
          type="text"
          name="contactInfo"
          placeholder="Contact Info"
          value={form.contactInfo}
          onChange={handleChange}
          className="border p-1 w-full"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border p-1 w-full"
        />
        <input
          type="date"
          name="membershipStart"
          placeholder="Start"
          value={form.membershipStart}
          onChange={handleChange}
          className="border p-1 w-full"
        />
        <input
          type="date"
          name="membershipEnd"
          placeholder="End"
          value={form.membershipEnd}
          onChange={handleChange}
          className="border p-1 w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-1 rounded"
        >
          Register
        </button>
      </form>
    </div>
  )
}
