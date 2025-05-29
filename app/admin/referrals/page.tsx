"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  Users,
  Gift,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  MessageSquare,
  BarChart3,
  Copy,
} from "lucide-react"

export default function ReferralMonitoringPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Referral Monitoring</h1>
              <p className="text-gray-600">Track referral program performance and rewards</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              <Button>
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-gray-600">+15% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Affiliates</CardTitle>
                <Gift className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">456</div>
                <p className="text-xs text-gray-600">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹12.5L</div>
                <p className="text-xs text-gray-600">+20% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <Sparkles className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32%</div>
                <p className="text-xs text-gray-600">AI Optimized</p>
              </CardContent>
            </Card>
          </div>

          {/* Referral List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Referral Program</CardTitle>
                  <CardDescription>Monitor referral performance and rewards</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search referrals..."
                      className="pl-8"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {/* Referral 1 */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Sarah Johnson</h3>
                          <Badge className="bg-green-100 text-green-700">Active</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Referral Code: SARAH123 • Joined 2 months ago</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>12 Referrals</span>
                          <span>₹25,000 Earned</span>
                          <span>85% Conversion</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                          <span>AI Score: 92/100</span>
                          <span className="text-gray-400">|</span>
                          <span>Top Performer</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Code
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>

                  {/* Referral 2 */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Mike Chen</h3>
                          <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Referral Code: MIKE456 • Joined 1 month ago</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>5 Referrals</span>
                          <span>₹10,000 Pending</span>
                          <span>60% Conversion</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          <span>3 Pending Approvals</span>
                          <span className="text-gray-400">|</span>
                          <span>Last Activity: 2 days ago</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Code
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="active" className="space-y-4">
                  {/* Active Referral */}
                  <div className="border rounded-lg p-6 bg-green-50">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Emma Wilson</h3>
                          <Badge className="bg-green-100 text-green-700">Active</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Referral Code: EMMA789 • Joined 3 months ago</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>25 Referrals</span>
                          <span>₹50,000 Earned</span>
                          <span>92% Conversion</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                          <span>AI Score: 98/100</span>
                          <span className="text-gray-400">|</span>
                          <span>Elite Performer</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Code
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <CardTitle>AI Insights</CardTitle>
                </div>
                <CardDescription>AI-generated insights for referral program optimization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Conversion Optimization</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Video content referrals convert 40% better</li>
                    <li>• Peak referral time: 6-8 PM</li>
                    <li>• Fashion category leading conversions</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Reward Suggestions</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Increase rewards for tech category</li>
                    <li>• Add bonus for weekend referrals</li>
                    <li>• Tier-based reward structure recommended</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
