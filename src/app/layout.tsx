'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkLoginStatus = async () => {
      const res = await fetch('/api/user')
      setIsLoggedIn(res.ok)
    }
    checkLoginStatus()
  }, [])

  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', { method: 'POST' })
    if (res.ok) {
      setIsLoggedIn(false)
      router.push('/login')
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-sm">
            {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
              <div className="flex justify-between h-16 ">
                <div className="flex">
                  <Link href="/" className="flex-shrink-0 flex items-center">
                    Home
                  </Link>
                </div>
                <div className="flex items-center">
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Logout
                    </button>
                    
                  ) : (
                    <>
                      <Link href="/login" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                        Login
                      </Link>
                      <Link href="/register" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div> */}
          </nav>
          <main className="">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

// max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 p-5 