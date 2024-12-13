'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays, Mail, UserCircle } from 'lucide-react'
import { Tabs } from '@radix-ui/react-tabs'
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

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
      router.push('/dashboard')
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    // <div className="max-w-md mx-auto p-4 bg-red-50 rounded-lg shadow-md">
    //   <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
    //   <p>Welcome, Admin {user.name}!</p>
    //   <p>Email: {user.email}</p>
    //   <p>Role: {user.role}</p>
    //   <button
    //     onClick={handleLogout}
    //     className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    //   >
    //     Logout
    //   </button>
    // </div>
    //newcode
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Card className="border-l-4 border-l-pink-500">
          <CardHeader>
            <CardTitle className="text-2xl">
              Admin Dashboard
            </CardTitle>
            <CardDescription>
              Welcome back, {user.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <UserCircle className="h-8 w-8 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Role</p>
                      <p className="text-lg capitalize">{user.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-8 w-8 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-lg">{user.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <CalendarDays className="h-8 w-8 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Member Since</p>
                      <p className="text-lg">January 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="p-4">
                <h3 className="text-lg font-medium">System Overview</h3>
                <p className="text-gray-600">
                  Welcome to your personalized dashboard. Here you can manage your farming operations,
                  view analytics, and access important reports.
                </p>
              </TabsContent>
              <TabsContent value="analytics" className="p-4">
                Analytics content
              </TabsContent>
              <TabsContent value="reports" className="p-4">
                Reports content
              </TabsContent>
            </Tabs>
            <Button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

