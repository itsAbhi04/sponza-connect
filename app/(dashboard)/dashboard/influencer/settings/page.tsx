"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  User,
  Shield,
  Save,
  Upload,
  Check,
  X,
  Mail,
  Lock,
  CreditCard,
  Bell,
  Trash2,
  Download,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react"
import { EnhancedInfluencerLayout } from "@/components/layouts/enhanced-influencer-layout"

interface UserData {
  _id: string
  name: string
  email: string
  phone?: string
  profilePicture?: string
  role: string
  createdAt: string
}

interface ProfileData {
  bio?: string
  location?: string
  website?: string
  billingInfo?: {
    taxId?: string
    businessName?: string
    billingAddress?: {
      street?: string
      city?: string
      state?: string
      zipCode?: string
      country?: string
    }
  }
}

interface Settings {
  twoFactorEnabled: boolean
  emailVerified: boolean
  phoneVerified: boolean
}

export default function SettingsPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/influencer/settings")
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setProfile(data.profile || {})
        setSettings(data.settings)
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async (section: string, data: any) => {
    try {
      setSaving(true)
      const response = await fetch("/api/influencer/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [section]: data }),
      })

      if (response.ok) {
        setMessage({ type: "success", text: "Settings saved successfully!" })
        if (section === "profile") {
          setUser((prev) => ({ ...prev!, ...data }))
        }
      } else {
        const errorData = await response.json()
        setMessage({ type: "error", text: errorData.error || "Failed to save settings" })
      }
    } catch (error) {
      console.error("Failed to save settings:", error)
      setMessage({ type: "error", text: "Failed to save settings" })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      setMessage({ type: "error", text: "New passwords don't match" })
      return
    }

    if (passwords.new.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters long" })
      return
    }

    await saveSettings("security", {
      currentPassword: passwords.current,
      newPassword: passwords.new,
    })

    setPasswords({ current: "", new: "", confirm: "" })
  }

  const toggleTwoFactor = async (enabled: boolean) => {
    await saveSettings("security", { twoFactorEnabled: enabled })
    setSettings((prev) => ({ ...prev!, twoFactorEnabled: enabled }))
  }

  const sendVerificationEmail = async () => {
    try {
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
      })
      if (response.ok) {
        setMessage({ type: "success", text: "Verification email sent!" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to send verification email" })
    }
  }

  if (loading) {
    return (
      <EnhancedInfluencerLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading settings...</p>
          </div>
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
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account preferences and security</p>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <Alert className={message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            <AlertDescription className={message.type === "success" ? "text-green-700" : "text-red-700"}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <CardTitle>Profile Information</CardTitle>
                </div>
                <CardDescription>Update your personal information and profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.profilePicture || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={user?.name || ""}
                      onChange={(e) => setUser((prev) => ({ ...prev!, name: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="email"
                        type="email"
                        value={user?.email || ""}
                        onChange={(e) => setUser((prev) => ({ ...prev!, email: e.target.value }))}
                      />
                      {settings?.emailVerified ? (
                        <Badge className="bg-green-100 text-green-700">
                          <Check className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <Badge variant="destructive">
                            <X className="h-3 w-3 mr-1" />
                            Unverified
                          </Badge>
                          <Button size="sm" variant="outline" onClick={sendVerificationEmail}>
                            Verify
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="phone"
                        value={user?.phone || ""}
                        onChange={(e) => setUser((prev) => ({ ...prev!, phone: e.target.value }))}
                      />
                      {settings?.phoneVerified ? (
                        <Badge className="bg-green-100 text-green-700">
                          <Check className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <X className="h-3 w-3 mr-1" />
                          Unverified
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile?.location || ""}
                      onChange={(e) => setProfile((prev) => ({ ...prev!, location: e.target.value }))}
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={profile?.website || ""}
                      onChange={(e) => setProfile((prev) => ({ ...prev!, website: e.target.value }))}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile?.bio || ""}
                      onChange={(e) => setProfile((prev) => ({ ...prev!, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>
                </div>

                <Button
                  onClick={() =>
                    saveSettings("profile", {
                      name: user?.name,
                      email: user?.email,
                      phone: user?.phone,
                      ...profile,
                    })
                  }
                  disabled={saving}
                >
                  {saving ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <CardTitle>Security Settings</CardTitle>
                </div>
                <CardDescription>Manage your account security and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Lock className="h-5 w-5 text-gray-600" />
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <Switch checked={settings?.twoFactorEnabled || false} onCheckedChange={toggleTwoFactor} />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-600" />
                      <div>
                        <h4 className="font-medium">Email Verification</h4>
                        <p className="text-sm text-gray-500">Verify your email address for account security</p>
                      </div>
                    </div>
                    {settings?.emailVerified ? (
                      <Badge className="bg-green-100 text-green-700">Verified</Badge>
                    ) : (
                      <Button size="sm" onClick={sendVerificationEmail}>
                        Send Verification
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Change Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          value={passwords.current}
                          onChange={(e) => setPasswords((prev) => ({ ...prev, current: e.target.value }))}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={passwords.new}
                        onChange={(e) => setPasswords((prev) => ({ ...prev, new: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) => setPasswords((prev) => ({ ...prev, confirm: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handlePasswordChange}
                    disabled={!passwords.current || !passwords.new || !passwords.confirm || saving}
                  >
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <CardTitle>Billing Information</CardTitle>
                </div>
                <CardDescription>Manage your billing details and tax information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name (Optional)</Label>
                    <Input
                      id="business-name"
                      value={profile?.billingInfo?.businessName || ""}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev!,
                          billingInfo: {
                            ...prev?.billingInfo,
                            businessName: e.target.value,
                          },
                        }))
                      }
                      placeholder="Your business name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Tax ID / PAN (Optional)</Label>
                    <Input
                      id="tax-id"
                      value={profile?.billingInfo?.taxId || ""}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev!,
                          billingInfo: {
                            ...prev?.billingInfo,
                            taxId: e.target.value,
                          },
                        }))
                      }
                      placeholder="Your tax identification number"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Billing Address</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        value={profile?.billingInfo?.billingAddress?.street || ""}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev!,
                            billingInfo: {
                              ...prev?.billingInfo,
                              billingAddress: {
                                ...prev?.billingInfo?.billingAddress,
                                street: e.target.value,
                              },
                            },
                          }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profile?.billingInfo?.billingAddress?.city || ""}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev!,
                            billingInfo: {
                              ...prev?.billingInfo,
                              billingAddress: {
                                ...prev?.billingInfo?.billingAddress,
                                city: e.target.value,
                              },
                            },
                          }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={profile?.billingInfo?.billingAddress?.state || ""}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev!,
                            billingInfo: {
                              ...prev?.billingInfo,
                              billingAddress: {
                                ...prev?.billingInfo?.billingAddress,
                                state: e.target.value,
                              },
                            },
                          }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={profile?.billingInfo?.billingAddress?.zipCode || ""}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev!,
                            billingInfo: {
                              ...prev?.billingInfo,
                              billingAddress: {
                                ...prev?.billingInfo?.billingAddress,
                                zipCode: e.target.value,
                              },
                            },
                          }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={profile?.billingInfo?.billingAddress?.country || ""}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev!,
                            billingInfo: {
                              ...prev?.billingInfo,
                              billingAddress: {
                                ...prev?.billingInfo?.billingAddress,
                                country: e.target.value,
                              },
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={() => saveSettings("billing", profile?.billingInfo)} disabled={saving}>
                  {saving ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Billing Info
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <CardTitle>Notification Settings</CardTitle>
                </div>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-gray-500">Browser push notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-gray-500">Important updates via SMS</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Marketing Emails</h4>
                      <p className="text-sm text-gray-500">Platform updates and promotions</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data & Privacy</CardTitle>
                <CardDescription>Manage your data and account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Download Your Data</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Download a copy of all your data including campaigns, earnings, and analytics
                    </p>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Request Data Export
                    </Button>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Account Deactivation</h4>
                    <p className="text-sm text-yellow-700 mb-3">
                      Temporarily deactivate your account. You can reactivate it anytime.
                    </p>
                    <Button variant="outline">Deactivate Account</Button>
                  </div>

                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                    <p className="text-sm text-red-700 mb-3">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
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
