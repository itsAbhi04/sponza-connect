"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: string
  verificationStatus: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication and get user data
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify-session")
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)

          // Redirect to role-specific dashboard
          switch (data.user.role) {
            case "influencer":
              router.push("/dashboard/influencer")
              break
            case "brand":
              router.push("/dashboard/brand")
              break
            case "admin":
              router.push("/dashboard/admin")
              break
            default:
              router.push("/auth/login")
          }
        } else {
          router.push("/auth/login")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground">Redirecting to your {user.role} dashboard...</p>
      </div>
    </div>
  )
}
