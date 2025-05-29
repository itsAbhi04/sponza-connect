"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Star,
  Send,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react"

export default function AIFeedbackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">AI Feedback</h1>
              <p className="text-gray-600">Provide feedback on AI outputs and suggestions</p>
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

          <Tabs defaultValue="provide" className="space-y-6">
            <TabsList>
              <TabsTrigger value="provide">Provide Feedback</TabsTrigger>
              <TabsTrigger value="history">Feedback History</TabsTrigger>
              <TabsTrigger value="analytics">Feedback Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="provide" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Provide Feedback</CardTitle>
                  <CardDescription>Help us improve our AI by providing feedback</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>AI Feature</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select AI feature" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recommendations">Recommendations</SelectItem>
                          <SelectItem value="moderation">Content Moderation</SelectItem>
                          <SelectItem value="chatbot">Chatbot</SelectItem>
                          <SelectItem value="analytics">Analytics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Button key={star} variant="ghost" size="icon">
                              <Star className="h-4 w-4" />
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Feedback</Label>
                      <Textarea
                        placeholder="Describe your experience with the AI feature..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Improvement Suggestions</Label>
                      <Textarea
                        placeholder="What could be improved?"
                        className="min-h-[100px]"
                      />
                    </div>

                    <Button className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Feedback
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feedback History</CardTitle>
                  <CardDescription>View and manage submitted feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <Card key={item}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">Recommendation System</h4>
                                <Badge variant="secondary">v2.3.1</Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                The recommendations were not relevant to my interests. I received fashion
                                suggestions when I'm interested in technology.
                              </p>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-400" />
                                  <span className="text-sm">2/5</span>
                                </div>
                                <span className="text-sm text-gray-500">2 days ago</span>
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

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Analytics</CardTitle>
                  <CardDescription>Insights from user feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Overall Satisfaction</h4>
                      <div className="text-2xl font-bold">4.2/5</div>
                      <p className="text-sm text-gray-600">Based on 1,234 ratings</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Most Improved</h4>
                      <div className="text-2xl font-bold">Chatbot</div>
                      <p className="text-sm text-gray-600">+15% satisfaction</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Response Rate</h4>
                      <div className="text-2xl font-bold">92%</div>
                      <p className="text-sm text-gray-600">Of feedback addressed</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h4 className="font-medium">Top Feedback Categories</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Response Accuracy</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Response Time</span>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">User Experience</span>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
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
