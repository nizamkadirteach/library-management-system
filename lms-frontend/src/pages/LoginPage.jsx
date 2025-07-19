import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import UserIcon from '../assets/icons/UserIcon'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/login', { username, password })
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      alert('Login failed')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      {/* ⬆️ Improved: card container with theming */}
      <Card className="w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          {/* ⬆️ Improved: added user icon */}
          <UserIcon className="w-8 h-8 text-primary" />
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="sr-only" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <Button type="submit" className="bg-primary w-full">
            Login
          </Button>
        </form>
        <div className="text-center">
          <span className="text-sm">Don't have an account? </span>
          <Link to="/register" className="text-primary underline">
            Register
          </Link>
        </div>
      </Card>
    </div>
  )
}
