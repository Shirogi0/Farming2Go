'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user')

      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        router.push('/login')
      }
    }

    fetchUser()
  }, [router])

  if (!user) return <div>Loading...</div>

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  )
}

