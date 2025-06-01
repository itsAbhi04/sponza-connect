"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Send,
  Search,
  Users,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";
import { EnhancedBrandLayout } from "@/components/layouts/enhanced-brand-layout";
import { toast } from "sonner";

interface Influencer {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  profile: {
    niche: string[];
    socialMediaStats: Array<{
      platform: string;
      username: string;
      followers: number;
      engagementRate: number;
    }>;
    averageRating: number;
    completedCampaigns: number;
  };
}

interface Campaign {
  _id: string;
  title: string;
  budget: number;
  status: string;
}

interface Invitation {
  _id: string;
  influencer: Influencer;
  campaign?: Campaign;
  message: string;
  status: "pending" | "accepted" | "declined" | "expired";
  sentAt: string;
  expiresAt: string;
}

export default function BrandInvitePage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [customTerms, setCustomTerms] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [nicheFilter, setNicheFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  useEffect(() => {
    fetchInfluencers();
    fetchCampaigns();
    fetchInvitations();
  }, []);

  const fetchInfluencers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/brand/influencers/discover", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInfluencers(data.influencers || []);
      }
    } catch (error) {
      console.error("Failed to fetch influencers:", error);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/campaigns?status=published", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCampaigns(data.campaigns || []);
      }
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    }
  };

  const fetchInvitations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/brand/invite", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInvitations(data.invitations || []);
      }
    } catch (error) {
      console.error("Failed to fetch invitations:", error);
    }
  };

  const handleSendInvitations = async () => {
    if (selectedInfluencers.length === 0) {
      toast.error("Please select at least one influencer");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("/api/brand/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          influencerIds: selectedInfluencers,
          campaignId: selectedCampaign || null,
          message: inviteMessage,
          customTerms,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(
          `Invitations sent to ${data.invitationsSent} influencers`
        );
        setSelectedInfluencers([]);
        setInviteMessage("");
        setCustomTerms("");
        setSelectedCampaign("");
        setShowInviteDialog(false);
        fetchInvitations();
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to send invitations");
      }
    } catch (error) {
      console.error("Send invitations error:", error);
      toast.error("Failed to send invitations");
    } finally {
      setLoading(false);
    }
  };

  const filteredInfluencers = influencers.filter((influencer) => {
    const name = influencer.name?.toLowerCase() || "";
    const email = influencer.email?.toLowerCase() || "";
    const matchesSearch =
      name.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase());

    const matchesNiche =
      !nicheFilter || influencer.profile?.niche?.includes(nicheFilter);

    return matchesSearch && matchesNiche;
  });

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "accepted":
        return "bg-green-100 text-green-700";
      case "declined":
        return "bg-red-100 text-red-700";
      case "expired":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4" />;
      case "declined":
        return <XCircle className="h-4 w-4" />;
      case "expired":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <EnhancedBrandLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Invite Influencers
            </h1>
            <p className="text-gray-600">
              Discover and invite influencers to your campaigns
            </p>
          </div>
          <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
            <DialogTrigger asChild>
              <Button disabled={selectedInfluencers.length === 0}>
                <Send className="h-4 w-4 mr-2" />
                Send Invitations ({selectedInfluencers.length})
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Send Campaign Invitations</DialogTitle>
                <DialogDescription>
                  Invite {selectedInfluencers.length} influencer(s) to
                  collaborate with your brand
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">
                    Campaign (Optional)
                  </label>
                  <Select
                    value={selectedCampaign}
                    onValueChange={setSelectedCampaign}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a campaign or leave blank for general invitation" />
                    </SelectTrigger>
                    <SelectContent>
                      {campaigns.map((campaign) => (
                        <SelectItem key={campaign._id} value={campaign._id}>
                          {campaign.title} - ₹{campaign.budget.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Personal Message
                  </label>
                  <Textarea
                    placeholder="Write a personalized message to the influencers..."
                    value={inviteMessage}
                    onChange={(e) => setInviteMessage(e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Custom Terms (Optional)
                  </label>
                  <Textarea
                    placeholder="Any specific terms or requirements..."
                    value={customTerms}
                    onChange={(e) => setCustomTerms(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowInviteDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSendInvitations} disabled={loading}>
                    {loading ? "Sending..." : "Send Invitations"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Invitations
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {invitations.length}
                  </p>
                </div>
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {invitations.filter((i) => i.status === "pending").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Accepted</p>
                  <p className="text-2xl font-bold text-green-600">
                    {invitations.filter((i) => i.status === "accepted").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Response Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {invitations.length > 0
                      ? Math.round(
                          (invitations.filter((i) => i.status !== "pending")
                            .length /
                            invitations.length) *
                            100
                        )
                      : 0}
                    %
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Influencer Discovery */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Discover Influencers</CardTitle>
                <CardDescription>
                  Find and select influencers to invite
                </CardDescription>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search influencers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={nicheFilter} onValueChange={setNicheFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by niche" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Niches</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredInfluencers.map((influencer) => (
                    <div
                      key={influencer._id}
                      className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <Checkbox
                        checked={selectedInfluencers.includes(influencer._id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedInfluencers([
                              ...selectedInfluencers,
                              influencer._id,
                            ]);
                          } else {
                            setSelectedInfluencers(
                              selectedInfluencers.filter(
                                (id) => id !== influencer._id
                              )
                            );
                          }
                        }}
                      />
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={influencer.profilePicture || "/placeholder.svg"}
                          alt={influencer.name}
                        />
                        <AvatarFallback>
                          {influencer.name?.charAt(0) ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{influencer.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-500 ml-1">
                              {influencer.profile?.averageRating?.toFixed(1) ||
                                "0.0"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          {influencer.profile?.socialMediaStats?.map((stat) => (
                            <div
                              key={stat.platform}
                              className="flex items-center gap-1 text-xs text-gray-500"
                            >
                              {stat.platform === "instagram" && (
                                <Instagram className="h-3 w-3" />
                              )}
                              {stat.platform === "youtube" && (
                                <Youtube className="h-3 w-3" />
                              )}
                              {stat.platform === "twitter" && (
                                <Twitter className="h-3 w-3" />
                              )}
                              {formatFollowers(stat.followers)}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-1 mt-2">
                          {influencer.profile?.niche
                            ?.slice(0, 3)
                            .map((niche) => (
                              <Badge key={niche} variant="secondary">
                                {niche}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Invitations */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Invitations</CardTitle>
                <CardDescription>Track your invitation status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {invitations.slice(0, 10).map((invitation) => (
                    <div
                      key={invitation._id}
                      className="flex items-center space-x-3 p-3 border rounded-lg"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            invitation.influencer.profilePicture ||
                            "/placeholder.svg"
                          }
                          alt={invitation.influencer.name}
                        />
                        <AvatarFallback>
                          {invitation.influencer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {invitation.influencer.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(invitation.sentAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(invitation.status)}
                        <Badge
                          className={`ml-2 text-xs ${getStatusColor(
                            invitation.status
                          )}`}
                        >
                          {invitation.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </EnhancedBrandLayout>
  );
}
