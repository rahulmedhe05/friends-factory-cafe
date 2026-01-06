"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { 
  MapPin,
  Clock,
  Users,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
  Plus,
  Phone,
  Calendar as CalendarIcon,
  X
} from "lucide-react"

// Mock booking data by date
const bookingsByDate: Record<string, Array<{
  id: string
  time: string
  customer: string
  package: string
  outlet: string
  status: "confirmed" | "pending" | "cancelled"
  amount: number
  guests: number
}>> = {
  "2026-01-07": [
    { id: "BK001", time: "4:00 PM", customer: "Rahul Sharma", package: "Candlelight Dinner Premium", outlet: "Surat", status: "confirmed", amount: 5499, guests: 2 },
    { id: "BK002", time: "5:30 PM", customer: "Priya Patel", package: "Romantic Proposal", outlet: "Vadodara", status: "confirmed", amount: 7999, guests: 2 },
    { id: "BK003", time: "7:00 PM", customer: "Amit Verma", package: "Anniversary Special", outlet: "Surat", status: "confirmed", amount: 4999, guests: 2 },
    { id: "BK004", time: "8:30 PM", customer: "Vikram Singh", package: "Birthday Bash", outlet: "Surat", status: "pending", amount: 3999, guests: 4 },
  ],
  "2026-01-08": [
    { id: "BK005", time: "5:30 PM", customer: "Neha Gupta", package: "Candlelight Dinner Basic", outlet: "Vadodara", status: "confirmed", amount: 2999, guests: 2 },
    { id: "BK006", time: "7:00 PM", customer: "Arjun Nair", package: "Anniversary Special", outlet: "Surat", status: "pending", amount: 4999, guests: 2 },
  ],
  "2026-01-09": [
    { id: "BK007", time: "4:00 PM", customer: "Simran Kaur", package: "Birthday Celebration", outlet: "Surat", status: "confirmed", amount: 4499, guests: 6 },
    { id: "BK008", time: "5:30 PM", customer: "Kavya Mehta", package: "Romantic Proposal", outlet: "Vadodara", status: "confirmed", amount: 7999, guests: 2 },
    { id: "BK009", time: "7:00 PM", customer: "Rohan Shah", package: "Candlelight Dinner Premium", outlet: "Surat", status: "confirmed", amount: 5499, guests: 2 },
  ],
  "2026-01-10": [
    { id: "BK010", time: "7:00 PM", customer: "Ananya Desai", package: "Anniversary Special", outlet: "Vadodara", status: "confirmed", amount: 4999, guests: 2 },
    { id: "BK011", time: "8:30 PM", customer: "Vivek Patel", package: "Candlelight Dinner Basic", outlet: "Surat", status: "pending", amount: 2999, guests: 2 },
  ],
  "2026-01-11": [
    { id: "BK012", time: "5:30 PM", customer: "Meera Singh", package: "Birthday Bash", outlet: "Surat", status: "confirmed", amount: 3999, guests: 4 },
    { id: "BK013", time: "7:00 PM", customer: "Raj Kumar", package: "Romantic Proposal", outlet: "Vadodara", status: "confirmed", amount: 7999, guests: 2 },
    { id: "BK014", time: "8:30 PM", customer: "Pooja Sharma", package: "Candlelight Dinner Premium", outlet: "Surat", status: "confirmed", amount: 5499, guests: 2 },
  ],
  "2026-01-12": [
    { id: "BK015", time: "4:00 PM", customer: "Sanjay Mehta", package: "Anniversary Special", outlet: "Surat", status: "confirmed", amount: 4999, guests: 2 },
    { id: "BK016", time: "5:30 PM", customer: "Ritu Agarwal", package: "Candlelight Dinner Basic", outlet: "Vadodara", status: "confirmed", amount: 2999, guests: 2 },
    { id: "BK017", time: "7:00 PM", customer: "Deepak Gupta", package: "Birthday Celebration", outlet: "Surat", status: "pending", amount: 4499, guests: 6 },
    { id: "BK018", time: "8:30 PM", customer: "Nisha Patel", package: "Romantic Proposal", outlet: "Vadodara", status: "confirmed", amount: 7999, guests: 2 },
  ],
  "2026-01-14": [
    { id: "BK019", time: "5:30 PM", customer: "Priya Sharma", package: "Premium Rooftop Experience", outlet: "Surat", status: "confirmed", amount: 5499, guests: 2 },
  ],
  "2026-01-15": [
    { id: "BK020", time: "7:00 PM", customer: "Rahul Patel", package: "Proposal Setup", outlet: "Vadodara", status: "pending", amount: 7999, guests: 2 },
  ],
  "2026-01-16": [
    { id: "BK021", time: "8:30 PM", customer: "Anjali Mehta", package: "Birthday Celebration", outlet: "Surat", status: "confirmed", amount: 4499, guests: 4 },
  ],
}

const statusColors = {
  confirmed: "bg-emerald-500",
  pending: "bg-amber-500",
  cancelled: "bg-red-500",
}

const statusBadgeColors = {
  confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
}

// Helper functions
const formatDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getBookingsForDate = (date: Date, outlet: string = "all") => {
  const dateKey = formatDateKey(date)
  const bookings = bookingsByDate[dateKey] || []
  if (outlet === "all") return bookings
  return bookings.filter(b => b.outlet === outlet)
}

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

interface FullWidthCalendarProps {
  className?: string
}

// Full Width Calendar with Popup
export function FullWidthCalendar({ className }: FullWidthCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date(2026, 0, 1))
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const [selectedOutlet, setSelectedOutlet] = React.useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date(2026, 0, 1))
  }

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(year, month, day)
    setSelectedDate(clickedDate)
    setIsDialogOpen(true)
  }

  const selectedDateBookings = selectedDate ? getBookingsForDate(selectedDate, selectedOutlet) : []
  const totalRevenue = selectedDateBookings.reduce((sum, b) => sum + b.amount, 0)

  // Generate calendar days
  const calendarDays = []
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Booking Calendar
            </CardTitle>
            <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
              <SelectTrigger className="w-[150px] h-9">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Outlets</SelectItem>
                <SelectItem value="Surat">Surat</SelectItem>
                <SelectItem value="Vadodara">Vadodara</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="w-40 text-center font-semibold text-lg">
              {monthNames[month]} {year}
            </div>
            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="h-10 flex items-center justify-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="h-24 bg-muted/20 rounded-lg" />
            }

            const date = new Date(year, month, day)
            const bookings = getBookingsForDate(date, selectedOutlet)
            const isToday = formatDateKey(date) === "2026-01-07"
            const hasBookings = bookings.length > 0
            const confirmedCount = bookings.filter(b => b.status === 'confirmed').length
            const pendingCount = bookings.filter(b => b.status === 'pending').length

            return (
              <div
                key={day}
                onClick={() => handleDateClick(day)}
                className={cn(
                  "h-24 p-2 rounded-lg border cursor-pointer transition-all hover:border-primary hover:shadow-md",
                  isToday ? "bg-primary/10 border-primary" : "bg-card border-border",
                  hasBookings && "ring-1 ring-primary/20"
                )}
              >
                <div className="flex items-start justify-between">
                  <span className={cn(
                    "text-sm font-medium",
                    isToday && "text-primary font-bold"
                  )}>
                    {day}
                  </span>
                  {hasBookings && (
                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                      {bookings.length}
                    </Badge>
                  )}
                </div>
                
                {/* Booking Preview */}
                {hasBookings && (
                  <div className="mt-1 space-y-1">
                    {bookings.slice(0, 2).map((booking) => (
                      <div
                        key={booking.id}
                        className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded truncate text-white",
                          statusColors[booking.status]
                        )}
                      >
                        {booking.time} - {booking.customer.split(' ')[0]}
                      </div>
                    ))}
                    {bookings.length > 2 && (
                      <div className="text-[10px] text-muted-foreground px-1">
                        +{bookings.length - 2} more
                      </div>
                    )}
                  </div>
                )}

                {/* Status Indicators */}
                {hasBookings && (
                  <div className="absolute bottom-1 right-1 flex gap-0.5">
                    {confirmedCount > 0 && (
                      <div className="w-2 h-2 rounded-full bg-emerald-500" title={`${confirmedCount} confirmed`} />
                    )}
                    {pendingCount > 0 && (
                      <div className="w-2 h-2 rounded-full bg-amber-500" title={`${pendingCount} pending`} />
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">Confirmed</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-muted-foreground">Pending</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-muted-foreground">Cancelled</span>
          </div>
        </div>
      </CardContent>

      {/* Booking Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between pr-8">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <span>
                  {selectedDate?.toLocaleDateString('en-IN', { 
                    weekday: 'long',
                    day: 'numeric', 
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              {selectedDateBookings.length > 0 && (
                <div className="flex gap-2">
                  <Badge className={statusBadgeColors.confirmed}>
                    {selectedDateBookings.filter(b => b.status === 'confirmed').length} confirmed
                  </Badge>
                  <Badge className={statusBadgeColors.pending}>
                    {selectedDateBookings.filter(b => b.status === 'pending').length} pending
                  </Badge>
                </div>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto">
            {selectedDateBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <CalendarIcon className="h-16 w-16 mb-4 opacity-30" />
                <p className="text-lg font-medium">No bookings for this date</p>
                <p className="text-sm mt-1">Click below to create a new booking</p>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  New Booking
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Summary */}
                <div className="grid grid-cols-3 gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedDateBookings.length}</p>
                    <p className="text-xs text-muted-foreground">Total Bookings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold flex items-center justify-center">
                      <IndianRupee className="h-5 w-5" />
                      {totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Expected Revenue</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedDateBookings.reduce((sum, b) => sum + b.guests, 0)}</p>
                    <p className="text-xs text-muted-foreground">Total Guests</p>
                  </div>
                </div>

                {/* Booking List */}
                <div className="space-y-2">
                  {selectedDateBookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className="flex items-center gap-4 p-4 bg-card border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className={cn("w-1.5 h-16 rounded-full shrink-0", statusColors[booking.status])} />
                      
                      <div className="w-20 text-center shrink-0">
                        <p className="text-lg font-bold">{booking.time}</p>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-base">{booking.customer}</p>
                          <Badge className={cn("text-xs", statusBadgeColors[booking.status])}>
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{booking.package}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {booking.outlet}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {booking.guests} guests
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right shrink-0">
                        <p className="text-lg font-bold flex items-center justify-end">
                          <IndianRupee className="h-4 w-4" />
                          {booking.amount.toLocaleString()}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {selectedDateBookings.length > 0 && (
            <div className="pt-4 border-t flex justify-between items-center">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Booking
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}

interface BookingCalendarProps {
  className?: string
  compact?: boolean
  showBookingList?: boolean
}

export function BookingCalendar({ 
  className, 
  compact = false,
  showBookingList = true 
}: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date(2026, 0, 7))
  const [selectedOutlet, setSelectedOutlet] = React.useState<string>("all")
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date(2026, 0, 1))

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const getBookingsForDate = (date: Date) => {
    const dateKey = formatDateKey(date)
    const bookings = bookingsByDate[dateKey] || []
    if (selectedOutlet === "all") return bookings
    return bookings.filter(b => b.outlet === selectedOutlet)
  }

  const selectedDateBookings = selectedDate ? getBookingsForDate(selectedDate) : []

  // Get dates with bookings for highlighting
  const datesWithBookings = Object.keys(bookingsByDate).map(dateStr => new Date(dateStr))

  return (
    <div className={cn("flex flex-col lg:flex-row gap-4", className)}>
      {/* Calendar */}
      <Card className={cn(compact ? "w-full" : "lg:w-auto")}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Booking Calendar</CardTitle>
            <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
              <SelectTrigger className="w-[130px] h-8 text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Outlets</SelectItem>
                <SelectItem value="Surat">Surat</SelectItem>
                <SelectItem value="Vadodara">Vadodara</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="rounded-md"
            modifiers={{
              hasBookings: datesWithBookings,
            }}
            modifiersClassNames={{
              hasBookings: "relative font-bold after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full",
            }}
          />
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Has bookings</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-primary/20" />
              <span>Selected</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking List for Selected Date */}
      {showBookingList && (
        <Card className="flex-1 min-w-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {selectedDate ? (
                  <>
                    Bookings for {selectedDate.toLocaleDateString('en-IN', { 
                      weekday: 'short',
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </>
                ) : (
                  "Select a date"
                )}
              </CardTitle>
              {selectedDateBookings.length > 0 && (
                <Badge variant="secondary">
                  {selectedDateBookings.length} booking{selectedDateBookings.length > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            {selectedDateBookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No bookings for this date</p>
                <Button variant="outline" size="sm" className="mt-2">
                  + Add Booking
                </Button>
              </div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {selectedDateBookings.map((booking) => (
                  <div 
                    key={booking.id}
                    className="flex items-center gap-3 p-2.5 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="w-14 text-center shrink-0">
                      <p className="text-xs font-bold">{booking.time}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">{booking.customer}</p>
                        <Badge className={cn("text-[10px] px-1.5 py-0", statusColors[booking.status])}>
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{booking.package}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-0.5">
                          <MapPin className="h-3 w-3" />
                          {booking.outlet}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Users className="h-3 w-3" />
                          {booking.guests}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <IndianRupee className="h-3 w-3" />
                          {booking.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Compact version for dashboard
export function CompactBookingCalendar({ className }: { className?: string }) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date(2026, 0, 7))
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date(2026, 0, 1))

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const getBookingsForDate = (date: Date) => {
    const dateKey = formatDateKey(date)
    return bookingsByDate[dateKey] || []
  }

  const selectedDateBookings = selectedDate ? getBookingsForDate(selectedDate) : []
  const datesWithBookings = Object.keys(bookingsByDate).map(dateStr => new Date(dateStr))

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Quick Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          className="rounded-md [--cell-size:--spacing(7)]"
          modifiers={{
            hasBookings: datesWithBookings,
          }}
          modifiersClassNames={{
            hasBookings: "relative font-bold after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full",
          }}
        />
        
        {/* Selected date summary */}
        {selectedDate && (
          <div className="mt-2 pt-2 border-t">
            <p className="text-xs text-muted-foreground mb-1">
              {selectedDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
            </p>
            {selectedDateBookings.length === 0 ? (
              <p className="text-xs text-muted-foreground">No bookings</p>
            ) : (
              <div className="space-y-1">
                {selectedDateBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between text-xs">
                    <span className="font-medium truncate">{booking.time}</span>
                    <span className="text-muted-foreground truncate ml-2">{booking.customer}</span>
                  </div>
                ))}
                {selectedDateBookings.length > 3 && (
                  <p className="text-xs text-muted-foreground">+{selectedDateBookings.length - 3} more</p>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
