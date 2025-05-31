"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Shield, MessageSquare, Globe, Target, Save, RefreshCw, Plus, X } from "lucide-react"
import { EnhancedInfluencerLayout } from "@/components/layouts/enhanced-influencer-layout"

interface Preferences {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
    campaignUpdates: boolean
    newMessages: boolean
    applicationStatus: boolean
    paymentAlerts: boolean
    marketingEmails: boolean
  }
  privacy: {
    profileVisibility: "public" | "private" | "brands-only"
    showEarnings: boolean
    showAnalytics: boolean
    allowDirectMessages: boolean
    allowCampaignInvitations: boolean
  }
  communication: {
    preferredLanguage: string
    timezone: string
    availableHours: {
      start: string
      end: string
    }
    autoReply: {
      enabled: boolean
      message: string
    }
  }
  content: {
    preferredNiches: string[]
    excludedBrands: string[]
    minimumBudget: number
    preferredCampaignTypes: string[]
  }
}

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "zh", label: "Chinese" },
]

const timezones = [
  { value: "UTC", label: "UTC" },
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "America/New_York", label: "Eastern Time" },
  { value: "America/Los_Angeles", label: "Pacific Time" },
  { value: "Europe/London", label: "London" },
  { value: "Europe/Paris", label: "Paris" },
  { value: "Asia/Tokyo", label: "Tokyo" },
  { value: "Australia/Sydney", label: "Sydney" },
]

const niches = [
  "Fashion",
  "Beauty",
  "Technology",
  "Lifestyle",
  "Food",
  "Travel",
  "Fitness",
  "Gaming",
  "Education",
  "Business",
  "Health",
  "Music",
  "Art",
  "Photography",
  "Sports",
  "Entertainment",
  "Parenting",
  "Finance",
]

const campaignTypes = [
  "Product Review",
  "Sponsored Post",
  "Brand Ambassador",
  "Event Coverage",
  "Tutorial/How-to",
  "Unboxing",
  "Giveaway",
  "Story Mention",
  "Reel/Video",
  "Live Stream",
  "Blog Post",
  "Email Marketing",
]

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState<Preferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newNiche, setNewNiche] = useState("")
  const [newBrand, setNewBrand] = useState("")

  useEffect(() => {
    fetchPreferences()
  }, [])

  const fetchPreferences = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/influencer/preferences")
      if (response.ok) {
        const data = await response.json()
        setPreferences(data.preferences)
      }
    } catch (error) {
      console.error("Failed to fetch preferences:", error)
    } finally {
      setLoading(false)
    }
  }

  const savePreferences = async () => {
    if (!preferences) return

    try {
      setSaving(true)
      const response = await fetch("/api/influencer/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      })

      if (response.ok) {
        // Show success message
        console.log("Preferences saved successfully")
      }
    } catch (error) {
      console.error("Failed to save preferences:", error)
    } finally {
      setSaving(false)
    }
  }

  const updatePreferences = (section: keyof Preferences, field: string, value: any) => {
    if (!preferences) return

    setPreferences((prev) => ({
      ...prev!,
      [section]: {
        ...prev![section],
        [field]: value,
      },
    }))
  }

  const updateNestedPreferences = (section: keyof Preferences, subsection: string, field: string, value: any) => {
    if (!preferences) return

    setPreferences((prev) => ({
      ...prev!,
      [section]: {
        ...prev![section],
        [subsection]: {
          ...(prev![section] as any)[subsection],
          [field]: value,
        },
      },
    }))
  }

  const addToArray = (section: keyof Preferences, field: string, value: string) => {
    if (!preferences || !value.trim()) return

    const currentArray = (preferences[section] as any)[field] || []
    if (!currentArray.includes(value)) {
      updatePreferences(section, field, [...currentArray, value])
    }
  }

  const removeFromArray = (section: keyof Preferences, field: string, value: string) => {
    if (!preferences) return

    const currentArray = (preferences[section] as any)[field] || []
    updatePreferences(
      section,
      field,
      currentArray.filter((item: string) => item !== value),
    )
  }

  if (loading) {
    return (
      <EnhancedInfluencerLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading preferences...</p>
          </div>
        </div>
      </EnhancedInfluencerLayout>
    )
  }

  if (!preferences) {
    return (
      <EnhancedInfluencerLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Failed to load preferences</p>
          <Button onClick={fetchPreferences} className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </EnhancedInfluencerLayout>
    )
  }

  return (
    <EnhancedInfluencerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Preferences</h1>
            <p className="text-gray-600 mt-1">Customize your account settings and preferences</p>
          </div>
          <Button onClick={savePreferences} disabled={saving}>
            {saving ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <CardTitle>Notification Preferences</CardTitle>
                </div>
                <CardDescription>Choose how you want to be notified about important updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Delivery Methods</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={preferences.notifications.email}
                          onCheckedChange={(checked) => updatePreferences("notifications", "email", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-gray-500">Browser and mobile push notifications</p>
                        </div>
                        <Switch
                          checked={preferences.notifications.push}
                          onCheckedChange={(checked) => updatePreferences("notifications", "push", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-gray-500">Important updates via SMS</p>
                        </div>
                        <Switch
                          checked={preferences.notifications.sms}
                          onCheckedChange={(checked) => updatePreferences("notifications", "sms", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Notification Types</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Campaign Updates</Label>
                          <p className="text-sm text-gray-500">Status changes and deadlines</p>
                        </div>
                        <Switch
                          checked={preferences.notifications.campaignUpdates}
                          onCheckedChange={(checked) => updatePreferences("notifications", "campaignUpdates", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>New Messages</Label>
                          <p className="text-sm text-gray-500">When you receive new messages</p>
                        </div>
                        <Switch
                          checked={preferences.notifications.newMessages}
                          onCheckedChange={(checked) => updatePreferences("notifications", "newMessages", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Application Status</Label>
                          <p className="text-sm text-gray-500">Updates on your applications</p>
                        </div>
                        <Switch
                          checked={preferences.notifications.applicationStatus}
                          onCheckedChange={(checked) =>
                            updatePreferences("notifications", "applicationStatus", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Payment Alerts</Label>
                          <p className="text-sm text-gray-500">Payment confirmations and issues</p>
                        </div>
                        <Switch
                          checked={preferences.notifications.paymentAlerts}
                          onCheckedChange={(checked) => updatePreferences("notifications", "paymentAlerts", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Marketing Emails</Label>
                          <p className="text-sm text-gray-500">Platform updates and promotions</p>
                        </div>
                        <Switch
                          checked={preferences.notifications.marketingEmails}
                          onCheckedChange={(checked) => updatePreferences("notifications", "marketingEmails", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <CardTitle>Privacy Settings</CardTitle>
                </div>
                <CardDescription>Control who can see your information and contact you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Profile Visibility</Label>
                      <p className="text-sm text-gray-500">Who can view your profile</p>
                    </div>
                    <Select
                      value={preferences.privacy.profileVisibility}
                      onValueChange={(value) => updatePreferences("privacy", "profileVisibility", value)}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="brands-only">Brands Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Earnings</Label>
                      <p className="text-sm text-gray-500">Display earnings information on profile</p>
                    </div>
                    <Switch
                      checked={preferences.privacy.showEarnings}
                      onCheckedChange={(checked) => updatePreferences("privacy", "showEarnings", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Analytics</Label>
                      <p className="text-sm text-gray-500">Display performance metrics on profile</p>
                    </div>
                    <Switch
                      checked={preferences.privacy.showAnalytics}
                      onCheckedChange={(checked) => updatePreferences("privacy", "showAnalytics", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Direct Messages</Label>
                      <p className="text-sm text-gray-500">Let brands message you directly</p>
                    </div>
                    <Switch
                      checked={preferences.privacy.allowDirectMessages}
                      onCheckedChange={(checked) => updatePreferences("privacy", "allowDirectMessages", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Campaign Invitations</Label>
                      <p className="text-sm text-gray-500">Receive direct campaign invitations</p>
                    </div>
                    <Switch
                      checked={preferences.privacy.allowCampaignInvitations}
                      onCheckedChange={(checked) => updatePreferences("privacy", "allowCampaignInvitations", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <CardTitle>Communication Preferences</CardTitle>
                </div>
                <CardDescription>Set your language, timezone, and availability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Preferred Language</Label>
                      <Select
                        value={preferences.communication.preferredLanguage}
                        onValueChange={(value) => updatePreferences("communication", "preferredLanguage", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Timezone</Label>
                      <Select
                        value={preferences.communication.timezone}
                        onValueChange={(value) => updatePreferences("communication", "timezone", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Available Hours</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="time"
                          value={preferences.communication.availableHours.start}
                          onChange={(e) =>
                            updateNestedPreferences("communication", "availableHours", "start", e.target.value)
                          }
                        />
                        <span className="text-gray-500">to</span>
                        <Input
                          type="time"
                          value={preferences.communication.availableHours.end}
                          onChange={(e) =>
                            updateNestedPreferences("communication", "availableHours", "end", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Auto-Reply</Label>
                        <Switch
                          checked={preferences.communication.autoReply.enabled}
                          onCheckedChange={(checked) =>
                            updateNestedPreferences("communication", "autoReply", "enabled", checked)
                          }
                        />
                      </div>
                      {preferences.communication.autoReply.enabled && (
                        <Textarea
                          placeholder="Enter your auto-reply message..."
                          value={preferences.communication.autoReply.message}
                          onChange={(e) =>
                            updateNestedPreferences("communication", "autoReply", "message", e.target.value)
                          }
                          rows={3}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <CardTitle>Content Preferences</CardTitle>
                </div>
                <CardDescription>Set your content preferences and campaign filters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Preferred Niches</Label>
                    <p className="text-sm text-gray-500 mb-2">Select the niches you're interested in</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {preferences.content.preferredNiches.map((niche) => (
                        <Badge key={niche} variant="secondary" className="flex items-center gap-1">
                          {niche}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeFromArray("content", "preferredNiches", niche)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Select value={newNiche} onValueChange={setNewNiche}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select a niche" />
                        </SelectTrigger>
                        <SelectContent>
                          {niches
                            .filter((niche) => !preferences.content.preferredNiches.includes(niche))
                            .map((niche) => (
                              <SelectItem key={niche} value={niche}>
                                {niche}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={() => {
                          if (newNiche) {
                            addToArray("content", "preferredNiches", newNiche)
                            setNewNiche("")
                          }
                        }}
                        disabled={!newNiche}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Preferred Campaign Types</Label>
                    <p className="text-sm text-gray-500 mb-2">Types of campaigns you prefer</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {preferences.content.preferredCampaignTypes.map((type) => (
                        <Badge key={type} variant="secondary" className="flex items-center gap-1">
                          {type}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeFromArray("content", "preferredCampaignTypes", type)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <Select
                      onValueChange={(value) => {
                        addToArray("content", "preferredCampaignTypes", value)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Add campaign type" />
                      </SelectTrigger>
                      <SelectContent>
                        {campaignTypes
                          .filter((type) => !preferences.content.preferredCampaignTypes.includes(type))
                          .map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Minimum Budget (₹)</Label>
                    <p className="text-sm text-gray-500 mb-2">Only show campaigns above this budget</p>
                    <Input
                      type="number"
                      min="0"
                      value={preferences.content.minimumBudget}
                      onChange={(e) =>
                        updatePreferences("content", "minimumBudget", Number.parseInt(e.target.value) || 0)
                      }
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label>Excluded Brands</Label>
                    <p className="text-sm text-gray-500 mb-2">Brands you don't want to work with</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {preferences.content.excludedBrands.map((brand) => (
                        <Badge key={brand} variant="destructive" className="flex items-center gap-1">
                          {brand}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeFromArray("content", "excludedBrands", brand)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter brand name"
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && newBrand.trim()) {
                            addToArray("content", "excludedBrands", newBrand.trim())
                            setNewBrand("")
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          if (newBrand.trim()) {
                            addToArray("content", "excludedBrands", newBrand.trim())
                            setNewBrand("")
                          }
                        }}
                        disabled={!newBrand.trim()}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <CardTitle>Advanced Settings</CardTitle>
                </div>
                <CardDescription>Advanced configuration options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Data Export</h4>
                    <p className="text-sm text-yellow-700 mb-3">
                      Download all your data including campaigns, earnings, and analytics
                    </p>
                    <Button variant="outline">Export My Data</Button>
                  </div>

                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">Account Deletion</h4>
                    <p className="text-sm text-red-700 mb-3">Permanently delete your account and all associated data</p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EnhancedInfluencerLayout>
  )
}
