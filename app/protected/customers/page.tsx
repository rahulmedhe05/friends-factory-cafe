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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  Star,
  TrendingUp,
  MoreVertical,
  MessageSquare,
  Gift,
  Heart,
  Download,
  Filter,
  Send,
  Edit,
  Eye,
  History,
  Tag,
  IndianRupee,
  MapPin,
  Clock,
  Cake,
  PartyPopper,
  ChevronRight
} from "lucide-react"
import Link from "next/link"

// Mock Data
const mockCustomers = [
  {
    id: "CUST001",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@gmail.com",
    city: "Surat",
    total_spend: 45000,
    total_bookings: 5,
    last_visit: "2024-01-15",
    tags: ["VIP", "Anniversary Regular"],
    occasions: ["Anniversary", "Birthday"],
    first_visit: "2023-06-10",
    consent_whatsapp: true,
    notes: "Prefers private corner table. Anniversary on 15th March.",
    source: "Instagram",
  },
  {
    id: "CUST002",
    name: "Priya Patel",
    phone: "+91 87654 32109",
    email: "priya.p@outlook.com",
    city: "Vadodara",
    total_spend: 32000,
    total_bookings: 3,
    last_visit: "2024-01-10",
    tags: ["Referral Program"],
    occasions: ["Birthday", "Proposal"],
    first_visit: "2023-09-20",
    consent_whatsapp: true,
    notes: "Referred 2 customers. Loves candlelight setup.",
    source: "Referral",
  },
  {
    id: "CUST003",
    name: "Amit & Neha Verma",
    phone: "+91 76543 21098",
    email: "amit.verma@yahoo.com",
    city: "Surat",
    total_spend: 78000,
    total_bookings: 8,
    last_visit: "2024-01-18",
    tags: ["VIP", "High Spender", "Anniversary Regular"],
    occasions: ["Anniversary", "Valentine"],
    first_visit: "2022-02-14",
    consent_whatsapp: true,
    notes: "Celebrates every month anniversary! Premium customer.",
    source: "Google",
  },
  {
    id: "CUST004",
    name: "Kavya Mehta",
    phone: "+91 65432 10987",
    email: "kavya.m@gmail.com",
    city: "Surat",
    total_spend: 15000,
    total_bookings: 2,
    last_visit: "2023-12-25",
    tags: ["Birthday Celebration"],
    occasions: ["Birthday"],
    first_visit: "2023-10-15",
    consent_whatsapp: false,
    notes: "Birthday on Dec 25th. Vegetarian preferences.",
    source: "Facebook",
  },
  {
    id: "CUST005",
    name: "Vikram Singh",
    phone: "+91 54321 09876",
    email: "vikram.s@hotmail.com",
    city: "Vadodara",
    total_spend: 25000,
    total_bookings: 2,
    last_visit: "2024-01-05",
    tags: ["Proposal Success"],
    occasions: ["Proposal"],
    first_visit: "2023-11-20",
    consent_whatsapp: true,
    notes: "Proposed here! Wants to celebrate anniversary annually.",
    source: "Instagram",
  },
  {
    id: "CUST006",
    name: "Ananya Desai",
    phone: "+91 43210 98765",
    email: "ananya.d@gmail.com",
    city: "Surat",
    total_spend: 8500,
    total_bookings: 1,
    last_visit: "2024-01-12",
    tags: ["New Customer"],
    occasions: ["Date Night"],
    first_visit: "2024-01-12",
    consent_whatsapp: true,
    notes: "First time visitor. Loved the ambiance.",
    source: "Walk-in",
  },
]

const tagColors: Record<string, string> = {
  "VIP": "bg-amber-500 text-white",
  "High Spender": "bg-emerald-500 text-white",
  "Anniversary Regular": "bg-pink-500 text-white",
  "Birthday Celebration": "bg-purple-500 text-white",
  "Proposal Success": "bg-red-500 text-white",
  "Referral Program": "bg-blue-500 text-white",
  "New Customer": "bg-gray-500 text-white",
}

const occasionIcons: Record<string, any> = {
  "Anniversary": Heart,
  "Birthday": Cake,
  "Proposal": Gift,
  "Valentine": Heart,
  "Date Night": Star,
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState<string>("all")
  const [selectedTag, setSelectedTag] = useState<string>("all")
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [spendFilter, setSpendFilter] = useState<string>("all")
  const [visitFilter, setVisitFilter] = useState<string>("all")

  // Quick phone search - highlights exact match
  const isPhoneSearch = searchQuery.replace(/\s/g, "").match(/^\+?\d{10,}$/)

  // Filter customers
  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.replace(/\s/g, "").includes(searchQuery.replace(/\s/g, "")) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCity = selectedCity === "all" || customer.city === selectedCity
    const matchesTag = selectedTag === "all" || customer.tags.includes(selectedTag)
    
    const matchesSpend = spendFilter === "all" ||
      (spendFilter === "high" && customer.total_spend >= 50000) ||
      (spendFilter === "medium" && customer.total_spend >= 20000 && customer.total_spend < 50000) ||
      (spendFilter === "low" && customer.total_spend < 20000)
    
    const matchesVisits = visitFilter === "all" ||
      (visitFilter === "frequent" && customer.total_bookings >= 5) ||
      (visitFilter === "regular" && customer.total_bookings >= 2 && customer.total_bookings < 5) ||
      (visitFilter === "new" && customer.total_bookings === 1)
    
    return matchesSearch && matchesCity && matchesTag && matchesSpend && matchesVisits
  })

  // Stats
  const totalCustomers = mockCustomers.length
  const vipCustomers = mockCustomers.filter(c => c.tags.includes("VIP")).length
  const totalRevenue = mockCustomers.reduce((sum, c) => sum + c.total_spend, 0)
  const avgSpend = Math.round(totalRevenue / totalCustomers)
  const whatsappOptIn = mockCustomers.filter(c => c.consent_whatsapp).length

  const toggleCustomerSelection = (id: string) => {
    setSelectedCustomers(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(filteredCustomers.map(c => c.id))
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Customer Database</h1>
          <p className="text-muted-foreground">
            Manage your customer relationships and send targeted campaigns
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Create a new customer profile in the database
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Full Name *</Label>
                  <Input placeholder="Enter customer name" />
                </div>
                <div className="grid gap-2">
                  <Label>Phone Number *</Label>
                  <Input placeholder="+91 98765 43210" />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="email@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label>City</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="surat">Surat</SelectItem>
                      <SelectItem value="vadodara">Vadodara</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Source</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="How did they find us?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="walkin">Walk-in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Special preferences, occasions, etc." />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="whatsapp" defaultChecked />
                  <label htmlFor="whatsapp" className="text-sm">
                    WhatsApp marketing consent
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddDialog(false)}>
                  Add Customer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              +12 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
            <Star className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vipCustomers}</div>
            <p className="text-xs text-muted-foreground">
              ₹50k+ lifetime value
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalRevenue/1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">
              From all customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Spend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{avgSpend.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Per customer
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WhatsApp Opt-in</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{whatsappOptIn}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((whatsappOptIn/totalCustomers)*100)}% consent rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Quick Phone Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Quick search by phone, name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
              {isPhoneSearch && filteredCustomers.length > 0 && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-background border rounded-md shadow-lg z-10 p-2">
                  <p className="text-xs text-muted-foreground px-2 pb-2">Quick Results:</p>
                  {filteredCustomers.slice(0, 3).map(customer => (
                    <Link 
                      key={customer.id}
                      href={`/protected/customers/${customer.id}`}
                      className="flex items-center gap-3 p-2 hover:bg-muted rounded-md"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {customer.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.phone}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Filter Toggles */}
            <div className="flex gap-2 flex-wrap">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-[130px]">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="Surat">Surat</SelectItem>
                  <SelectItem value="Vadodara">Vadodara</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-[150px]">
                  <Tag className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="High Spender">High Spender</SelectItem>
                  <SelectItem value="Anniversary Regular">Anniversary</SelectItem>
                  <SelectItem value="Birthday Celebration">Birthday</SelectItem>
                  <SelectItem value="Proposal Success">Proposal</SelectItem>
                  <SelectItem value="Referral Program">Referral</SelectItem>
                  <SelectItem value="New Customer">New</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant={showFilters ? "secondary" : "outline"} 
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="flex gap-4 mt-4 pt-4 border-t flex-wrap">
              <div className="flex items-center gap-2">
                <Label className="text-sm whitespace-nowrap">Spend Level:</Label>
                <Select value={spendFilter} onValueChange={setSpendFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="high">High (₹50k+)</SelectItem>
                    <SelectItem value="medium">Medium (₹20-50k)</SelectItem>
                    <SelectItem value="low">Low (&lt;₹20k)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm whitespace-nowrap">Visit Frequency:</Label>
                <Select value={visitFilter} onValueChange={setVisitFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="frequent">Frequent (5+)</SelectItem>
                    <SelectItem value="regular">Regular (2-4)</SelectItem>
                    <SelectItem value="new">New (1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedCustomers.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {selectedCustomers.length} customer{selectedCustomers.length > 1 ? 's' : ''} selected
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Tag className="h-4 w-4 mr-2" />
                  Add Tag
                </Button>
                <Button variant="outline" size="sm">
                  <Send className="h-4 w-4 mr-2" />
                  Send Campaign
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCustomers([])}>
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customer Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                    onCheckedChange={selectAll}
                  />
                </TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Tags</TableHead>
                <TableHead className="text-right">Total Spend</TableHead>
                <TableHead className="text-center hidden sm:table-cell">Visits</TableHead>
                <TableHead className="hidden lg:table-cell">Last Visit</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="group">
                  <TableCell>
                    <Checkbox 
                      checked={selectedCustomers.includes(customer.id)}
                      onCheckedChange={() => toggleCustomerSelection(customer.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Link 
                      href={`/protected/customers/${customer.id}`}
                      className="flex items-center gap-3 hover:opacity-80"
                    >
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {customer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {customer.city}
                          {customer.consent_whatsapp && (
                            <MessageSquare className="h-3 w-3 ml-2 text-green-500" />
                          )}
                        </p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="space-y-1">
                      <p className="text-sm flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {customer.tags.slice(0, 2).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className={tagColors[tag] || ""}
                        >
                          {tag}
                        </Badge>
                      ))}
                      {customer.tags.length > 2 && (
                        <Badge variant="outline">+{customer.tags.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <p className="font-medium">₹{customer.total_spend.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">lifetime</p>
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    <Badge variant="outline">{customer.total_bookings}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(customer.last_visit).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/protected/customers/${customer.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <History className="h-4 w-4 mr-2" />
                          Booking History
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Phone className="h-4 w-4 mr-2" />
                          Call Customer
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-green-600">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          WhatsApp
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Plus className="h-4 w-4 mr-2" />
                          New Booking
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions Sidebar */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Cake className="h-4 w-4 text-purple-500" />
              Upcoming Birthdays
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">KM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Kavya Mehta</p>
                  <p className="text-xs text-muted-foreground">Dec 25</p>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                <Gift className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="link" className="w-full text-sm" asChild>
              <Link href="/protected/marketing">View All Occasions →</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Heart className="h-4 w-4 text-pink-500" />
              Anniversary Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">RS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Rahul Sharma</p>
                  <p className="text-xs text-muted-foreground">Mar 15</p>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="link" className="w-full text-sm" asChild>
              <Link href="/protected/marketing">Send Campaign →</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <PartyPopper className="h-4 w-4 text-amber-500" />
              Re-engagement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              3 customers haven't visited in 30+ days
            </p>
            <Button variant="outline" className="w-full" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Win-back Campaign
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
