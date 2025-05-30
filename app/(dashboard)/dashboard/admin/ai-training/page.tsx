"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sparkles,
  Play,
  Pause,
  RefreshCw,
  BarChart3,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
  MessageSquare,
} from "lucide-react"

export default function AITrainingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">AI Training Status</h1>
              <p className="text-gray-600">Monitor AI model training and performance</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Status
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Metrics
              </Button>
            </div>
          </div>

          {/* Model Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Recommendation Model</CardTitle>
                <Sparkles className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Version</span>
                    <span className="text-sm font-medium">v2.3.1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Accuracy</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Content Moderation</CardTitle>
                <Target className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Version</span>
                    <span className="text-sm font-medium">v1.5.2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Accuracy</span>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Chatbot Model</CardTitle>
                <MessageSquare className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge className="bg-yellow-100 text-yellow-700">Training</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Version</span>
                    <span className="text-sm font-medium">v3.0.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Training Status */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Current Training Job</CardTitle>
                  <CardDescription>Chatbot Model v3.0.0</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Training Progress</span>
                    <span className="text-sm text-gray-600">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <span className="text-sm text-gray-600">Start Time</span>
                    <p className="text-sm font-medium">2024-03-15 10:00 AM</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-gray-600">Estimated End</span>
                    <p className="text-sm font-medium">2024-03-15 02:00 PM</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-gray-600">Epochs</span>
                    <p className="text-sm font-medium">150/200</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-gray-600">Loss</span>
                    <p className="text-sm font-medium">0.0234</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="moderation">Moderation</TabsTrigger>
              <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Model Performance</CardTitle>
                  <CardDescription>Overall performance metrics across all models</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <h4 className="font-medium">Average Accuracy</h4>
                        </div>
                        <div className="text-2xl font-bold">93.5%</div>
                        <p className="text-sm text-gray-600">Across all models</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <h4 className="font-medium">Response Time</h4>
                        </div>
                        <div className="text-2xl font-bold">120ms</div>
                        <p className="text-sm text-gray-600">Average latency</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-purple-600" />
                          <h4 className="font-medium">Success Rate</h4>
                        </div>
                        <div className="text-2xl font-bold">98.2%</div>
                        <p className="text-sm text-gray-600">Request completion</p>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-4">Recent Improvements</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Reduced false positives in content moderation by 15%</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Improved recommendation accuracy by 8%</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Decreased chatbot response time by 25%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommendation Model Metrics</CardTitle>
                  <CardDescription>Performance metrics for the recommendation model</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Accuracy</h4>
                        <div className="text-2xl font-bold">92%</div>
                        <p className="text-sm text-gray-600">+5% from last version</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Precision</h4>
                        <div className="text-2xl font-bold">89%</div>
                        <p className="text-sm text-gray-600">+3% from last version</p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Category Performance</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Fashion</span>
                          <span className="text-sm font-medium">95%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-2 bg-green-600 rounded-full" style={{ width: "95%" }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Technology</span>
                          <span className="text-sm font-medium">88%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-2 bg-green-600 rounded-full" style={{ width: "88%" }}></div>
                        </div>
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
