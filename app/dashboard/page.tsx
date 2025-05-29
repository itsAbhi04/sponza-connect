"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { GlobalSearch } from "@/components/search/global-search"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { Users, Target, DollarSign, TrendingUp, MessageCircle, Settings } from "lucide-react"

interface User {
  _id: string
  name: string
  email: string
  role: "admin" | "brand" | "influencer"
  profilePicture?: string
}

interface DashboardStats {
  totalCampaigns?: number
  activeCampaigns?: number
  totalApplications?: number
  acceptedApplications?: number
  totalEarnings?: number
  totalSpending?: number
  pendingPayments?: number
  totalUsers?: number
  totalInfluencers?: number
  totalBrands?: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<DashboardStats>({})
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get user info from localStorage or API
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Redirect to role-specific dashboard
      if (parsedUser.role !== "admin") {
        router.push(`/${parsedUser.role}/dashboard`)
        return
      }
    }

    fetchDashboardData()
  }, [router])

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard stats based on user role
      const statsResponse = await fetch("/api/admin/analytics")
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch recent activities (placeholder)
      setActivities([])
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchResult = (type: string, id: string) => {
    switch (type) {
      case "campaign":
        router.push(`/admin/campaigns?id=${id}`)
        break
      case "influencer":
        router.push(`/admin/users?role=influencer&id=${id}`)
        break
      case "brand":
        router.push(`/admin/users?role=brand&id=${id}`)
        break
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.role === "admin" ? "Admin Dashboard" : "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <GlobalSearch onResultClick={handleSearchResult} />
              <NotificationCenter userId={user._id} />
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h2>
          <p className="text-gray-600">Here's what's happening on your platform today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user.role === "admin" && (
            <>
              <StatsCard
                title="Total Users"
                value={stats.totalUsers || 0}
                icon={<Users className="h-4 w-4" />}
                loading={loading}
              />
              <StatsCard
                title="Active Campaigns"
                value={stats.activeCampaigns || 0}
                icon={<Target className="h-4 w-4" />}
                loading={loading}
              />
              <StatsCard
                title="Total Revenue"
                value={`₹${((stats.totalSpending || 0) * 0.05).toLocaleString()}`}
                icon={<DollarSign className="h-4 w-4" />}
                loading={loading}
              />
              <StatsCard
                title="Growth Rate"
                value="12.5%"
                change={2.1}
                changeType="increase"
                icon={<TrendingUp className="h-4 w-4" />}
                loading={loading}
              />
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {user.role === "admin" && (
                <>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => router.push("/admin/users")}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => router.push("/admin/campaigns")}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Review Campaigns
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => router.push("/admin/analytics")}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <RecentActivity activities={activities} loading={loading} />
          </div>
        </div>

        {/* Platform Overview */}
        {user.role === "admin" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">System Status</span>
                    <span className="text-sm font-medium text-green-600">Operational</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">API Response Time</span>
                    <span className="text-sm font-medium">245ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Uptime</span>
                    <span className="text-sm font-medium text-green-600">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Sessions</span>
                    <span className="text-sm font-medium">1,234</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">High API Usage</p>
                      <p className="text-xs text-gray-600">API calls increased by 25% in the last hour</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">System Update Complete</p>
                      <p className="text-xs text-gray-600">Platform updated to version 2.1.0</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">New Feature Deployed</p>
                      <p className="text-xs text-gray-600">AI recommendations now available</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
