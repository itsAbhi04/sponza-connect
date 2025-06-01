"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Upload, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface BrandProfile {
  companyName: string
  website: string
  industry: string
  description: string
  contactInfo: {
    phone: string
    address: string
    contactEmail: string
  }
  socialMedia: {
    instagram?: string
    twitter?: string
    linkedin?: string
    facebook?: string
  }
  brandValues: string[]
  targetAudience: string
  campaignPreferences: {
    preferredPlatforms: string[]
    budgetRange: {
      min: number
      max: number
    }
    campaignTypes: string[]
  }
}

const industries = [
  "Fashion",
  "Beauty",
  "Technology",
  "Lifestyle",
  "Food & Beverage",
  "Travel",
  "Fitness",
  "Gaming",
  "Education",
  "Finance",
  "Healthcare",
  "Automotive",
  "Real Estate",
  "Entertainment",
  "Other",
]

const platforms = ["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn", "Facebook"]
const campaignTypes = ["Product Launch", "Brand Awareness", "Event Promotion", "Content Creation", "Reviews"]

export default function BrandProfilePage() {
  const [profile, setProfile] = useState<BrandProfile>({
    companyName: "",
    website: "",
    industry: "",
    description: "",
    contactInfo: {
      phone: "",
      address: "",
      contactEmail: "",
    },
    socialMedia: {},
    brandValues: [],
    targetAudience: "",
    campaignPreferences: {
      preferredPlatforms: [],
      budgetRange: { min: 0, max: 0 },
      campaignTypes: [],
    },
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newBrandValue, setNewBrandValue] = useState("")

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/brand/profile")
      if (response.ok) {
        const data = await response.json()
        if (data.profile) {
          setProfile(data.profile)
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await fetch("/api/brand/profile", {
        method: profile.companyName ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      })

      if (response.ok) {
        toast.success("Profile saved successfully!")
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to save profile")
      }
    } catch (error) {
      toast.error("Failed to save profile")
    } finally {
      setSaving(false)
    }
  }

  const addBrandValue = () => {
    if (newBrandValue.trim() && !profile.brandValues.includes(newBrandValue.trim())) {
      setProfile({
        ...profile,
        brandValues: [...profile.brandValues, newBrandValue.trim()],
      })
      setNewBrandValue("")
    }
  }

  const removeBrandValue = (value: string) => {
    setProfile({
      ...profile,
      brandValues: profile.brandValues.filter((v) => v !== value),
    })
  }

  const togglePlatform = (platform: string) => {
    const platforms = profile.campaignPreferences.preferredPlatforms
    if (platforms.includes(platform)) {
      setProfile({
        ...profile,
        campaignPreferences: {
          ...profile.campaignPreferences,
          preferredPlatforms: platforms.filter((p) => p !== platform),
        },
      })
    } else {
      setProfile({
        ...profile,
        campaignPreferences: {
          ...profile.campaignPreferences,
          preferredPlatforms: [...platforms, platform],
        },
      })
    }
  }

  const toggleCampaignType = (type: string) => {
    const types = profile.campaignPreferences.campaignTypes
    if (types.includes(type)) {
      setProfile({
        ...profile,
        campaignPreferences: {
          ...profile.campaignPreferences,
          campaignTypes: types.filter((t) => t !== type),
        },
      })
    } else {
      setProfile({
        ...profile,
        campaignPreferences: {
          ...profile.campaignPreferences,
          campaignTypes: [...types, type],
        },
      })
    }
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
          <h1 className="text-3xl font-bold">Brand Profile</h1>
          <p className="text-gray-600">Manage your brand information and preferences</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Save Profile
        </Button>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="brand">Brand Details</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your company's basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-2xl">{profile.companyName?.charAt(0) || "B"}</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">JPG, PNG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={profile.companyName}
                    onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                    placeholder="Your Company Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    placeholder="https://yourcompany.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select
                    value={profile.industry}
                    onValueChange={(value) => setProfile({ ...profile, industry: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  placeholder="Tell us about your company, mission, and values..."
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How influencers can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={profile.contactInfo.contactEmail}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        contactInfo: { ...profile.contactInfo, contactEmail: e.target.value },
                      })
                    }
                    placeholder="contact@yourcompany.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.contactInfo.phone}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        contactInfo: { ...profile.contactInfo, phone: e.target.value },
                      })
                    }
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profile.contactInfo.address}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      contactInfo: { ...profile.contactInfo, address: e.target.value },
                    })
                  }
                  placeholder="Your company address"
                />
              </div>

              <div className="space-y-4">
                <Label>Social Media</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={profile.socialMedia.instagram || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          socialMedia: { ...profile.socialMedia, instagram: e.target.value },
                        })
                      }
                      placeholder="@yourcompany"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={profile.socialMedia.twitter || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          socialMedia: { ...profile.socialMedia, twitter: e.target.value },
                        })
                      }
                      placeholder="@yourcompany"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={profile.socialMedia.linkedin || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          socialMedia: { ...profile.socialMedia, linkedin: e.target.value },
                        })
                      }
                      placeholder="company/yourcompany"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={profile.socialMedia.facebook || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          socialMedia: { ...profile.socialMedia, facebook: e.target.value },
                        })
                      }
                      placeholder="yourcompany"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brand" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Details</CardTitle>
              <CardDescription>Define your brand values and target audience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Brand Values</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile.brandValues.map((value) => (
                    <Badge
                      key={value}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeBrandValue(value)}
                    >
                      {value} ×
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newBrandValue}
                    onChange={(e) => setNewBrandValue(e.target.value)}
                    placeholder="Add a brand value"
                    onKeyPress={(e) => e.key === "Enter" && addBrandValue()}
                  />
                  <Button onClick={addBrandValue} variant="outline">
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Textarea
                  id="targetAudience"
                  value={profile.targetAudience}
                  onChange={(e) => setProfile({ ...profile, targetAudience: e.target.value })}
                  placeholder="Describe your target audience demographics, interests, and behaviors..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Preferences</CardTitle>
              <CardDescription>Set your preferred platforms and campaign types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Preferred Platforms</Label>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((platform) => (
                    <Badge
                      key={platform}
                      variant={
                        profile.campaignPreferences.preferredPlatforms.includes(platform) ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => togglePlatform(platform)}
                    >
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Campaign Types</Label>
                <div className="flex flex-wrap gap-2">
                  {campaignTypes.map((type) => (
                    <Badge
                      key={type}
                      variant={profile.campaignPreferences.campaignTypes.includes(type) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleCampaignType(type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Budget Range (per campaign)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minBudget">Minimum (₹)</Label>
                    <Input
                      id="minBudget"
                      type="number"
                      value={profile.campaignPreferences.budgetRange.min}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          campaignPreferences: {
                            ...profile.campaignPreferences,
                            budgetRange: {
                              ...profile.campaignPreferences.budgetRange,
                              min: Number(e.target.value),
                            },
                          },
                        })
                      }
                      placeholder="5000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxBudget">Maximum (₹)</Label>
                    <Input
                      id="maxBudget"
                      type="number"
                      value={profile.campaignPreferences.budgetRange.max}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          campaignPreferences: {
                            ...profile.campaignPreferences,
                            budgetRange: {
                              ...profile.campaignPreferences.budgetRange,
                              max: Number(e.target.value),
                            },
                          },
                        })
                      }
                      placeholder="100000"
                    />
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
