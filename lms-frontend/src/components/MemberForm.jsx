import { useState, useEffect } from 'react'
import api from '../api/axios'
import Button from './ui/Button'

export default function MemberForm({ member, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    fullName: '',
    contactInfo: '',
    address: '',
    membershipStart: '',
    membershipEnd: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (member) {
      setForm({
        fullName: member.fullName || '',
        contactInfo: member.contactInfo || '',
        address: member.address || '',
        membershipStart: member.membershipStart || '',
        membershipEnd: member.membershipEnd || '',
      })
    }
  }, [member])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!form.fullName) {
      setError('Full name is required')
      return
    }
    try {
      const payload = { ...form }
      if (member && member.memberId) {
        await api.put(`/members/${member.memberId}`, payload)
      } else {
        await api.post('/members', payload)
      }
      setSuccess('Saved successfully')
      if (onSuccess) onSuccess()
    } catch (err) {
      console.error(err)
      setError('Failed to save')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded bg-gray-50">
      {error && (
        <div className="text-red-600" id="member-form-error" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-600" role="status">
          {success}
        </div>
      )}
      <div className="space-y-1">
        <label htmlFor="fullName" className="block text-sm font-medium">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          aria-describedby="member-form-error"
          className="border p-1 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="contactInfo" className="sr-only">
          Contact Info
        </label>
        <input
          id="contactInfo"
          name="contactInfo"
          type="text"
          placeholder="Contact Info"
          value={form.contactInfo}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="address" className="sr-only">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="membershipStart" className="sr-only">
          Membership Start
        </label>
        <input
          id="membershipStart"
          name="membershipStart"
          type="date"
          placeholder="Start"
          value={form.membershipStart}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="membershipEnd" className="sr-only">
          Membership End
        </label>
        <input
          id="membershipEnd"
          name="membershipEnd"
          type="date"
          placeholder="End"
          value={form.membershipEnd}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="bg-primary">
          Save
        </Button>
        {onCancel && (
          <Button type="button" onClick={onCancel} className="border text-text">
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
