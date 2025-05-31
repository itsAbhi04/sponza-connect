"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Search, Send, Paperclip, ImageIcon, Smile, MoreVertical, Phone, Video, Info } from "lucide-react"
import { EnhancedInfluencerLayout } from "@/components/layouts/enhanced-influencer-layout"
import { formatDistanceToNow } from "date-fns"

interface Chat {
  _id: string
  participants: Array<{
    _id: string
    name: string
    email: string
    profilePicture?: string
    role: string
  }>
  lastMessage?: {
    content: string
    createdAt: string
    senderId: string
  }
  unreadCount: number
  updatedAt: string
}

interface Message {
  _id: string
  content: string
  senderId: {
    _id: string
    name: string
    profilePicture?: string
  }
  messageType: string
  attachments?: Array<{
    url: string
    type: string
    name: string
  }>
  isRead: boolean
  createdAt: string
  replyTo?: {
    content: string
    senderId: string
  }
}

export default function MessagesPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchChats()
  }, [])

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat._id)
    }
  }, [selectedChat])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchChats = async () => {
    try {
      const response = await fetch("/api/influencer/messages")
      if (response.ok) {
        const data = await response.json()
        setChats(data.chats)
        if (data.chats.length > 0 && !selectedChat) {
          setSelectedChat(data.chats[0])
        }
      }
    } catch (error) {
      console.error("Failed to fetch chats:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (chatId: string) => {
    try {
      const response = await fetch(`/api/influencer/messages/${chatId}`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages)
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || sending) return

    try {
      setSending(true)
      const otherParticipant = selectedChat.participants.find((p) => p.role !== "influencer")

      const response = await fetch("/api/influencer/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverId: otherParticipant?._id,
          content: newMessage,
          messageType: "text",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages((prev) => [...prev, data.message])
        setNewMessage("")
        fetchChats() // Refresh chat list to update last message
      }
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setSending(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const filteredChats = chats.filter((chat) =>
    chat.participants.some(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

  const getOtherParticipant = (chat: Chat) => {
    return chat.participants.find((p) => p.role !== "influencer")
  }

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }
  }

  if (loading) {
    return (
      <EnhancedInfluencerLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading messages...</p>
          </div>
        </div>
      </EnhancedInfluencerLayout>
    )
  }

  return (
    <EnhancedInfluencerLayout>
      <div className="h-[calc(100vh-8rem)] flex bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Chat List - Hidden on mobile when chat is selected */}
        <div
          className={`w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 flex flex-col ${selectedChat ? "hidden md:flex" : "flex"}`}
        >
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredChats.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No conversations found</div>
            ) : (
              filteredChats.map((chat) => {
                const otherParticipant = getOtherParticipant(chat)
                return (
                  <button
                    key={chat._id}
                    onClick={() => setSelectedChat(chat)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                      selectedChat?._id === chat._id ? "bg-green-50 border-l-4 border-l-green-500" : ""
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={otherParticipant?.profilePicture || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                          {otherParticipant?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      {chat.unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                          {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm truncate">{otherParticipant?.name || "Unknown User"}</h3>
                        <span className="text-xs text-gray-500">
                          {chat.lastMessage &&
                            formatDistanceToNow(new Date(chat.lastMessage.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage?.content || "No messages yet"}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {otherParticipant?.role === "brand" ? "Brand" : "User"}
                      </Badge>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className={`flex-1 flex flex-col ${selectedChat ? "flex" : "hidden md:flex"}`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSelectedChat(null)}>
                      ←
                    </Button>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={getOtherParticipant(selectedChat)?.profilePicture || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                        {getOtherParticipant(selectedChat)?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{getOtherParticipant(selectedChat)?.name}</h3>
                      <p className="text-sm text-gray-500">
                        {getOtherParticipant(selectedChat)?.role === "brand" ? "Brand Account" : "User"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => {
                  const isOwn = message.senderId._id !== getOtherParticipant(selectedChat)?._id
                  return (
                    <div key={message._id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                      <div className={`flex items-start gap-2 max-w-[70%] ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.senderId.profilePicture || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs">
                            {message.senderId.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`rounded-lg p-3 ${
                            isOwn ? "bg-green-500 text-white" : "bg-white border border-gray-200"
                          }`}
                        >
                          {message.replyTo && (
                            <div className={`text-xs mb-2 p-2 rounded ${isOwn ? "bg-green-600" : "bg-gray-100"}`}>
                              Replying to: {message.replyTo.content}
                            </div>
                          )}
                          <p className="text-sm">{message.content}</p>
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {message.attachments.map((attachment, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs">
                                  <Paperclip className="h-3 w-3" />
                                  <span>{attachment.name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className={`text-xs mt-1 ${isOwn ? "text-green-100" : "text-gray-500"}`}>
                            {formatMessageTime(message.createdAt)}
                            {isOwn && message.isRead && <span className="ml-1">✓✓</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          sendMessage()
                        }
                      }}
                      className="min-h-[40px] max-h-[120px] resize-none"
                      rows={1}
                    />
                  </div>
                  <Button variant="ghost" size="icon">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || sending}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </EnhancedInfluencerLayout>
  )
}
