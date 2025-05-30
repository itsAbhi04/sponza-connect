"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Shield,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  BarChart3,
  Settings,
  Activity,
} from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Platform overview and AI-powered insights</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button>
                <Activity className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +15%
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">10,234</h3>
                <p className="text-sm text-gray-600">Total Users</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +25%
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">1,234</h3>
                <p className="text-sm text-gray-600">Active Campaigns</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +30%
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">₹2.5Cr</h3>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    -5%
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">23</h3>
                <p className="text-sm text-gray-600">Pending Reviews</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Insights */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <CardTitle>AI Insights</CardTitle>
                  </div>
                  <CardDescription>AI-generated platform insights and recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg bg-yellow-50">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-2">Platform Alert</h4>
                        <p className="text-sm text-gray-600">
                          Unusual spike in campaign creation detected. Review recommended.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">User Growth Trend</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Influencer signups up by 25%</li>
                      <li>• Brand registrations up by 15%</li>
                      <li>• Peak signup time: 6-8 PM</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Campaign Performance</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Video content engagement up 40%</li>
                      <li>• Fashion category leading growth</li>
                      <li>• Average campaign duration: 45 days</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Review Moderation Queue
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="w-full">
                    <DollarSign className="h-4 w-4 mr-2" />
                    View Transactions
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activities and actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Activity 1 */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Campaign Approved</h4>
                          <p className="text-sm text-gray-600">Summer Collection by Fashion Brand Co.</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">2 hours ago</p>
                        <Badge className="bg-green-100 text-green-700">Approved</Badge>
                      </div>
                    </div>

                    {/* Activity 2 */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">User Verification</h4>
                          <p className="text-sm text-gray-600">Sarah Johnson - Fashion Influencer</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">5 hours ago</p>
                        <Badge className="bg-orange-100 text-orange-700">Pending</Badge>
                      </div>
                    </div>

                    {/* Activity 3 */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <AlertCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Content Flagged</h4>
                          <p className="text-sm text-gray-600">Tech Review Campaign by Mike Chen</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">1 day ago</p>
                        <Badge className="bg-red-100 text-red-700">Flagged</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
