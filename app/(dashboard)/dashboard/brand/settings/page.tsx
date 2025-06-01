"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bell, Shield, Globe, CreditCard, Save, Loader2, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface Settings {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
    applicationUpdates: boolean
    campaignUpdates: boolean
    paymentUpdates: boolean
    marketingEmails: boolean
  }
  privacy: {
    profileVisibility: "public" | "private"
    showEmail: boolean
    showPhone: boolean
  }
  preferences: {
    language: string
    timezone: string
    currency: string
    autoApproveContent: boolean
    requireNDA: boolean
  }
}

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
]

const timezones = [
  { value: "Asia/Kolkata", label: "India Standard Time (IST)" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
]

const currencies = [
  { value: "INR", label: "Indian Rupee (₹)" },
  { value: "USD", label: "US Dollar ($)" },
  { value: "EUR", label: "Euro (€)" },
  { value: "GBP", label: "British Pound (£)" },
]

export default function BrandSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      push: true,
      sms: false,
      applicationUpdates: true,
      campaignUpdates: true,
      paymentUpdates: true,
      marketingEmails: false,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
    },
    preferences: {
      language: "en",
      timezone: "Asia/Kolkata",
      currency: "INR",
      autoApproveContent: false,
      requireNDA: false,
    },
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/brand/settings")
      if (response.ok) {
        const data = await response.json()
        if (data.settings) {
          setSettings({
            notifications: data.settings.notifications || settings.notifications,
            privacy: data.settings.privacy || settings.privacy,
            preferences: data.settings.preferences || settings.preferences,
          })
        }
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await fetch("/api/brand/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        toast.success("Settings saved successfully!")
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to save settings")
      }
    } catch (error) {
      toast.error("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  const updateNotificationSetting = (key: keyof Settings["notifications"], value: boolean) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    })
  }

  const updatePrivacySetting = (key: keyof Settings["privacy"], value: any) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: value,
      },
    })
  }

  const updatePreferenceSetting = (key: keyof Settings["preferences"], value: any) => {
    setSettings({
      ...settings,
      preferences: {
        ...settings.preferences,
        [key]: value,
      },
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and privacy settings</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to be notified about important updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Communication Methods</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) => updateNotificationSetting("email", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) => updateNotificationSetting("push", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Receive important updates via SMS</p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={settings.notifications.sms}
                      onCheckedChange={(checked) => updateNotificationSetting("sms", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="application-updates">Application Updates</Label>
                      <p className="text-sm text-gray-500">New applications and status changes</p>
                    </div>
                    <Switch
                      id="application-updates"
                      checked={settings.notifications.applicationUpdates}
                      onCheckedChange={(checked) => updateNotificationSetting("applicationUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="campaign-updates">Campaign Updates</Label>
                      <p className="text-sm text-gray-500">Campaign progress and milestones</p>
                    </div>
                    <Switch
                      id="campaign-updates"
                      checked={settings.notifications.campaignUpdates}
                      onCheckedChange={(checked) => updateNotificationSetting("campaignUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="payment-updates">Payment Updates</Label>
                      <p className="text-sm text-gray-500">Payment confirmations and receipts</p>
                    </div>
                    <Switch
                      id="payment-updates"
                      checked={settings.notifications.paymentUpdates}
                      onCheckedChange={(checked) => updateNotificationSetting("paymentUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-gray-500">Product updates and promotional content</p>
                    </div>
                    <Switch
                      id="marketing-emails"
                      checked={settings.notifications.marketingEmails}
                      onCheckedChange={(checked) => updateNotificationSetting("marketingEmails", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Settings
              </CardTitle>
              <CardDescription>Control who can see your information and how it's used</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-visibility">Profile Visibility</Label>
                  <Select
                    value={settings.privacy.profileVisibility}
                    onValueChange={(value: "public" | "private") => updatePrivacySetting("profileVisibility", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Visible to all influencers</SelectItem>
                      <SelectItem value="private">Private - Only visible to approved influencers</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">Control who can see your brand profile and campaign listings</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-email">Show Email Address</Label>
                    <p className="text-sm text-gray-500">Display your email on your public profile</p>
                  </div>
                  <Switch
                    id="show-email"
                    checked={settings.privacy.showEmail}
                    onCheckedChange={(checked) => updatePrivacySetting("showEmail", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-phone">Show Phone Number</Label>
                    <p className="text-sm text-gray-500">Display your phone number on your public profile</p>
                  </div>
                  <Switch
                    id="show-phone"
                    checked={settings.privacy.showPhone}
                    onCheckedChange={(checked) => updatePrivacySetting("showPhone", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                General Preferences
              </CardTitle>
              <CardDescription>Customize your experience and workflow settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) => updatePreferenceSetting("language", value)}
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

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.preferences.timezone}
                    onValueChange={(value) => updatePreferenceSetting("timezone", value)}
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

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={settings.preferences.currency}
                    onValueChange={(value) => updatePreferenceSetting("currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Workflow Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-approve">Auto-approve Content</Label>
                      <p className="text-sm text-gray-500">Automatically approve content that meets your guidelines</p>
                    </div>
                    <Switch
                      id="auto-approve"
                      checked={settings.preferences.autoApproveContent}
                      onCheckedChange={(checked) => updatePreferenceSetting("autoApproveContent", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="require-nda">Require NDA</Label>
                      <p className="text-sm text-gray-500">Require influencers to sign an NDA before collaboration</p>
                    </div>
                    <Switch
                      id="require-nda"
                      checked={settings.preferences.requireNDA}
                      onCheckedChange={(checked) => updatePreferenceSetting("requireNDA", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing & Payments
              </CardTitle>
              <CardDescription>Manage your payment methods and billing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Your billing settings are managed through your wallet. Visit the{" "}
                  <a href="/dashboard/brand/wallet" className="font-medium underline">
                    Wallet page
                  </a>{" "}
                  to manage payment methods and view transaction history.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h4 className="font-medium">Payment Preferences</h4>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Default Payment Method</span>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">HDFC Bank •••• 4567</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Billing Address</span>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">123 Business Street, Mumbai, Maharashtra 400001</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
