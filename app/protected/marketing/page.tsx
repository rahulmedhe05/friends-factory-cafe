"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { 
  MessageSquare, 
  Plus, 
  Send,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Edit,
  Copy,
  Trash2,
  Filter,
  Search,
  Target,
  TrendingUp,
  Heart,
  Cake,
  Gift,
  Star,
  PartyPopper,
  Sparkles,
  RefreshCcw,
  Play,
  Pause,
  BarChart3,
  Phone,
  Mail,
  Tag,
  Image,
  FileText,
  ExternalLink,
  Zap
} from "lucide-react"

// Mock Campaign Data
const mockCampaigns = [
  {
    id: "CAM001",
    name: "Valentine's Day Special",
    type: "promotional",
    status: "scheduled",
    template: "valentine_promo",
    audience: "All WhatsApp Opt-in",
    audienceCount: 245,
    scheduledFor: "2024-02-10 10:00",
    sent: 0,
    delivered: 0,
    read: 0,
    clicks: 0,
    createdAt: "2024-01-15",
  },
  {
    id: "CAM002",
    name: "January Birthday Wishes",
    type: "automated",
    status: "active",
    template: "birthday_wish",
    audience: "January Birthdays",
    audienceCount: 12,
    scheduledFor: null,
    sent: 8,
    delivered: 8,
    read: 6,
    clicks: 3,
    createdAt: "2024-01-01",
  },
  {
    id: "CAM003",
    name: "Anniversary Reminder",
    type: "automated",
    status: "active",
    template: "anniversary_reminder",
    audience: "Upcoming Anniversaries",
    audienceCount: 18,
    scheduledFor: null,
    sent: 15,
    delivered: 15,
    read: 12,
    clicks: 5,
    createdAt: "2024-01-01",
  },
  {
    id: "CAM004",
    name: "Weekend Flash Sale",
    type: "promotional",
    status: "completed",
    template: "flash_sale",
    audience: "VIP Customers",
    audienceCount: 85,
    scheduledFor: "2024-01-12 18:00",
    sent: 85,
    delivered: 82,
    read: 65,
    clicks: 28,
    createdAt: "2024-01-10",
  },
  {
    id: "CAM005",
    name: "Feedback Request",
    type: "automated",
    status: "active",
    template: "feedback_request",
    audience: "Post-Visit (24hrs)",
    audienceCount: 0,
    scheduledFor: null,
    sent: 42,
    delivered: 40,
    read: 35,
    clicks: 18,
    createdAt: "2024-01-01",
  },
]

const mockTemplates = [
  {
    id: "TPL001",
    name: "Booking Confirmation",
    category: "transactional",
    status: "approved",
    language: "en",
    preview: "Hi {{name}}! 🎉 Your romantic experience at Friends Factory is confirmed!\n\n📅 Date: {{date}}\n⏰ Time: {{time}}\n📍 Outlet: {{outlet}}\n🎁 Package: {{package}}\n\nWe can't wait to make your special moment memorable! ❤️",
    variables: ["name", "date", "time", "outlet", "package"],
    lastUsed: "2024-01-18",
  },
  {
    id: "TPL002",
    name: "Birthday Wish",
    category: "marketing",
    status: "approved",
    language: "en",
    preview: "Happy Birthday, {{name}}! 🎂🎉\n\nCelebrate your special day with a romantic experience at Friends Factory!\n\n🎁 Get 15% OFF on any package\nUse code: BDAY{{year}}\n\nValid for 7 days. Book now! 💝",
    variables: ["name", "year"],
    lastUsed: "2024-01-15",
  },
  {
    id: "TPL003",
    name: "Anniversary Reminder",
    category: "marketing",
    status: "approved",
    language: "en",
    preview: "Hi {{name}}! 💕\n\nYour anniversary is coming up on {{date}}! \n\nMake it special with a romantic candlelight dinner at Friends Factory. Book early to get your preferred slot!\n\n👉 Book Now: {{link}}\n\nLove, Team Friends Factory ❤️",
    variables: ["name", "date", "link"],
    lastUsed: "2024-01-17",
  },
  {
    id: "TPL004",
    name: "Valentine Special",
    category: "marketing",
    status: "pending",
    language: "en",
    preview: "💘 Valentine's Day is Here! 💘\n\nHi {{name}}, make this Valentine's unforgettable!\n\n✨ Special Valentine Packages starting ₹4,999\n🌹 Complimentary roses & chocolates\n📸 Free couple photoshoot\n\nLimited slots available!\n\n❤️ Book Now: {{link}}",
    variables: ["name", "link"],
    lastUsed: null,
  },
  {
    id: "TPL005",
    name: "Feedback Request",
    category: "transactional",
    status: "approved",
    language: "en",
    preview: "Hi {{name}}! 🌟\n\nThank you for celebrating with us!\n\nWe'd love to hear about your experience. Your feedback helps us create more magical moments! ✨\n\n👉 Share feedback: {{link}}\n\nSee you again soon! 💝",
    variables: ["name", "link"],
    lastUsed: "2024-01-18",
  },
]

const audienceSegments = [
  { name: "All WhatsApp Opt-in", count: 245, icon: Users },
  { name: "VIP Customers", count: 38, icon: Star },
  { name: "January Birthdays", count: 12, icon: Cake },
  { name: "February Birthdays", count: 15, icon: Cake },
  { name: "Upcoming Anniversaries", count: 18, icon: Heart },
  { name: "Haven't Visited 30d", count: 42, icon: Clock },
  { name: "High Spenders", count: 25, icon: TrendingUp },
  { name: "Proposal Success", count: 28, icon: Gift },
]

const statusConfig = {
  scheduled: { label: "Scheduled", color: "bg-blue-500", icon: Clock },
  active: { label: "Active", color: "bg-emerald-500", icon: Play },
  completed: { label: "Completed", color: "bg-gray-500", icon: CheckCircle2 },
  paused: { label: "Paused", color: "bg-amber-500", icon: Pause },
  draft: { label: "Draft", color: "bg-gray-400", icon: FileText },
}

const templateStatusConfig = {
  approved: { label: "Approved", color: "bg-emerald-500" },
  pending: { label: "Pending Review", color: "bg-amber-500" },
  rejected: { label: "Rejected", color: "bg-red-500" },
}

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("campaigns")
  const [showCreateCampaign, setShowCreateCampaign] = useState(false)
  const [showCreateTemplate, setShowCreateTemplate] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAudience, setSelectedAudience] = useState<string[]>([])

  // Stats
  const totalMessagesSent = mockCampaigns.reduce((sum, c) => sum + c.sent, 0)
  const totalDelivered = mockCampaigns.reduce((sum, c) => sum + c.delivered, 0)
  const totalRead = mockCampaigns.reduce((sum, c) => sum + c.read, 0)
  const totalClicks = mockCampaigns.reduce((sum, c) => sum + c.clicks, 0)
  const deliveryRate = totalMessagesSent > 0 ? Math.round((totalDelivered / totalMessagesSent) * 100) : 0
  const readRate = totalDelivered > 0 ? Math.round((totalRead / totalDelivered) * 100) : 0
  const clickRate = totalRead > 0 ? Math.round((totalClicks / totalRead) * 100) : 0

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-green-600" />
            WhatsApp Marketing
          </h1>
          <p className="text-muted-foreground">
            Create campaigns, manage templates, and engage with customers
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showCreateCampaign} onOpenChange={setShowCreateCampaign}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>
                  Set up a new WhatsApp marketing campaign
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                <div className="grid gap-2">
                  <Label>Campaign Name</Label>
                  <Input placeholder="e.g., Valentine's Day Special" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Campaign Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="promotional">Promotional</SelectItem>
                        <SelectItem value="automated">Automated</SelectItem>
                        <SelectItem value="transactional">Transactional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Message Template</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockTemplates.filter(t => t.status === "approved").map(t => (
                          <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Target Audience</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded-md">
                    {audienceSegments.map((segment) => {
                      const Icon = segment.icon
                      return (
                        <div key={segment.name} className="flex items-center space-x-2">
                          <Checkbox 
                            id={segment.name}
                            checked={selectedAudience.includes(segment.name)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedAudience([...selectedAudience, segment.name])
                              } else {
                                setSelectedAudience(selectedAudience.filter(a => a !== segment.name))
                              }
                            }}
                          />
                          <label htmlFor={segment.name} className="text-sm flex items-center gap-1 cursor-pointer">
                            <Icon className="h-3 w-3" />
                            {segment.name}
                            <Badge variant="secondary" className="ml-1 text-xs">{segment.count}</Badge>
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Schedule Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Schedule Time</Label>
                    <Input type="time" />
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Estimated Reach</p>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-green-600">
                      {selectedAudience.reduce((sum, name) => {
                        const segment = audienceSegments.find(s => s.name === name)
                        return sum + (segment?.count || 0)
                      }, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      customers will receive this message
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateCampaign(false)}>Cancel</Button>
                <Button variant="outline">Save as Draft</Button>
                <Button onClick={() => setShowCreateCampaign(false)}>
                  <Send className="h-4 w-4 mr-2" />
                  Schedule Campaign
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessagesSent}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveryRate}%</div>
            <Progress value={deliveryRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read Rate</CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readRate}%</div>
            <Progress value={readRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            <Zap className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clickRate}%</div>
            <Progress value={clickRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="audiences">Audiences</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campaign List</CardTitle>
                  <CardDescription>Manage your WhatsApp marketing campaigns</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-[200px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead className="text-center">Sent</TableHead>
                    <TableHead className="text-center">Delivered</TableHead>
                    <TableHead className="text-center">Read</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCampaigns.map((campaign) => {
                    const status = statusConfig[campaign.status as keyof typeof statusConfig]
                    const StatusIcon = status.icon
                    
                    return (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{campaign.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {campaign.scheduledFor ? `Scheduled: ${campaign.scheduledFor}` : 'Automated trigger'}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{campaign.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span className="text-sm">{campaign.audience}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{campaign.sent}</TableCell>
                        <TableCell className="text-center">
                          {campaign.delivered > 0 && (
                            <span className="text-emerald-600">{campaign.delivered}</span>
                          )}
                          {campaign.delivered === 0 && "-"}
                        </TableCell>
                        <TableCell className="text-center">
                          {campaign.read > 0 && (
                            <span className="text-blue-600">{campaign.read}</span>
                          )}
                          {campaign.read === 0 && "-"}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={status.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Message Templates</h2>
            <Dialog open={showCreateTemplate} onOpenChange={setShowCreateTemplate}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create Message Template</DialogTitle>
                  <DialogDescription>
                    Templates must be approved by WhatsApp before use
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Template Name</Label>
                    <Input placeholder="e.g., booking_confirmation" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="transactional">Transactional</SelectItem>
                        <SelectItem value="utility">Utility</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Message Body</Label>
                    <Textarea 
                      placeholder="Use {{variable}} for dynamic content"
                      rows={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      Variables: {"{{name}}"}, {"{{date}}"}, {"{{time}}"}, {"{{outlet}}"}, {"{{link}}"}
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCreateTemplate(false)}>Cancel</Button>
                  <Button onClick={() => setShowCreateTemplate(false)}>Submit for Approval</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {mockTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{template.category}</Badge>
                        <Badge className={templateStatusConfig[template.status as keyof typeof templateStatusConfig].color}>
                          {templateStatusConfig[template.status as keyof typeof templateStatusConfig].label}
                        </Badge>
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-3 rounded-lg text-sm whitespace-pre-wrap font-mono max-h-40 overflow-y-auto">
                    {template.preview}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Variables: {template.variables.length}</span>
                    <span>{template.lastUsed ? `Last used: ${template.lastUsed}` : 'Never used'}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Audiences Tab */}
        <TabsContent value="audiences" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
              <CardDescription>Target specific customer groups for your campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {audienceSegments.map((segment) => {
                  const Icon = segment.icon
                  return (
                    <Card key={segment.name} className="cursor-pointer hover:border-primary transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{segment.name}</p>
                            <p className="text-2xl font-bold">{segment.count}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Create Custom Segment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="grid gap-2">
                  <Label>City</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="surat">Surat</SelectItem>
                      <SelectItem value="vadodara">Vadodara</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Total Spend</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="50k+">₹50,000+</SelectItem>
                      <SelectItem value="20k-50k">₹20,000 - ₹50,000</SelectItem>
                      <SelectItem value="<20k">Less than ₹20,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Last Visit</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="30d+">More than 30 days ago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Tags</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                      <SelectItem value="referral">Referral Program</SelectItem>
                      <SelectItem value="anniversary">Anniversary Regular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Estimated reach: <strong>0</strong> customers</span>
                </div>
                <Button size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filter
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Booking Confirmations
                </CardTitle>
                <CardDescription>Automatically send when booking is confirmed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge className="bg-emerald-500">Active</Badge>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Day Before Reminder
                </CardTitle>
                <CardDescription>Send reminder 24 hours before booking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge className="bg-emerald-500">Active</Badge>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-500" />
                  Feedback Request
                </CardTitle>
                <CardDescription>Ask for review 24 hours after visit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge className="bg-emerald-500">Active</Badge>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Cake className="h-5 w-5 text-pink-500" />
                  Birthday Wishes
                </CardTitle>
                <CardDescription>Send birthday greetings with special offer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge className="bg-emerald-500">Active</Badge>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Anniversary Reminders
                </CardTitle>
                <CardDescription>Send 7 days before anniversary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge className="bg-emerald-500">Active</Badge>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <RefreshCcw className="h-5 w-5 text-orange-500" />
                  Re-engagement
                </CardTitle>
                <CardDescription>Reach out to inactive customers (30+ days)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Paused</Badge>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
