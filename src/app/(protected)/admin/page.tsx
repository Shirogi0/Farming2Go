'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user')

      if (res.ok) {
        const data = await res.json()
        if (data.user.role !== 'admin') {
          router.push('/user')
        } else {
          setUser(data.user)
        }
      } else {
        router.push('/login')
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', { method: 'POST' })
    if (res.ok) {
      router.push('/login')
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="max-w-md mx-auto p-4 bg-green-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin {user.name}!</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      {/* <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button> */}
    </div>
  )
}

