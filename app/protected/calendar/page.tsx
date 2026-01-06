"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, 
  ChevronRight,
  Plus,
  MapPin,
  Clock,
  Users
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Mock data for calendar
const mockSlots = [
  { id: "1", name: "Lunch Special", time: "12:00 PM - 2:00 PM" },
  { id: "2", name: "Afternoon Delight", time: "2:30 PM - 4:30 PM" },
  { id: "3", name: "Sunset Romance", time: "5:00 PM - 7:00 PM" },
  { id: "4", name: "Dinner Classic", time: "7:30 PM - 9:30 PM" },
  { id: "5", name: "Late Night", time: "10:00 PM - 12:00 AM" },
]

const mockBookingsCalendar: Record<string, Record<string, { status: string; customer: string; type: string }[]>> = {
  "2026-01-07": {
    "3": [{ status: "completed", customer: "Vikram S.", type: "anniversary" }],
  },
  "2026-01-08": {
    "2": [{ status: "confirmed", customer: "Meera P.", type: "candlelight" }],
    "4": [{ status: "confirmed", customer: "Arjun K.", type: "birthday" }],
  },
  "2026-01-10": {
    "3": [{ status: "confirmed", customer: "Neha S.", type: "proposal" }],
    "4": [{ status: "confirmed", customer: "Rohan M.", type: "candlelight" }],
    "5": [{ status: "on_hold", customer: "Amit J.", type: "anniversary" }],
  },
  "2026-01-14": {
    "1": [{ status: "confirmed", customer: "Priya S.", type: "candlelight" }],
    "2": [{ status: "confirmed", customer: "Ravi T.", type: "candlelight" }],
    "3": [{ status: "confirmed", customer: "Kavya N.", type: "proposal" }],
    "4": [{ status: "confirmed", customer: "Deepak R.", type: "candlelight" }],
    "5": [{ status: "confirmed", customer: "Ananya M.", type: "anniversary" }],
  },
  "2026-01-15": {
    "3": [{ status: "pending", customer: "Rahul P.", type: "proposal" }],
  },
  "2026-01-16": {
    "5": [{ status: "confirmed", customer: "Anjali M.", type: "birthday" }],
  },
}

const statusColors: Record<string, string> = {
  available: "bg-green-100 hover:bg-green-200 border-green-300",
  confirmed: "bg-blue-100 border-blue-300",
  pending: "bg-yellow-100 border-yellow-300",
  on_hold: "bg-orange-100 border-orange-300",
  completed: "bg-gray-100 border-gray-300",
}

const occasionEmoji: Record<string, string> = {
  candlelight: "🕯️",
  birthday: "🎂",
  anniversary: "💑",
  proposal: "💍",
  private_celebration: "🎉",
  other: "✨",
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 7))
  const [selectedOutlet, setSelectedOutlet] = useState("surat")
  const [viewMode, setViewMode] = useState<"week" | "day">("week")

  const getWeekDates = (date: Date) => {
    const start = new Date(date)
    start.setDate(start.getDate() - start.getDay())
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      return d
    })
  }

  const weekDates = getWeekDates(currentDate)

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const navigateWeek = (direction: number) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + (direction * 7))
    setCurrentDate(newDate)
  }

  const isToday = (date: Date) => {
    const today = new Date(2026, 0, 7)
    return date.toDateString() === today.toDateString()
  }

  const getSlotBookings = (date: Date, slotId: string) => {
    const dateKey = formatDateKey(date)
    return mockBookingsCalendar[dateKey]?.[slotId] || []
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Booking Calendar</h1>
          <p className="text-muted-foreground">Visual overview of all slots and bookings</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
            <SelectTrigger className="w-[180px]">
              <MapPin className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="surat">Surat</SelectItem>
              <SelectItem value="vadodara">Vadodara</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Block Slot
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateWeek(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateWeek(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle>
                {weekDates[0].toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </CardTitle>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-green-100 border border-green-300" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-blue-100 border border-blue-300" />
                  <span>Confirmed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-yellow-100 border border-yellow-300" />
                  <span>Pending</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-orange-100 border border-orange-300" />
                  <span>On Hold</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setCurrentDate(new Date(2026, 0, 7))}
              >
                Today
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Row - Days */}
              <div className="grid grid-cols-8 gap-1 mb-2">
                <div className="p-2 text-sm font-medium text-muted-foreground">
                  <Clock className="h-4 w-4" />
                </div>
                {weekDates.map((date, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "p-2 text-center rounded-lg",
                      isToday(date) && "bg-primary text-primary-foreground"
                    )}
                  >
                    <p className="text-xs font-medium">
                      {date.toLocaleDateString('en-IN', { weekday: 'short' })}
                    </p>
                    <p className="text-lg font-bold">
                      {date.getDate()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Slot Rows */}
              {mockSlots.map((slot) => (
                <div key={slot.id} className="grid grid-cols-8 gap-1 mb-1">
                  {/* Slot Label */}
                  <div className="p-2 bg-muted rounded-lg">
                    <p className="text-xs font-medium">{slot.name}</p>
                    <p className="text-xs text-muted-foreground">{slot.time}</p>
                  </div>

                  {/* Day Cells */}
                  {weekDates.map((date, dateIndex) => {
                    const bookings = getSlotBookings(date, slot.id)
                    const hasBooking = bookings.length > 0
                    const booking = bookings[0]
                    
                    return (
                      <div
                        key={dateIndex}
                        className={cn(
                          "p-2 rounded-lg border-2 min-h-[70px] cursor-pointer transition-colors",
                          hasBooking 
                            ? statusColors[booking.status]
                            : statusColors.available
                        )}
                      >
                        {hasBooking ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <span className="text-sm">{occasionEmoji[booking.type]}</span>
                              <Badge variant="secondary" className="text-xs px-1">
                                {booking.status === 'confirmed' ? '✓' : booking.status === 'pending' ? '?' : '⏳'}
                              </Badge>
                            </div>
                            <p className="text-xs font-medium truncate">{booking.customer}</p>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <Plus className="h-4 w-4 text-muted-foreground opacity-50" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Confirmed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-full">
                <span className="text-xl">❤️</span>
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Valentine&apos;s Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Valentine's Week Alert */}
      <Card className="border-pink-200 bg-pink-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <span className="text-3xl">💕</span>
            <div className="flex-1">
              <h3 className="font-semibold text-pink-900">Valentine&apos;s Week Alert!</h3>
              <p className="text-sm text-pink-700 mt-1">
                High demand expected from Feb 7-14. Consider extending hours and adding extra tables.
                Currently <strong>5 bookings confirmed</strong> for Valentine&apos;s Day.
              </p>
            </div>
            <Button variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-100">
              View Feb Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
