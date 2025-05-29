"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Settings,
  DollarSign,
  Gift,
  Bell,
  Sparkles,
  Save,
  Shield,
  Users,
  Target,
  MessageSquare,
} from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Platform Settings</h1>
              <p className="text-gray-600">Configure platform parameters and preferences</p>
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>

          {/* Settings Tabs */}
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="fees">Fees & Payments</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="ai">AI Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <CardTitle>Platform Security</CardTitle>
                  </div>
                  <CardDescription>Configure security and verification settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Verification</Label>
                        <p className="text-sm text-gray-500">Require email verification for new users</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Content Moderation</Label>
                        <p className="text-sm text-gray-500">Enable AI-powered content moderation</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <CardTitle>User Management</CardTitle>
                  </div>
                  <CardDescription>Configure user-related settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Minimum Age Requirement</Label>
                        <Input type="number" defaultValue="18" />
                      </div>
                      <div className="space-y-2">
                        <Label>Maximum Login Attempts</Label>
                        <Input type="number" defaultValue="5" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Restricted Domains</Label>
                      <Textarea
                        placeholder="Enter restricted email domains (one per line)"
                        defaultValue="example.com&#10;test.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fees" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <CardTitle>Platform Fees</CardTitle>
                  </div>
                  <CardDescription>Configure platform fee structure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Platform Fee (%)</Label>
                        <Input type="number" defaultValue="10" />
                      </div>
                      <div className="space-y-2">
                        <Label>Minimum Campaign Budget</Label>
                        <Input type="number" defaultValue="10000" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Processing Fee (%)</Label>
                      <Input type="number" defaultValue="2.5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-orange-600" />
                    <CardTitle>Reward Program</CardTitle>
                  </div>
                  <CardDescription>Configure referral and reward settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Referral Bonus (%)</Label>
                        <Input type="number" defaultValue="5" />
                      </div>
                      <div className="space-y-2">
                        <Label>Minimum Payout</Label>
                        <Input type="number" defaultValue="1000" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Reward Tiers</Label>
                      <Textarea
                        placeholder="Enter reward tiers (one per line)"
                        defaultValue="Bronze: 5 referrals - 5% bonus&#10;Silver: 20 referrals - 7% bonus&#10;Gold: 50 referrals - 10% bonus"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-red-600" />
                    <CardTitle>Notification Templates</CardTitle>
                  </div>
                  <CardDescription>Configure email and in-app notification templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Welcome Email</Label>
                      <Textarea
                        placeholder="Enter welcome email template"
                        defaultValue="Welcome to Sponza! We're excited to have you join our community of creators and brands."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Campaign Approval</Label>
                      <Textarea
                        placeholder="Enter campaign approval template"
                        defaultValue="Your campaign has been approved! Start connecting with influencers now."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Payment Confirmation</Label>
                      <Textarea
                        placeholder="Enter payment confirmation template"
                        defaultValue="Payment of {amount} has been processed successfully."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <CardTitle>AI Configuration</CardTitle>
                  </div>
                  <CardDescription>Configure AI model settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>AI Recommendations</Label>
                        <p className="text-sm text-gray-500">Enable AI-powered campaign recommendations</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Content Moderation</Label>
                        <p className="text-sm text-gray-500">Use AI for content moderation</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Chatbot Support</Label>
                        <p className="text-sm text-gray-500">Enable AI chatbot for user support</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>AI Confidence Threshold</Label>
                      <Input type="number" defaultValue="85" />
                      <p className="text-sm text-gray-500">Minimum confidence score for AI decisions</p>
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
