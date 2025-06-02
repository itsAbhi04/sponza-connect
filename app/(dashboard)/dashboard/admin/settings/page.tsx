"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Settings, DollarSign, Shield, Bell, Mail, Smartphone } from "lucide-react"

interface PlatformSettings {
  commissionRate: number
  minimumWithdrawal: number
  autoApprovalThreshold: number
  maintenanceMode: boolean
  allowNewRegistrations: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  maxCampaignBudget: number
  minCampaignBudget: number
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<PlatformSettings>({
    commissionRate: 10,
    minimumWithdrawal: 1000,
    autoApprovalThreshold: 5000,
    maintenanceMode: false,
    allowNewRegistrations: true,
    emailNotifications: true,
    smsNotifications: false,
    maxCampaignBudget: 1000000,
    minCampaignBudget: 1000,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/platform-settings")
      if (response.ok) {
        const data = await response.json()
        setSettings(data.settings)
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error)
      toast({
        title: "Error",
        description: "Failed to fetch platform settings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    try {
      setSaving(true)
      const response = await fetch("/api/admin/platform-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Platform settings updated successfully",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.message || "Failed to update settings",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to save settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: keyof PlatformSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Platform Settings</h1>
              <p className="text-gray-600">Configure platform-wide settings and preferences</p>
            </div>
            <Button onClick={saveSettings} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <Tabs defaultValue="financial" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="platform">Platform</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="financial" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Financial Settings
                  </CardTitle>
                  <CardDescription>Configure commission rates and payment thresholds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                      <Input
                        id="commissionRate"
                        type="number"
                        min="0"
                        max="50"
                        value={settings.commissionRate}
                        onChange={(e) => updateSetting("commissionRate", Number.parseFloat(e.target.value))}
                      />
                      <p className="text-sm text-gray-500">Platform commission on successful campaigns</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="minimumWithdrawal">Minimum Withdrawal (₹)</Label>
                      <Input
                        id="minimumWithdrawal"
                        type="number"
                        min="100"
                        value={settings.minimumWithdrawal}
                        onChange={(e) => updateSetting("minimumWithdrawal", Number.parseFloat(e.target.value))}
                      />
                      <p className="text-sm text-gray-500">Minimum amount users can withdraw</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="autoApprovalThreshold">Auto-Approval Threshold (₹)</Label>
                      <Input
                        id="autoApprovalThreshold"
                        type="number"
                        min="0"
                        value={settings.autoApprovalThreshold}
                        onChange={(e) => updateSetting("autoApprovalThreshold", Number.parseFloat(e.target.value))}
                      />
                      <p className="text-sm text-gray-500">Campaigns below this amount are auto-approved</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxCampaignBudget">Maximum Campaign Budget (₹)</Label>
                      <Input
                        id="maxCampaignBudget"
                        type="number"
                        min="1000"
                        value={settings.maxCampaignBudget}
                        onChange={(e) => updateSetting("maxCampaignBudget", Number.parseFloat(e.target.value))}
                      />
                      <p className="text-sm text-gray-500">Maximum budget allowed for campaigns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="platform" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Platform Controls
                  </CardTitle>
                  <CardDescription>Manage platform availability and user access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-gray-500">Temporarily disable platform access</p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => updateSetting("maintenanceMode", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow New Registrations</Label>
                      <p className="text-sm text-gray-500">Enable new user sign-ups</p>
                    </div>
                    <Switch
                      checked={settings.allowNewRegistrations}
                      onCheckedChange={(checked) => updateSetting("allowNewRegistrations", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="minCampaignBudget">Minimum Campaign Budget (₹)</Label>
                    <Input
                      id="minCampaignBudget"
                      type="number"
                      min="100"
                      value={settings.minCampaignBudget}
                      onChange={(e) => updateSetting("minCampaignBudget", Number.parseFloat(e.target.value))}
                    />
                    <p className="text-sm text-gray-500">Minimum budget required for campaigns</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>Configure platform notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-500">Send email notifications to users</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <div>
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Send SMS notifications to users</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Configure security and compliance settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
                        <CardDescription>Require 2FA for admin accounts</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          Configure 2FA
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">API Rate Limiting</CardTitle>
                        <CardDescription>Configure API request limits</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          Manage Limits
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Data Backup</CardTitle>
                        <CardDescription>Schedule automatic backups</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          Configure Backup
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Audit Logs</CardTitle>
                        <CardDescription>View system audit logs</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          View Logs
                        </Button>
                      </CardContent>
                    </Card>
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
