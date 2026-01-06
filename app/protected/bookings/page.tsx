"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FullWidthCalendar } from "@/components/booking-calendar"
import { 
  Plus, 
  Search, 
  Filter,
  Calendar,
  CalendarDays,
  Clock,
  Users,
  MapPin,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  AlertCircle,
  IndianRupee
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const mockBookings = [
  {
    id: "1",
    booking_number: "FF-2026-001",
    customer_name: "Priya Sharma",
    customer_phone: "+91 98765 43210",
    outlet: "Surat",
    booking_date: "2026-01-14",
    time_slot: "Sunset Romance (5:00 PM - 7:00 PM)",
    table_zone: "Rooftop R1",
    experience_type: "candlelight",
    package_name: "Premium Rooftop Experience",
    number_of_people: 2,
    full_amount: 5499,
    payment_status: "paid",
    booking_status: "confirmed",
    decor_ready: true,
    kitchen_ready: false,
    table_setup_status: "pending",
  },
  {
    id: "2",
    booking_number: "FF-2026-002",
    customer_name: "Rahul Patel",
    customer_phone: "+91 87654 32109",
    outlet: "Vadodara",
    booking_date: "2026-01-15",
    time_slot: "Dinner Classic (7:30 PM - 9:30 PM)",
    table_zone: "Private Cabana C1",
    experience_type: "proposal",
    package_name: "Proposal Setup",
    number_of_people: 2,
    full_amount: 7999,
    payment_status: "payment_link_sent",
    booking_status: "pending",
    decor_ready: false,
    kitchen_ready: false,
    table_setup_status: "pending",
  },
  {
    id: "3",
    booking_number: "FF-2026-003",
    customer_name: "Anjali Mehta",
    customer_phone: "+91 76543 21098",
    outlet: "Surat",
    booking_date: "2026-01-16",
    time_slot: "Late Night (10:00 PM - 12:00 AM)",
    table_zone: "Garden G1",
    experience_type: "birthday",
    package_name: "Birthday Celebration",
    number_of_people: 4,
    full_amount: 4499,
    payment_status: "paid",
    booking_status: "confirmed",
    decor_ready: true,
    kitchen_ready: true,
    table_setup_status: "ready",
  },
  {
    id: "4",
    booking_number: "FF-2026-004",
    customer_name: "Vikram Singh",
    customer_phone: "+91 65432 10987",
    outlet: "Surat",
    booking_date: "2026-01-07",
    time_slot: "Sunset Romance (5:00 PM - 7:00 PM)",
    table_zone: "Rooftop R2",
    experience_type: "anniversary",
    package_name: "Anniversary Special",
    number_of_people: 2,
    full_amount: 4999,
    payment_status: "paid",
    booking_status: "completed",
    decor_ready: true,
    kitchen_ready: true,
    table_setup_status: "ready",
  },
]

const bookingStatusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
  on_hold: { label: "On Hold", color: "bg-orange-100 text-orange-800", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  completed: { label: "Completed", color: "bg-blue-100 text-blue-800", icon: CheckCircle2 },
  no_show: { label: "No Show", color: "bg-red-100 text-red-800", icon: XCircle },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-800", icon: XCircle },
  rescheduled: { label: "Rescheduled", color: "bg-purple-100 text-purple-800", icon: Calendar },
}

const paymentStatusConfig: Record<string, { label: string; color: string }> = {
  unpaid: { label: "Unpaid", color: "bg-red-100 text-red-800" },
  payment_link_sent: { label: "Link Sent", color: "bg-yellow-100 text-yellow-800" },
  partial: { label: "Partial", color: "bg-orange-100 text-orange-800" },
  paid: { label: "Paid", color: "bg-green-100 text-green-800" },
}

const occasionEmoji: Record<string, string> = {
  candlelight: "🕯️",
  birthday: "🎂",
  anniversary: "💑",
  proposal: "💍",
  private_celebration: "🎉",
  other: "✨",
}

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("upcoming")
  const [bookings] = useState(mockBookings)

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.booking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer_phone.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || booking.booking_status === statusFilter
    return matchesSearch && matchesStatus
  })

  const todayBookings = bookings.filter(b => b.booking_date === "2026-01-07")
  const confirmedBookings = bookings.filter(b => b.booking_status === "confirmed")
  const pendingPayment = bookings.filter(b => b.payment_status !== "paid")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">Manage all reservations and bookings</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today&apos;s Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayBookings.length}</div>
            <p className="text-xs text-muted-foreground">7 Jan 2026</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{confirmedBookings.length}</div>
            <p className="text-xs text-muted-foreground">Ready to serve</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingPayment.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Week Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <IndianRupee className="h-5 w-5" />
              22,996
            </div>
            <p className="text-xs text-muted-foreground">From confirmed bookings</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone or booking ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="no_show">No Show</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[180px]">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="tomorrow">Tomorrow</SelectItem>
            <SelectItem value="this_week">This Week</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="past">Past</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings Table */}
      <Tabs defaultValue="table">
        <TabsList>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="cards">Card View</TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarDays className="mr-2 h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="operations">Operations Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-4">
          <FullWidthCalendar />
        </TabsContent>

        <TabsContent value="table" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.booking_number}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {booking.outlet}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.customer_name}</p>
                          <p className="text-xs text-muted-foreground">{booking.customer_phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(booking.booking_date).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short'
                            })}
                          </p>
                          <p className="text-xs text-muted-foreground">{booking.time_slot.split('(')[0]}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{occasionEmoji[booking.experience_type]}</span>
                          <div>
                            <p className="text-sm">{booking.package_name}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {booking.number_of_people} • {booking.table_zone}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium flex items-center">
                          <IndianRupee className="h-3 w-3" />
                          {booking.full_amount.toLocaleString()}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge className={paymentStatusConfig[booking.payment_status].color}>
                          {paymentStatusConfig[booking.payment_status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={bookingStatusConfig[booking.booking_status].color}>
                          {bookingStatusConfig[booking.booking_status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                            <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
                            <DropdownMenuItem>Record Payment</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Reschedule</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Cancel Booking</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        <span className="text-xl">{occasionEmoji[booking.experience_type]}</span>
                        {booking.booking_number}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{booking.package_name}</p>
                    </div>
                    <Badge className={bookingStatusConfig[booking.booking_status].color}>
                      {bookingStatusConfig[booking.booking_status].label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Customer</span>
                    <span className="font-medium">{booking.customer_name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">
                      {new Date(booking.booking_date).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">{booking.time_slot.split('(')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{booking.outlet} • {booking.table_zone}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t">
                    <Badge className={paymentStatusConfig[booking.payment_status].color}>
                      {paymentStatusConfig[booking.payment_status].label}
                    </Badge>
                    <span className="font-bold flex items-center">
                      <IndianRupee className="h-4 w-4" />
                      {booking.full_amount.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="operations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Operations Checklist - Today&apos;s Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead className="text-center">Décor Ready</TableHead>
                    <TableHead className="text-center">Kitchen Ready</TableHead>
                    <TableHead className="text-center">Table Setup</TableHead>
                    <TableHead className="text-center">Payment Verified</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.filter(b => b.booking_status === 'confirmed').map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.booking_number}</p>
                          <p className="text-sm text-muted-foreground">{booking.customer_name}</p>
                        </div>
                      </TableCell>
                      <TableCell>{booking.time_slot.split('(')[0]}</TableCell>
                      <TableCell>{booking.table_zone}</TableCell>
                      <TableCell className="text-center">
                        <Checkbox checked={booking.decor_ready} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox checked={booking.kitchen_ready} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={booking.table_setup_status === 'ready' ? 'default' : 'secondary'}>
                          {booking.table_setup_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox checked={booking.payment_status === 'paid'} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
