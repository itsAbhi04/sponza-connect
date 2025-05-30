"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Plus, Trash2, Calendar, DollarSign, Users, Target, AlertCircle } from "lucide-react"
import { useState } from "react"

export default function EditCampaignPage() {
  const [deliverables, setDeliverables] = useState([
    { type: "Instagram Post", count: 2, budget: 5000 },
    { type: "Instagram Reel", count: 1, budget: 8000 },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Edit Campaign</h1>
            <p className="text-gray-600">Update your campaign details and optimize performance</p>
          </div>

          <div className="space-y-8">
            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Current metrics and AI insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Engagement Rate</div>
                    <div className="text-2xl font-bold text-green-600">4.2%</div>
                    <div className="text-xs text-green-600">+0.8% from last week</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Total Reach</div>
                    <div className="text-2xl font-bold">45.2K</div>
                    <div className="text-xs text-green-600">+12% from last week</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Content Completion</div>
                    <div className="text-2xl font-bold">60%</div>
                    <div className="text-xs text-gray-600">3 of 5 deliverables</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your campaign details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Campaign Title</Label>
                    <Input id="title" defaultValue="Summer Collection Launch" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Campaign Description</Label>
                    <Textarea
                      id="description"
                      defaultValue="Launching our new summer collection with influencer collaborations..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <Input type="date" id="startDate" defaultValue="2024-06-01" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <Input type="date" id="endDate" defaultValue="2024-08-31" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue="fashion">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="beauty">Beauty</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="food">Food & Beverage</SelectItem>
                        <SelectItem value="fitness">Fitness & Health</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deliverables */}
            <Card>
              <CardHeader>
                <CardTitle>Deliverables</CardTitle>
                <CardDescription>Update content requirements and budget</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-end gap-4 p-4 border rounded-lg">
                      <div className="flex-1 space-y-2">
                        <Label>Content Type</Label>
                        <Select defaultValue={deliverable.type}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Instagram Post">Instagram Post</SelectItem>
                            <SelectItem value="Instagram Reel">Instagram Reel</SelectItem>
                            <SelectItem value="YouTube Video">YouTube Video</SelectItem>
                            <SelectItem value="TikTok Video">TikTok Video</SelectItem>
                            <SelectItem value="Instagram Story">Instagram Story</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-24 space-y-2">
                        <Label>Count</Label>
                        <Input type="number" defaultValue={deliverable.count} />
                      </div>
                      <div className="w-32 space-y-2">
                        <Label>Budget (₹)</Label>
                        <Input type="number" defaultValue={deliverable.budget} />
                      </div>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Deliverable
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Optimization Tips */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <CardTitle>AI Optimization Tips</CardTitle>
                </div>
                <CardDescription>AI-powered recommendations to improve campaign performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-yellow-50">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-2">Performance Alert</h4>
                        <p className="text-sm text-gray-600">
                          Video content is performing 40% better than static posts. Consider increasing video content
                          allocation.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Content Optimization</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Add product links in bio for better conversion</li>
                      <li>• Include user-generated content in stories</li>
                      <li>• Use trending audio in reels</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Audience Insights</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Peak engagement: 6-8 PM</li>
                      <li>• Top performing hashtags: #summerfashion, #ootd</li>
                      <li>• Audience growth: +15% this month</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
