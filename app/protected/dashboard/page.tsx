"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { FullWidthCalendar } from "@/components/booking-calendar"
import Link from "next/link"
import { 
  IndianRupee,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Phone,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Plus,
  ChevronRight,
  Star,
  Heart,
  Cake,
  Gift,
  Building,
  Target,
  Zap,
  Bell
} from "lucide-react"

// Mock Dashboard Data
const todayStats = {
  bookings: 8,
  revenue: 68500,
  leads: 12,
  conversions: 4,
}

const todayBookings = [
  { 
    id: "BK001", 
    time: "4:00 PM", 
    customer: "Rahul Sharma", 
    phone: "+91 98765 43210",
    package: "Candlelight Dinner Premium", 
    outlet: "Surat",
    status: "confirmed",
    payment: "paid",
  },
  { 
    id: "BK002", 
    time: "5:30 PM", 
    customer: "Priya Patel", 
    phone: "+91 87654 32109",
    package: "Romantic Proposal", 
    outlet: "Vadodara",
    status: "confirmed",
    payment: "paid",
  },
  { 
    id: "BK003", 
    time: "7:00 PM", 
    customer: "Amit Verma", 
    phone: "+91 76543 21098",
    package: "Anniversary Special", 
    outlet: "Surat",
    status: "confirmed",
    payment: "partial",
  },
  { 
    id: "BK004", 
    time: "7:00 PM", 
    customer: "Neha Gupta", 
    phone: "+91 65432 10987",
    package: "Birthday Bash", 
    outlet: "Surat",
    status: "pending",
    payment: "pending",
  },
  { 
    id: "BK005", 
    time: "8:30 PM", 
    customer: "Vikram Singh", 
    phone: "+91 54321 09876",
    package: "Candlelight Dinner Basic", 
    outlet: "Vadodara",
    status: "confirmed",
    payment: "paid",
  },
]

const recentLeads = [
  { id: 1, name: "Ananya Desai", phone: "+91 99887 76655", source: "Instagram", occasion: "Anniversary", status: "new", time: "10 mins ago" },
  { id: 2, name: "Rohan Mehta", phone: "+91 88776 65544", source: "WhatsApp", occasion: "Proposal", status: "contacted", time: "25 mins ago" },
  { id: 3, name: "Simran Kaur", phone: "+91 77665 54433", source: "Google", occasion: "Birthday", status: "new", time: "1 hour ago" },
  { id: 4, name: "Arjun Nair", phone: "+91 66554 43322", source: "Referral", occasion: "Date Night", status: "qualified", time: "2 hours ago" },
]

const slotAvailability = [
  { time: "4:00 PM", surat: { total: 8, booked: 3 }, vadodara: { total: 6, booked: 1 } },
  { time: "5:30 PM", surat: { total: 8, booked: 5 }, vadodara: { total: 6, booked: 2 } },
  { time: "7:00 PM", surat: { total: 8, booked: 7 }, vadodara: { total: 6, booked: 4 } },
  { time: "8:30 PM", surat: { total: 8, booked: 8 }, vadodara: { total: 6, booked: 5 } },
  { time: "10:00 PM", surat: { total: 8, booked: 2 }, vadodara: { total: 6, booked: 1 } },
]

const upcomingReminders = [
  { type: "anniversary", customer: "Rahul Sharma", date: "Jan 25", icon: Heart },
  { type: "birthday", customer: "Kavya Mehta", date: "Jan 28", icon: Cake },
  { type: "followup", customer: "Vikram Singh", date: "Today", icon: Phone },
]

const statusColors = {
  confirmed: "bg-emerald-500",
  pending: "bg-amber-500",
  cancelled: "bg-red-500",
}

const paymentColors = {
  paid: "text-emerald-600",
  partial: "text-amber-600",
  pending: "text-red-600",
}

export default function DashboardPage() {
  const [selectedOutlet, setSelectedOutlet] = useState("all")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening at Friends Factory today.
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
            <SelectTrigger className="w-[140px]">
              <Building className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Outlets</SelectItem>
              <SelectItem value="surat">Surat</SelectItem>
              <SelectItem value="vadodara">Vadodara</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <Link href="/protected/bookings">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Link>
          </Button>
        </div>
      </div>

      {/* Full Width Booking Calendar */}
      <FullWidthCalendar />

      {/* Today's Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.bookings}</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +2 from yesterday
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{todayStats.revenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +15% from yesterday
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.leads}</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +3 from yesterday
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.conversions}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              33% conversion rate
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Today's Bookings */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today's Bookings</CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/protected/bookings">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayBookings.map((booking) => (
              <div 
                key={booking.id} 
                className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="w-16 text-center">
                  <p className="font-bold text-sm">{booking.time}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{booking.customer}</p>
                    <Badge variant="outline" className="text-xs">
                      {booking.outlet}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{booking.package}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={statusColors[booking.status as keyof typeof statusColors]}>
                    {booking.status}
                  </Badge>
                  <span className={`text-xs font-medium ${paymentColors[booking.payment as keyof typeof paymentColors]}`}>
                    {booking.payment === "paid" ? "₹ Paid" : booking.payment === "partial" ? "₹ Partial" : "₹ Due"}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          {/* Slot Availability */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Today's Slot Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {slotAvailability.map((slot) => {
                const suratPercentage = (slot.surat.booked / slot.surat.total) * 100
                const vadodaraPercentage = (slot.vadodara.booked / slot.vadodara.total) * 100
                
                return (
                  <div key={slot.time} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{slot.time}</span>
                      <div className="flex gap-4 text-xs">
                        <span className={suratPercentage === 100 ? "text-red-500" : "text-muted-foreground"}>
                          Surat: {slot.surat.total - slot.surat.booked} left
                        </span>
                        <span className={vadodaraPercentage === 100 ? "text-red-500" : "text-muted-foreground"}>
                          Vadodara: {slot.vadodara.total - slot.vadodara.booked} left
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Progress 
                        value={suratPercentage} 
                        className={`h-2 flex-1 ${suratPercentage === 100 ? '[&>div]:bg-red-500' : suratPercentage >= 75 ? '[&>div]:bg-amber-500' : ''}`}
                      />
                      <Progress 
                        value={vadodaraPercentage} 
                        className={`h-2 flex-1 ${vadodaraPercentage === 100 ? '[&>div]:bg-red-500' : vadodaraPercentage >= 75 ? '[&>div]:bg-amber-500' : ''}`}
                      />
                    </div>
                  </div>
                )
              })}
              <Button variant="link" className="w-full p-0 h-auto text-sm" asChild>
                <Link href="/protected/calendar">View Full Calendar →</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Reminders */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {upcomingReminders.map((reminder, index) => {
                const Icon = reminder.icon
                return (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      reminder.type === "anniversary" ? "bg-pink-100 text-pink-600" :
                      reminder.type === "birthday" ? "bg-purple-100 text-purple-600" :
                      "bg-blue-100 text-blue-600"
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{reminder.customer}</p>
                      <p className="text-xs text-muted-foreground capitalize">{reminder.type}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {reminder.date}
                    </Badge>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>New enquiries requiring follow-up</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/protected/leads">
                View All Leads
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {recentLeads.map((lead) => (
              <Card key={lead.id} className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {lead.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.time}</p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        lead.status === "new" ? "border-blue-500 text-blue-500" :
                        lead.status === "contacted" ? "border-amber-500 text-amber-500" :
                        "border-emerald-500 text-emerald-500"
                      }
                    >
                      {lead.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="flex items-center gap-1 text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {lead.phone}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{lead.source}</span>
                      <Badge variant="secondary" className="text-xs">{lead.occasion}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 h-7 text-xs text-green-600">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Link href="/protected/bookings">
          <Card className="cursor-pointer hover:border-primary transition-colors h-full">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Plus className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium">New Booking</p>
                <p className="text-xs text-muted-foreground">Create reservation</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/protected/leads">
          <Card className="cursor-pointer hover:border-primary transition-colors h-full">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Add Lead</p>
                <p className="text-xs text-muted-foreground">Log new enquiry</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/protected/invoices">
          <Card className="cursor-pointer hover:border-primary transition-colors h-full">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <IndianRupee className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="font-medium">Record Payment</p>
                <p className="text-xs text-muted-foreground">Collect & receipt</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/protected/marketing">
          <Card className="cursor-pointer hover:border-primary transition-colors h-full">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Send Campaign</p>
                <p className="text-xs text-muted-foreground">WhatsApp blast</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
