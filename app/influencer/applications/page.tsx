"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function MyApplicationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">My Applications</h1>
            <p className="text-gray-600">Track the status of your campaign applications</p>
          </div>

          {/* Applications Tabs */}
          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            {/* All Applications */}
            <TabsContent value="all" className="space-y-6">
              {/* Application 1 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Summer Fashion Collection</CardTitle>
                      <CardDescription>Fashion Brand • Instagram Reels</CardDescription>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700">Under Review</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Applied 2 days ago</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>No feedback yet</span>
                      </div>
                    </div>
                    <Button variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Application 2 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Tech Product Review</CardTitle>
                      <CardDescription>Tech Company • YouTube</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Accepted</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Accepted 1 day ago</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>Brand loved your portfolio!</span>
                      </div>
                    </div>
                    <Button>Start Campaign</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Application 3 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Beauty Product Launch</CardTitle>
                      <CardDescription>Beauty Brand • Instagram Posts</CardDescription>
                    </div>
                    <Badge className="bg-red-100 text-red-700">Rejected</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Rejected 3 days ago</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>Looking for different style</span>
                      </div>
                    </div>
                    <Button variant="outline">View Feedback</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pending Applications */}
            <TabsContent value="pending" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Summer Fashion Collection</CardTitle>
                      <CardDescription>Fashion Brand • Instagram Reels</CardDescription>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700">Under Review</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Applied 2 days ago</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>No feedback yet</span>
                      </div>
                    </div>
                    <Button variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Accepted Applications */}
            <TabsContent value="accepted" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Tech Product Review</CardTitle>
                      <CardDescription>Tech Company • YouTube</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Accepted</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Accepted 1 day ago</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>Brand loved your portfolio!</span>
                      </div>
                    </div>
                    <Button>Start Campaign</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rejected Applications */}
            <TabsContent value="rejected" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Beauty Product Launch</CardTitle>
                      <CardDescription>Beauty Brand • Instagram Posts</CardDescription>
                    </div>
                    <Badge className="bg-red-100 text-red-700">Rejected</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Rejected 3 days ago</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>Looking for different style</span>
                      </div>
                    </div>
                    <Button variant="outline">View Feedback</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Completed Applications */}
            <TabsContent value="completed" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Fitness Challenge</CardTitle>
                      <CardDescription>Fitness Brand • Instagram Stories</CardDescription>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">Completed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Completed 1 week ago</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>Great work! Would love to work again</span>
                      </div>
                    </div>
                    <Button variant="outline">View Details</Button>
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