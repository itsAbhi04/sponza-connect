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
  Target,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  MessageSquare,
  BarChart3,
} from "lucide-react"

export default function CampaignModerationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Campaign Moderation</h1>
              <p className="text-gray-600">Review and moderate campaign content</p>
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
                <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
                <Target className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-gray-600">+25% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-gray-600">12 urgent</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">AI Flagged</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-red-600">Requires attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">56</div>
                <p className="text-xs text-gray-600">98% success rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Campaign List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campaign Reviews</CardTitle>
                  <CardDescription>Review and moderate campaign content</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search campaigns..."
                      className="pl-8"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="flagged">AI Flagged</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-4">
                  {/* Campaign 1 */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Summer Collection Launch</h3>
                          <Badge className="bg-purple-100 text-purple-700">Fashion</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Fashion Brand Co. • Submitted 2 hours ago</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Budget: ₹2,50,000</span>
                          <span>5 Influencers</span>
                          <span>30 Days Duration</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          <span>Pending Review</span>
                          <span className="text-gray-400">|</span>
                          <span>Priority: High</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                  </div>

                  {/* Campaign 2 */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Tech Product Review</h3>
                          <Badge className="bg-blue-100 text-blue-700">Technology</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Tech Startup Inc. • Submitted 5 hours ago</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Budget: ₹1,50,000</span>
                          <span>3 Influencers</span>
                          <span>15 Days Duration</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          <span>Pending Review</span>
                          <span className="text-gray-400">|</span>
                          <span>Priority: Medium</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="flagged" className="space-y-4">
                  {/* Flagged Campaign */}
                  <div className="border rounded-lg p-6 bg-red-50">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Beauty Product Campaign</h3>
                          <Badge className="bg-red-100 text-red-700">AI Flagged</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Beauty Brand Ltd. • Submitted 1 day ago</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Budget: ₹3,00,000</span>
                          <span>8 Influencers</span>
                          <span>45 Days Duration</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <span>Policy Violation: Misleading Claims</span>
                          <span className="text-gray-400">|</span>
                          <span>Confidence: 95%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm">Review</Button>
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
