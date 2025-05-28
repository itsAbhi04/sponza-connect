"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Send,
  Paperclip,
  Image as ImageIcon,
  Sparkles,
  MessageSquare,
  Clock,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState("sarah")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Messages</h1>
              <p className="text-gray-600">Communicate with influencers and get AI support</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Chat List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search conversations..."
                      className="pl-8"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="space-y-4">
                    <TabsList className="w-full">
                      <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                      <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-2">
                      {/* Chat Item 1 */}
                      <button
                        onClick={() => setSelectedChat("sarah")}
                        className={`w-full p-4 rounded-lg flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                          selectedChat === "sarah" ? "bg-purple-50" : ""
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-200" />
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">Sarah Johnson</h3>
                            <span className="text-xs text-gray-500">2h ago</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            Looking forward to working on the summer collection!
                          </p>
                        </div>
                      </button>

                      {/* Chat Item 2 */}
                      <button
                        onClick={() => setSelectedChat("mike")}
                        className={`w-full p-4 rounded-lg flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                          selectedChat === "mike" ? "bg-purple-50" : ""
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-200" />
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">Mike Chen</h3>
                            <span className="text-xs text-gray-500">5h ago</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            I've sent the first draft of the video script
                          </p>
                        </div>
                      </button>

                      {/* AI Assistant */}
                      <button
                        onClick={() => setSelectedChat("ai")}
                        className={`w-full p-4 rounded-lg flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                          selectedChat === "ai" ? "bg-purple-50" : ""
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <Sparkles className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">AI Assistant</h3>
                            <Badge className="bg-purple-100 text-purple-700">Online</Badge>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            How can I help you today?
                          </p>
                        </div>
                      </button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200" />
                    <div>
                      <CardTitle>Sarah Johnson</CardTitle>
                      <CardDescription>Fashion Influencer • 50K Followers</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Messages */}
                    <div className="space-y-4">
                      {/* Message 1 */}
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded-lg p-4">
                            <p className="text-sm">Hi! I'm excited to work on the summer collection campaign. When would you like to start?</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">2:30 PM</span>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                      </div>

                      {/* Message 2 */}
                      <div className="flex items-start gap-4 justify-end">
                        <div className="flex-1">
                          <div className="bg-purple-600 text-white rounded-lg p-4">
                            <p className="text-sm">Hello Sarah! We're planning to start next week. I'll send you the campaign brief shortly.</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1 justify-end">
                            <span className="text-xs text-gray-500">2:32 PM</span>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-purple-200" />
                      </div>

                      {/* Message 3 */}
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded-lg p-4">
                            <p className="text-sm">Perfect! Looking forward to receiving the brief. I'll make sure to review it thoroughly.</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">2:35 PM</span>
                            <Clock className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1"
                      />
                      <Button>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 