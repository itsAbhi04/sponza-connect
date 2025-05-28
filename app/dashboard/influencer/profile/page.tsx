"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Plus, Trash2, Loader2, Save } from "lucide-react"
import Link from "next/link"

export default function InfluencerProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({
    bio: "",
    location: "",
    niche: [] as string[],
    socialMediaStats: [
      {
        platform: "",
        followers: 0,
        engagementRate: 0,
        username: "",
      },
    ],
    pricingStructure: [
      {
        service: "",
        price: 0,
        description: "",
      },
    ],
    availabilityStatus: "available",
    portfolio: [""],
  })

  const platforms = ["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn", "Facebook"]
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
  ]

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/influencer/profile")
      const data = await response.json()

      if (response.ok) {
        setProfile(data.profile)
        setFormData({
          bio: data.profile.bio || "",
          location: data.profile.location || "",
          niche: data.profile.niche || [],
          socialMediaStats: data.profile.socialMediaStats || [
            { platform: "", followers: 0, engagementRate: 0, username: "" },
          ],
          pricingStructure: data.profile.pricingStructure || [{ service: "", price: 0, description: "" }],
          availabilityStatus: data.profile.availabilityStatus || "available",
          portfolio: data.profile.portfolio || [""],
        })
      } else if (response.status === 404) {
        // Profile doesn't exist, enable editing mode
        setIsEditing(true)
      } else {
        setError(data.error || "Failed to fetch profile")
      }
    } catch (err) {
      setError("Failed to fetch profile")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError("")

      // Validate required fields
      if (!formData.bio || !formData.location || formData.niche.length === 0) {
        setError("Please fill in all required fields")
        return
      }

      // Filter out empty entries
      const cleanedData = {
        ...formData,
        socialMediaStats: formData.socialMediaStats.filter((stat) => stat.platform && stat.username),
        pricingStructure: formData.pricingStructure.filter((pricing) => pricing.service && pricing.price > 0),
        portfolio: formData.portfolio.filter((url) => url.trim() !== ""),
      }

      const method = profile ? "PUT" : "POST"
      const response = await fetch("/api/influencer/profile", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(profile ? "Profile updated successfully!" : "Profile created successfully!")
        setProfile(data.profile)
        setIsEditing(false)
        fetchProfile() // Refresh data
      } else {
        setError(data.error || "Failed to save profile")
      }
    } catch (err) {
      setError("Failed to save profile")
    } finally {
      setSaving(false)
    }
  }

  const handleNicheChange = (niche: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        niche: [...formData.niche, niche],
      })
    } else {
      setFormData({
        ...formData,
        niche: formData.niche.filter((n) => n !== niche),
      })
    }
  }

  const addSocialMediaStat = () => {
    setFormData({
      ...formData,
      socialMediaStats: [...formData.socialMediaStats, { platform: "", followers: 0, engagementRate: 0, username: "" }],
    })
  }

  const removeSocialMediaStat = (index: number) => {
    setFormData({
      ...formData,
      socialMediaStats: formData.socialMediaStats.filter((_, i) => i !== index),
    })
  }

  const updateSocialMediaStat = (index: number, field: string, value: any) => {
    const updatedStats = formData.socialMediaStats.map((stat, i) => (i === index ? { ...stat, [field]: value } : stat))
    setFormData({
      ...formData,
      socialMediaStats: updatedStats,
    })
  }

  const addPricingStructure = () => {
    setFormData({
      ...formData,
      pricingStructure: [...formData.pricingStructure, { service: "", price: 0, description: "" }],
    })
  }

  const removePricingStructure = (index: number) => {
    setFormData({
      ...formData,
      pricingStructure: formData.pricingStructure.filter((_, i) => i !== index),
    })
  }

  const updatePricingStructure = (index: number, field: string, value: any) => {
    const updatedPricing = formData.pricingStructure.map((pricing, i) =>
      i === index ? { ...pricing, [field]: value } : pricing,
    )
    setFormData({
      ...formData,
      pricingStructure: updatedPricing,
    })
  }

  const addPortfolioItem = () => {
    setFormData({
      ...formData,
      portfolio: [...formData.portfolio, ""],
    })
  }

  const removePortfolioItem = (index: number) => {
    setFormData({
      ...formData,
      portfolio: formData.portfolio.filter((_, i) => i !== index),
    })
  }

  const updatePortfolioItem = (index: number, value: string) => {
    const updatedPortfolio = formData.portfolio.map((item, i) => (i === index ? value : item))
    setFormData({
      ...formData,
      portfolio: updatedPortfolio,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard/influencer" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-gray-600">Manage your influencer profile and showcase your work</p>
          </div>
          {profile && !isEditing && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
        </div>

        {/* Error/Success Messages */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Tell brands about yourself and your content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio *</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell brands about yourself, your content style, and what makes you unique..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  maxLength={500}
                  disabled={!isEditing}
                />
                <div className="text-sm text-gray-500">{formData.bio.length}/500 characters</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Mumbai, India"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>Content Niches *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {niches.map((niche) => (
                    <div key={niche} className="flex items-center space-x-2">
                      <Checkbox
                        id={niche}
                        checked={formData.niche.includes(niche)}
                        onCheckedChange={(checked) => handleNicheChange(niche, checked as boolean)}
                        disabled={!isEditing}
                      />
                      <Label htmlFor={niche}>{niche}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Availability Status</Label>
                <Select
                  value={formData.availabilityStatus}
                  onValueChange={(value) => setFormData({ ...formData, availabilityStatus: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Stats */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Social Media Presence</CardTitle>
                  <CardDescription>Add your social media accounts and stats</CardDescription>
                </div>
                {isEditing && (
                  <Button type="button" variant="outline" size="sm" onClick={addSocialMediaStat}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Platform
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.socialMediaStats.map((stat, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Platform {index + 1}</h4>
                      {isEditing && formData.socialMediaStats.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeSocialMediaStat(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Platform</Label>
                        <Select
                          value={stat.platform}
                          onValueChange={(value) => updateSocialMediaStat(index, "platform", value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            {platforms.map((platform) => (
                              <SelectItem key={platform} value={platform}>
                                {platform}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Username</Label>
                        <Input
                          placeholder="@username"
                          value={stat.username}
                          onChange={(e) => updateSocialMediaStat(index, "username", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Followers</Label>
                        <Input
                          type="number"
                          placeholder="10000"
                          value={stat.followers}
                          onChange={(e) =>
                            updateSocialMediaStat(index, "followers", Number.parseInt(e.target.value) || 0)
                          }
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Engagement Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="4.5"
                          value={stat.engagementRate}
                          onChange={(e) =>
                            updateSocialMediaStat(index, "engagementRate", Number.parseFloat(e.target.value) || 0)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing Structure */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pricing Structure</CardTitle>
                  <CardDescription>Set your rates for different types of content</CardDescription>
                </div>
                {isEditing && (
                  <Button type="button" variant="outline" size="sm" onClick={addPricingStructure}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.pricingStructure.map((pricing, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Service {index + 1}</h4>
                      {isEditing && formData.pricingStructure.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removePricingStructure(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Service</Label>
                        <Input
                          placeholder="e.g., Instagram Post"
                          value={pricing.service}
                          onChange={(e) => updatePricingStructure(index, "service", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Price (₹)</Label>
                        <Input
                          type="number"
                          placeholder="5000"
                          value={pricing.price}
                          onChange={(e) => updatePricingStructure(index, "price", Number.parseInt(e.target.value) || 0)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                          placeholder="Brief description"
                          value={pricing.description}
                          onChange={(e) => updatePricingStructure(index, "description", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Portfolio */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Portfolio</CardTitle>
                  <CardDescription>Showcase your best work with links to your content</CardDescription>
                </div>
                {isEditing && (
                  <Button type="button" variant="outline" size="sm" onClick={addPortfolioItem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.portfolio.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="https://instagram.com/p/..."
                      value={item}
                      onChange={(e) => updatePortfolioItem(index, e.target.value)}
                      disabled={!isEditing}
                    />
                    {isEditing && formData.portfolio.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removePortfolioItem(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false)
                  if (profile) {
                    fetchProfile() // Reset form data
                  }
                }}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
