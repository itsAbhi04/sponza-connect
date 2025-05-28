"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  Users,
  Target,
  Plus,
  Eye,
  MessageSquare,
  BarChart3,
  ArrowUpRight,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function BrandDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    totalSpent: 245000,
    activeCampaigns: 8,
    totalReach: 1200000,
    avgEngagement: 4.2,
  })

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Sponza
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Brand Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-100 text-blue-700">Premium Plan</Badge>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="influencers">Influencers</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{stats.totalSpent.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12.5%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeCampaigns}</div>
                  <p className="text-xs text-muted-foreground">3 pending approval</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(stats.totalReach / 1000000).toFixed(1)}M</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+8.1%</span> this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgEngagement}%</div>
                  <p className="text-xs text-muted-foreground">Above industry average</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Campaign Performance */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Performance</CardTitle>
                    <CardDescription>Your active and recent campaigns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Target className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Summer Collection Launch</h3>
                            <p className="text-sm text-gray-600">5 influencers • Fashion</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className="bg-green-100 text-green-700 text-xs">Active</Badge>
                              <span className="text-xs text-gray-500">Ends: Dec 30</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹75,000</div>
                          <div className="text-sm text-gray-600">450K reach</div>
                          <Progress value={75} className="w-20 mt-2" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Target className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Tech Product Review</h3>
                            <p className="text-sm text-gray-600">3 influencers • Technology</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className="bg-yellow-100 text-yellow-700 text-xs">In Review</Badge>
                              <span className="text-xs text-gray-500">Ends: Jan 15</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹50,000</div>
                          <div className="text-sm text-gray-600">320K reach</div>
                          <Progress value={45} className="w-20 mt-2" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Target className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Holiday Special Campaign</h3>
                            <p className="text-sm text-gray-600">8 influencers • Lifestyle</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className="bg-gray-100 text-gray-700 text-xs">Completed</Badge>
                              <span className="text-xs text-gray-500">Ended: Dec 10</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹1,20,000</div>
                          <div className="text-sm text-gray-600">850K reach</div>
                          <Progress value={100} className="w-20 mt-2" />
                        </div>
                      </div>
                    </div>

                    <Button className="w-full mt-4" variant="outline">
                      View All Campaigns
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Insights */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/dashboard/brand/campaigns/create">
                      <Button className="w-full justify-start">
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Campaign
                      </Button>
                    </Link>
                    <Link href="/dashboard/brand/influencers">
                      <Button className="w-full justify-start" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Discover Influencers
                      </Button>
                    </Link>
                    <Link href="/dashboard/brand/messages">
                      <Button className="w-full justify-start" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Check Messages
                      </Button>
                    </Link>
                    <Link href="/dashboard/brand/analytics">
                      <Button className="w-full justify-start" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 text-xs font-semibold">SJ</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Sarah Johnson</p>
                            <p className="text-xs text-gray-500">125K followers</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 text-xs">New</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 text-xs font-semibold">MK</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Mike Kumar</p>
                            <p className="text-xs text-gray-500">89K followers</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 text-xs">New</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <span className="text-pink-600 text-xs font-semibold">AP</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Anita Patel</p>
                            <p className="text-xs text-gray-500">156K followers</p>
                          </div>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-700 text-xs">Review</Badge>
                      </div>
                    </div>

                    <Button className="w-full mt-4" variant="ghost" size="sm">
                      View All Applications <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Campaign Success Rate</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Avg. Response Time</span>
                          <span>2.4 hrs</span>
                        </div>
                        <Progress value={85} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Influencer Satisfaction</span>
                          <span>4.8/5</span>
                        </div>
                        <Progress value={96} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>My Campaigns</CardTitle>
                <CardDescription>Manage all your campaigns and track their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Campaign management feature coming soon!</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="influencers">
            <Card>
              <CardHeader>
                <CardTitle>Discover Influencers</CardTitle>
                <CardDescription>Find and connect with influencers that match your brand</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Influencer discovery feature coming soon!</p>
                  <Button>Browse Influencers</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Manage Applications</CardTitle>
                <CardDescription>Review and manage influencer applications for your campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Application management coming soon!</p>
                  <Button>View Applications</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Analytics</CardTitle>
                <CardDescription>Detailed insights and performance metrics for your campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Advanced analytics coming soon!</p>
                  <Button>View Analytics</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet">
            <Card>
              <CardHeader>
                <CardTitle>Wallet & Payments</CardTitle>
                <CardDescription>Manage your payments and transaction history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Wallet management coming soon!</p>
                  <Button>Manage Payments</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
