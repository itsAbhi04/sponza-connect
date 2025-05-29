"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  TrendingUp,
  Share2,
  Copy,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { useState } from "react"

export default function InvitePage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Invite & Affiliate Program</h1>
              <p className="text-gray-600">Grow your network and track affiliate performance</p>
            </div>
            <Button className="mt-4 md:mt-0">
              <Share2 className="h-4 w-4 mr-2" />
              Share Program
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +15%
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">156</h3>
                <p className="text-sm text-gray-600">Total Referrals</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +8%
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">45</h3>
                <p className="text-sm text-gray-600">Active Affiliates</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +20%
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">₹2,50,000</h3>
                <p className="text-sm text-gray-600">Total Earnings</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    -5%
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">12</h3>
                <p className="text-sm text-gray-600">Pending Approvals</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Invite Section */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Invite Friends</CardTitle>
                  <CardDescription>Share your referral link and earn rewards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Referral Link</label>
                    <div className="flex gap-2">
                      <Input
                        value="https://sponza.com/ref/brand123"
                        readOnly
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">How it works</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-purple-600">1</span>
                        </div>
                        <p className="text-sm">Share your referral link with other brands</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-purple-600">2</span>
                        </div>
                        <p className="text-sm">They sign up and complete their profile</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-purple-600">3</span>
                        </div>
                        <p className="text-sm">Earn rewards for each successful referral</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Program
                  </Button>
                </CardContent>
              </Card>

              {/* Rewards Program */}
              <Card>
                <CardHeader>
                  <CardTitle>Rewards Program</CardTitle>
                  <CardDescription>Earn more with our tiered rewards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Bronze Tier</h4>
                        <p className="text-sm text-gray-600">5-10 referrals</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700">5% Commission</Badge>
                    </div>
                    <Progress value={60} className="h-2" />
                    <p className="text-sm text-gray-600">6/10 referrals completed</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Silver Tier</h4>
                        <p className="text-sm text-gray-600">11-25 referrals</p>
                      </div>
                      <Badge className="bg-gray-100 text-gray-700">7.5% Commission</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                    <p className="text-sm text-gray-600">0/25 referrals completed</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Gold Tier</h4>
                        <p className="text-sm text-gray-600">26+ referrals</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700">10% Commission</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                    <p className="text-sm text-gray-600">0/26 referrals completed</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Referral History */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Referral History</CardTitle>
                  <CardDescription>Track your referrals and earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Referral 1 */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Fashion Brand Co.</h4>
                          <p className="text-sm text-gray-600">Referred on Mar 15, 2024</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">+₹5,000</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Completed</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                    </div>

                    {/* Referral 2 */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Tech Startup Inc.</h4>
                          <p className="text-sm text-gray-600">Referred on Mar 18, 2024</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-orange-600">₹3,000</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Pending</span>
                          <Clock className="h-4 w-4 text-orange-600" />
                        </div>
                      </div>
                    </div>

                    {/* Referral 3 */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <AlertCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Beauty Brand Ltd.</h4>
                          <p className="text-sm text-gray-600">Referred on Mar 20, 2024</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-600">₹2,500</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Failed</span>
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        </div>
                      </div>
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
