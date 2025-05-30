"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "brand" | "influencer" | "admin"
  emailVerified: boolean
  profilePicture?: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)

        // Redirect to appropriate dashboard based on role
        if (pathname === "/dashboard") {
          if (data.user.role === "brand") {
            router.replace("/dashboard/brand")
          } else if (data.user.role === "influencer") {
            router.replace("/dashboard/influencer")
          } else if (data.user.role === "admin") {
            router.replace("/dashboard/admin")
          }
        }
      } else {
        router.replace("/auth/login")
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      router.replace("/auth/login")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
