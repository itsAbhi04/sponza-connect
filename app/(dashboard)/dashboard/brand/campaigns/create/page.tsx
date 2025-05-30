"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Plus, Trash2, Calendar, DollarSign, Users, Target } from "lucide-react"
import { useState } from "react"

export default function CreateCampaignPage() {
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
            <h1 className="text-3xl font-bold mb-2">Create New Campaign</h1>
            <p className="text-gray-600">Set up your influencer marketing campaign</p>
          </div>

          <div className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter your campaign details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Campaign Title</Label>
                    <Input id="title" placeholder="Summer Collection Launch" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Campaign Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your campaign goals and requirements..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <Input type="date" id="startDate" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <Input type="date" id="endDate" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
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
                <CardDescription>Specify content requirements and budget</CardDescription>
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

            {/* AI Brief Suggestions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <CardTitle>AI Brief Suggestions</CardTitle>
                </div>
                <CardDescription>AI-powered recommendations for your campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Suggested Content Strategy</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Focus on video content for higher engagement</li>
                      <li>• Include behind-the-scenes content</li>
                      <li>• Use trending hashtags in your niche</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Recommended Influencer Criteria</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 50K+ followers for better reach</li>
                      <li>• 4%+ engagement rate</li>
                      <li>• Fashion and lifestyle focus</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Best Posting Times</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Instagram: 6-8 PM</li>
                      <li>• TikTok: 8-10 PM</li>
                      <li>• YouTube: 4-6 PM</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Summary</CardTitle>
                <CardDescription>Review your campaign details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      <span>Total Deliverables</span>
                    </div>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span>Total Budget</span>
                    </div>
                    <span className="font-medium">₹13,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <span>Estimated Reach</span>
                    </div>
                    <span className="font-medium">150K+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button variant="outline">Save as Draft</Button>
              <Button>Create Campaign</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
