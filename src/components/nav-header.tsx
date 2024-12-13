'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'

export function NavHeader() {
  const pathname = usePathname()
  const isLoggedIn = pathname.includes('/dashboard')

  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-xl text-green-600">
          Farming2Go
        </Link>
        
        <nav>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">Dashboard</Link>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

