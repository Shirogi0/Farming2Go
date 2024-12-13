'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

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
    // <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm">
    //   <h1 className="text-2xl font-bold mb-4">Register</h1>
    //   {!isOtpSent ? (
    //     <form onSubmit={handleRegister} className="space-y-4">
    //       <input
    //         type="text"
    //         placeholder="Name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         className="w-full p-2 border rounded"
    //         required
    //       />
    //       <input
    //         type="email"
    //         placeholder="Email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         className="w-full p-2 border rounded"
    //         required
    //       />
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         className="w-full p-2 border rounded"
    //         required
    //       />
    //       <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
    //         Register
    //       </button>
    //     </form>
    //   ) : (
    //     <form onSubmit={handleVerifyOtp} className="space-y-4">
    //       <input
    //         type="text"
    //         placeholder="Enter OTP"
    //         value={otp}
    //         onChange={(e) => setOtp(e.target.value)}
    //         className="w-full p-2 border rounded"
    //         required
    //       />
    //       <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
    //         Verify OTP
    //       </button>
    //     </form>
    //   )}
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold">Register</CardTitle>
      <CardDescription>
            Register your account.
          </CardDescription>
          </CardHeader>
      {!isOtpSent ? (
        <form onSubmit={handleRegister} className="">
          <CardContent className="space-y-4">
          <div className="space-y-2">
          {/* <Label htmlFor="name">Name</Label> */}
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          </div>
          <div className="space-y-2">
          {/* <Label htmlFor="email">Email</Label> */}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          </div>
          <div className="space-y-2">
          {/* <Label htmlFor="password">Password</Label> */}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full bg-green-500">
            Register
          </Button>

          <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>

          </CardFooter>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <Button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Verify OTP
          </Button>
        </form>
        
      )}
      </Card>
    </div>
  )
}

