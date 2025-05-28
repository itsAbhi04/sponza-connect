"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Search,
  Filter,
  Users,
  Star,
  MessageSquare,
  Sparkles,
  Instagram,
  Youtube,
  Globe,
  ArrowUpRight,
} from "lucide-react"

export default function DiscoverInfluencersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Discover Influencers</h1>
              <p className="text-gray-600">Find the perfect influencers for your campaigns</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Search influencers..."
                    className="pl-8"
                  />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="all">All Platforms</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Followers Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10k-50k">10K - 50K</SelectItem>
                    <SelectItem value="50k-100k">50K - 100K</SelectItem>
                    <SelectItem value="100k-500k">100K - 500K</SelectItem>
                    <SelectItem value="500k+">500K+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <CardTitle>AI Recommendations</CardTitle>
              </div>
              <CardDescription>Top influencers matching your brand profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Recommended Influencer 1 */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200" />
                        <div>
                          <h3 className="font-medium">Sarah Johnson</h3>
                          <p className="text-sm text-gray-600">Fashion & Lifestyle</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Instagram className="h-4 w-4" />
                          <span>50K</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>4.9</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="h-4 w-4 text-green-600" />
                          <span>4.8%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" className="flex-1">View Profile</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommended Influencer 2 */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200" />
                        <div>
                          <h3 className="font-medium">Mike Chen</h3>
                          <p className="text-sm text-gray-600">Tech & Gadgets</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Youtube className="h-4 w-4" />
                          <span>100K</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>4.7</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="h-4 w-4 text-green-600" />
                          <span>5.2%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" className="flex-1">View Profile</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommended Influencer 3 */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200" />
                        <div>
                          <h3 className="font-medium">Emma Wilson</h3>
                          <p className="text-sm text-gray-600">Beauty & Fashion</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          <span>75K</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>4.8</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="h-4 w-4 text-green-600" />
                          <span>4.5%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" className="flex-1">View Profile</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* All Influencers */}
          <Card>
            <CardHeader>
              <CardTitle>All Influencers</CardTitle>
              <CardDescription>Browse through our verified influencer network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Influencer cards similar to recommendations */}
                {/* Add more influencer cards here */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 