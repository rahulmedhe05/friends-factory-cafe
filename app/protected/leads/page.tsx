"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Filter,
  Phone,
  MessageCircle,
  Calendar,
  MoreHorizontal,
  ArrowRight,
  Clock
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for leads
const mockLeads = [
  {
    id: "1",
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    whatsapp_number: "+91 98765 43210",
    occasion_type: "candlelight",
    preferred_date: "2026-01-14",
    status: "new",
    lead_source: "instagram",
    enquiry_channel: "dm",
    budget_range: "₹3000-5000",
    created_at: "2026-01-07T10:30:00",
    notes: "Valentine's week booking enquiry"
  },
  {
    id: "2",
    name: "Rahul Patel",
    phone: "+91 87654 32109",
    whatsapp_number: "+91 87654 32109",
    occasion_type: "proposal",
    preferred_date: "2026-01-20",
    status: "quotation_sent",
    lead_source: "google_maps",
    enquiry_channel: "call",
    budget_range: "₹5000-7000",
    created_at: "2026-01-06T15:45:00",
    notes: "Wants rooftop setup with musician"
  },
  {
    id: "3",
    name: "Anjali Mehta",
    phone: "+91 76543 21098",
    whatsapp_number: "+91 76543 21098",
    occasion_type: "birthday",
    preferred_date: "2026-01-25",
    status: "in_contact",
    lead_source: "referral",
    enquiry_channel: "whatsapp",
    budget_range: "₹4000-6000",
    created_at: "2026-01-05T09:15:00",
    notes: "Husband's 30th birthday surprise"
  },
  {
    id: "4",
    name: "Vikram Singh",
    phone: "+91 65432 10987",
    whatsapp_number: "+91 65432 10987",
    occasion_type: "anniversary",
    preferred_date: "2026-02-01",
    status: "awaiting_payment",
    lead_source: "website",
    enquiry_channel: "form",
    budget_range: "₹6000-8000",
    created_at: "2026-01-04T14:20:00",
    notes: "5th anniversary celebration"
  },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-800" },
  in_contact: { label: "In Contact", color: "bg-yellow-100 text-yellow-800" },
  quotation_sent: { label: "Quotation Sent", color: "bg-purple-100 text-purple-800" },
  awaiting_payment: { label: "Awaiting Payment", color: "bg-orange-100 text-orange-800" },
  converted: { label: "Converted", color: "bg-green-100 text-green-800" },
  lost: { label: "Lost", color: "bg-red-100 text-red-800" },
}

const occasionConfig: Record<string, { label: string; emoji: string }> = {
  candlelight: { label: "Candlelight Dinner", emoji: "🕯️" },
  birthday: { label: "Birthday", emoji: "🎂" },
  anniversary: { label: "Anniversary", emoji: "💑" },
  proposal: { label: "Proposal", emoji: "💍" },
  private_celebration: { label: "Private Celebration", emoji: "🎉" },
  other: { label: "Other", emoji: "✨" },
}

const sourceConfig: Record<string, { label: string; color: string }> = {
  instagram: { label: "Instagram", color: "bg-pink-100 text-pink-800" },
  google_maps: { label: "Google Maps", color: "bg-blue-100 text-blue-800" },
  website: { label: "Website", color: "bg-indigo-100 text-indigo-800" },
  zomato: { label: "Zomato", color: "bg-red-100 text-red-800" },
  referral: { label: "Referral", color: "bg-green-100 text-green-800" },
  walk_in: { label: "Walk-in", color: "bg-gray-100 text-gray-800" },
  other: { label: "Other", color: "bg-slate-100 text-slate-800" },
}

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [leads] = useState(mockLeads)

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getLeadsByStatus = (status: string) => filteredLeads.filter(l => l.status === status)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads & Enquiries</h1>
          <p className="text-muted-foreground">Manage and convert your enquiries into bookings</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>
                Capture a new enquiry from a potential customer
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" placeholder="Customer name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input id="whatsapp" placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="surat">Surat</SelectItem>
                      <SelectItem value="vadodara">Vadodara</SelectItem>
                      <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outlet">Preferred Outlet</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select outlet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="surat">Surat</SelectItem>
                      <SelectItem value="vadodara">Vadodara</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Lead Source *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="How did they find us?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="google_maps">Google Maps</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="zomato">Zomato</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="walk_in">Walk-in</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="channel">Enquiry Channel *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="How did they contact?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Phone Call</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="dm">DM (Instagram/Facebook)</SelectItem>
                      <SelectItem value="form">Website Form</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="occasion">Occasion Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candlelight">🕯️ Candlelight Dinner</SelectItem>
                      <SelectItem value="birthday">🎂 Birthday</SelectItem>
                      <SelectItem value="anniversary">💑 Anniversary</SelectItem>
                      <SelectItem value="proposal">💍 Proposal</SelectItem>
                      <SelectItem value="private_celebration">🎉 Private Celebration</SelectItem>
                      <SelectItem value="other">✨ Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="people">Number of People</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 People</SelectItem>
                      <SelectItem value="3">3 People</SelectItem>
                      <SelectItem value="4">4 People</SelectItem>
                      <SelectItem value="5">5+ People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2000-3000">₹2,000 - ₹3,000</SelectItem>
                      <SelectItem value="3000-5000">₹3,000 - ₹5,000</SelectItem>
                      <SelectItem value="5000-7000">₹5,000 - ₹7,000</SelectItem>
                      <SelectItem value="7000+">₹7,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any special requirements or notes..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Add Lead
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getLeadsByStatus("new").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getLeadsByStatus("in_contact").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quotation Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getLeadsByStatus("quotation_sent").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Awaiting Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getLeadsByStatus("awaiting_payment").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Converted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getLeadsByStatus("converted").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in_contact">In Contact</SelectItem>
            <SelectItem value="quotation_sent">Quotation Sent</SelectItem>
            <SelectItem value="awaiting_payment">Awaiting Payment</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Leads List */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="kanban">Kanban View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-4">
          <div className="space-y-3">
            {filteredLeads.map((lead) => (
              <Card key={lead.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold">{lead.name}</h3>
                        <Badge className={statusConfig[lead.status].color}>
                          {statusConfig[lead.status].label}
                        </Badge>
                        <Badge variant="outline">
                          {occasionConfig[lead.occasion_type]?.emoji} {occasionConfig[lead.occasion_type]?.label}
                        </Badge>
                        <Badge className={sourceConfig[lead.lead_source]?.color}>
                          {sourceConfig[lead.lead_source]?.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(lead.preferred_date).toLocaleDateString('en-IN', { 
                            day: 'numeric', month: 'short', year: 'numeric' 
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(lead.created_at).toLocaleDateString('en-IN', { 
                            day: 'numeric', month: 'short' 
                          })}
                        </span>
                      </div>
                      {lead.notes && (
                        <p className="text-sm text-muted-foreground">{lead.notes}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" title="Call">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="WhatsApp">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ArrowRight className="mr-1 h-3 w-3" />
                        Convert
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                          <DropdownMenuItem>Add Task</DropdownMenuItem>
                          <DropdownMenuItem>Send Quotation</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Convert to Booking</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Mark as Lost</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kanban" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto">
            {['new', 'in_contact', 'quotation_sent', 'awaiting_payment'].map((status) => (
              <div key={status} className="min-w-[280px]">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium">{statusConfig[status].label}</h3>
                  <Badge variant="secondary">{getLeadsByStatus(status).length}</Badge>
                </div>
                <div className="space-y-2">
                  {getLeadsByStatus(status).map((lead) => (
                    <Card key={lead.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{lead.name}</span>
                            <span className="text-lg">{occasionConfig[lead.occasion_type]?.emoji}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{lead.phone}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              {new Date(lead.preferred_date).toLocaleDateString('en-IN', { 
                                day: 'numeric', month: 'short' 
                              })}
                            </span>
                            <Badge className={sourceConfig[lead.lead_source]?.color + " text-xs"}>
                              {sourceConfig[lead.lead_source]?.label}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
