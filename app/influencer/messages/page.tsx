"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Send, Paperclip, Image as ImageIcon, Smile } from "lucide-react"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState("brand1")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Messages</h1>
            <p className="text-gray-600">Chat with brands and manage your collaborations</p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Chat List */}
            <div className="col-span-4">
              <Card>
                <CardHeader>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search conversations..."
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {/* Chat Item 1 */}
                    <button
                      onClick={() => setSelectedChat("brand1")}
                      className={`w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                        selectedChat === "brand1" ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">FB</span>
                        </div>
                        <Badge className="absolute -top-1 -right-1 bg-green-500">2</Badge>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Fashion Brand</h3>
                          <span className="text-sm text-gray-500">2m ago</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          Looking forward to working with you on the summer collection!
                        </p>
                      </div>
                    </button>

                    {/* Chat Item 2 */}
                    <button
                      onClick={() => setSelectedChat("brand2")}
                      className={`w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                        selectedChat === "brand2" ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-semibold">TB</span>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Tech Brand</h3>
                          <span className="text-sm text-gray-500">1h ago</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          Can you send me the content calendar?
                        </p>
                      </div>
                    </button>

                    {/* Chat Item 3 */}
                    <button
                      onClick={() => setSelectedChat("brand3")}
                      className={`w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                        selectedChat === "brand3" ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-semibold">BB</span>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Beauty Brand</h3>
                          <span className="text-sm text-gray-500">2h ago</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          The product samples are on their way!
                        </p>
                      </div>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Window */}
            <div className="col-span-8">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">FB</span>
                    </div>
                    <div>
                      <CardTitle>Fashion Brand</CardTitle>
                      <p className="text-sm text-gray-500">Active now</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {/* Brand Message */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">FB</span>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Hi! Thanks for applying to our summer collection campaign. We loved your portfolio!</p>
                        <span className="text-xs text-gray-500">10:30 AM</span>
                      </div>
                    </div>

                    {/* User Message */}
                    <div className="flex items-start gap-4 justify-end">
                      <div className="bg-blue-600 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm text-white">Thank you! I'm excited to work with you on this campaign. When would you like to start?</p>
                        <span className="text-xs text-blue-200">10:32 AM</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-semibold text-sm">Me</span>
                      </div>
                    </div>

                    {/* Brand Message */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">FB</span>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">We're planning to launch in 2 weeks. I'll send you the campaign brief and requirements shortly.</p>
                        <span className="text-xs text-gray-500">10:35 AM</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon">
                      <Smile className="h-5 w-5" />
                    </Button>
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 