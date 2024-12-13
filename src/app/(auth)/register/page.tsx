'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check login status on component mount
    fetch('/api/user')
      .then(res => {
        if (res.ok) {
          router.push('/user')
        }
      })
  }, [router])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
    if (res.ok) {
      setIsOtpSent(true)
    } else {
      alert('Registration failed')
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    })
    if (res.ok) {
      const { role } = await res.json()
      window.location.href = role === 'admin' ? '/admin' : '/user'
    } else {
      alert('OTP verification failed')
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {!isOtpSent ? (
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Register
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Verify OTP
          </button>
        </form>
      )}
    </div>
  )
}

