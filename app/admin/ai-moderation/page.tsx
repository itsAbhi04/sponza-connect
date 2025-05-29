"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Flag,
  MessageSquare,
  Filter,
  Download,
  RefreshCw,
  Shield,
  Image,
  Video,
  Link,
  FileText,
} from "lucide-react"

export default function AIModerationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">AI Moderation Queue</h1>
              <p className="text-gray-600">Review and moderate AI-flagged content</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-gray-500">+12% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-gray-500">+5% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Rejected Today</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-gray-500">-8% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">AI Accuracy</CardTitle>
                <Shield className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
                <p className="text-xs text-gray-500">+2% from last week</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList>
              <TabsTrigger value="pending">Pending Review</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Pending Review</CardTitle>
                  <CardDescription>Review and moderate flagged content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <Card key={item} className="border-red-200 bg-red-50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="destructive">High Priority</Badge>
                                <Badge variant="secondary">Inappropriate Content</Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Image className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600">Image Content</span>
                              </div>
                              <p className="text-sm">
                                Content ID: #12345 | User: @username | Posted: 2 hours ago
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">AI Confidence:</span>
                                <span className="text-sm text-red-600">98%</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message User
                              </Button>
                              <Button variant="outline" size="sm">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button variant="destructive" size="sm">
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="approved" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Approved Content</CardTitle>
                  <CardDescription>Content that has been approved</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <Card key={item}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">Approved</Badge>
                                <Badge variant="secondary">Video Content</Badge>
                              </div>
                              <p className="text-sm">
                                Content ID: #12346 | User: @username | Approved: 1 hour ago
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">AI Confidence:</span>
                                <span className="text-sm text-green-600">92%</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rejected" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rejected Content</CardTitle>
                  <CardDescription>Content that has been rejected</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <Card key={item}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="destructive">Rejected</Badge>
                                <Badge variant="secondary">Text Content</Badge>
                              </div>
                              <p className="text-sm">
                                Content ID: #12347 | User: @username | Rejected: 3 hours ago
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Reason:</span>
                                <span className="text-sm text-red-600">Violates community guidelines</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
