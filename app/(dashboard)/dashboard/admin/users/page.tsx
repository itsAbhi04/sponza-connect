"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Users,
  Shield,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  AlertCircle,
} from "lucide-react"

export default function UserManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">User Management</h1>
              <p className="text-gray-600">Manage users, roles, and verification status</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10,234</div>
                <p className="text-xs text-gray-600">+15% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-gray-600">23 urgent</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,945</div>
                <p className="text-xs text-green-600">87% of total users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Suspended Users</CardTitle>
                <Ban className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-gray-600">5 this week</p>
              </CardContent>
            </Card>
          </div>

          {/* User List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search users..."
                      className="pl-8"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="brand">Brands</SelectItem>
                      <SelectItem value="influencer">Influencers</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All Users</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="verified">Verified</TabsTrigger>
                  <TabsTrigger value="suspended">Suspended</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {/* User 1 */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Sarah Johnson</h3>
                          <Badge className="bg-purple-100 text-purple-700">Influencer</Badge>
                        </div>
                        <p className="text-sm text-gray-600">sarah.j@example.com • Joined 2 months ago</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>50K Followers</span>
                          <span>4.8% Engagement</span>
                          <span>12 Campaigns</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Shield className="h-4 w-4 text-green-600" />
                          <span>Verified</span>
                          <span className="text-gray-400">|</span>
                          <span>Last active: 2 hours ago</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* User 2 */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Fashion Brand Co.</h3>
                          <Badge className="bg-blue-100 text-blue-700">Brand</Badge>
                        </div>
                        <p className="text-sm text-gray-600">contact@fashionbrand.com • Joined 1 month ago</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>5 Active Campaigns</span>
                          <span>₹2.5L Spent</span>
                          <span>25 Influencers</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          <span>Pending Verification</span>
                          <span className="text-gray-400">|</span>
                          <span>Last active: 5 hours ago</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* User 3 */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Mike Chen</h3>
                          <Badge className="bg-red-100 text-red-700">Suspended</Badge>
                        </div>
                        <p className="text-sm text-gray-600">mike.c@example.com • Joined 3 months ago</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>100K Followers</span>
                          <span>3.2% Engagement</span>
                          <span>8 Campaigns</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <span>Suspended: Policy Violation</span>
                          <span className="text-gray-400">|</span>
                          <span>Last active: 1 week ago</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
