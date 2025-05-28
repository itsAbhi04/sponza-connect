"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Sparkles,
  MessageSquare,
  Target,
  BarChart3,
  Shield,
  Bell,
  Save,
} from "lucide-react"

export default function AISettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">AI Settings</h1>
              <p className="text-gray-600">Configure AI features and preferences</p>
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="moderation">Moderation</TabsTrigger>
              <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General AI Settings</CardTitle>
                  <CardDescription>Configure basic AI functionality and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable AI Features</Label>
                        <p className="text-sm text-gray-500">Enable or disable all AI features</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>AI Model Version</Label>
                        <p className="text-sm text-gray-500">Select the AI model version to use</p>
                      </div>
                      <Select defaultValue="latest">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select version" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="latest">Latest (v3.0.0)</SelectItem>
                          <SelectItem value="stable">Stable (v2.3.1)</SelectItem>
                          <SelectItem value="beta">Beta (v3.1.0)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>AI Confidence Threshold</Label>
                      <p className="text-sm text-gray-500">Minimum confidence score for AI decisions</p>
                      <Slider defaultValue={[80]} max={100} step={1} />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>0%</span>
                        <span>80%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommendation Settings</CardTitle>
                  <CardDescription>Configure AI-powered recommendation features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Smart Recommendations</Label>
                        <p className="text-sm text-gray-500">Use AI to suggest relevant content</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>Recommendation Categories</Label>
                      <p className="text-sm text-gray-500">Select categories for AI recommendations</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label>Fashion</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label>Technology</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label>Food</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label>Travel</Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Personalization Level</Label>
                      <p className="text-sm text-gray-500">How personalized should recommendations be?</p>
                      <Select defaultValue="balanced">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="balanced">Balanced</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="moderation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Moderation Settings</CardTitle>
                  <CardDescription>Configure AI-powered content moderation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable AI Moderation</Label>
                        <p className="text-sm text-gray-500">Use AI to moderate content automatically</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>Moderation Sensitivity</Label>
                      <p className="text-sm text-gray-500">How strict should content moderation be?</p>
                      <Select defaultValue="medium">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select sensitivity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Content Types to Moderate</Label>
                      <p className="text-sm text-gray-500">Select which content types to moderate</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label>Text</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label>Images</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label>Videos</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label>Links</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chatbot" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chatbot Settings</CardTitle>
                  <CardDescription>Configure AI chatbot behavior and responses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable AI Chatbot</Label>
                        <p className="text-sm text-gray-500">Enable or disable the AI chatbot</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>Response Style</Label>
                      <p className="text-sm text-gray-500">How should the chatbot respond?</p>
                      <Select defaultValue="professional">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Response Length</Label>
                      <p className="text-sm text-gray-500">How detailed should responses be?</p>
                      <Select defaultValue="balanced">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="concise">Concise</SelectItem>
                          <SelectItem value="balanced">Balanced</SelectItem>
                          <SelectItem value="detailed">Detailed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Knowledge Base</Label>
                      <p className="text-sm text-gray-500">What topics should the chatbot know about?</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label>Platform Features</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label>Campaign Guidelines</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label>Payment Info</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label>Account Help</Label>
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