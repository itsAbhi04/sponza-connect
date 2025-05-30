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
  Shield,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  MessageSquare,
  BarChart3,
  User,
  Settings,
  AlertCircle,
} from "lucide-react"

export default function AdminLogsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Activity Logs</h1>
              <p className="text-gray-600">Track all admin actions and system events</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              <Button>
                <BarChart3 className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Actions</CardTitle>
                <Shield className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,678</div>
                <p className="text-xs text-gray-600">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">User Management</CardTitle>
                <User className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-gray-600">Actions today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Content Moderation</CardTitle>
                <AlertCircle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">890</div>
                <p className="text-xs text-gray-600">Actions today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">System Changes</CardTitle>
                <Settings className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-gray-600">Actions today</p>
              </CardContent>
            </Card>
          </div>

          {/* Activity Logs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Activity Logs</CardTitle>
                  <CardDescription>Detailed log of all admin actions</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search logs..."
                      className="pl-8"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="user">User Management</SelectItem>
                      <SelectItem value="content">Content Moderation</SelectItem>
                      <SelectItem value="system">System Changes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="user">User Management</TabsTrigger>
                  <TabsTrigger value="content">Content Moderation</TabsTrigger>
                  <TabsTrigger value="system">System Changes</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {/* Log Entry 1 */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">User Suspension</h3>
                          <Badge className="bg-red-100 text-red-700">Critical</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Admin: John Doe • 2 hours ago</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>User: Mike Chen</span>
                          <span>Reason: Policy Violation</span>
                          <span>Duration: 7 days</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Ban className="h-4 w-4 text-red-600" />
                          <span>Action: User suspended</span>
                          <span className="text-gray-400">|</span>
                          <span>IP: 192.168.1.1</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button size="sm">Revert Action</Button>
                      </div>
                    </div>
                  </div>

                  {/* Log Entry 2 */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Campaign Approval</h3>
                          <Badge className="bg-green-100 text-green-700">Standard</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Admin: Jane Smith • 5 hours ago</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Campaign: Summer Collection</span>
                          <span>Brand: Fashion Co.</span>
                          <span>Budget: ₹2.5L</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Action: Campaign approved</span>
                          <span className="text-gray-400">|</span>
                          <span>IP: 192.168.1.2</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button size="sm">Revert Action</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="user" className="space-y-4">
                  {/* User Management Log */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">User Verification</h3>
                          <Badge className="bg-blue-100 text-blue-700">Standard</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Admin: Sarah Wilson • 1 day ago</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>User: Emma Johnson</span>
                          <span>Role: Influencer</span>
                          <span>Followers: 50K</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Action: User verified</span>
                          <span className="text-gray-400">|</span>
                          <span>IP: 192.168.1.3</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button size="sm">Revert Action</Button>
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
