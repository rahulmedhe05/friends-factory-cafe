"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown,
  IndianRupee,
  Users,
  Calendar,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Gift,
  Heart,
  Cake,
  Sparkles,
  Clock,
  MapPin,
  Phone,
  Building
} from "lucide-react"

// Mock Analytics Data
const revenueByMonth = [
  { month: "Aug", revenue: 185000 },
  { month: "Sep", revenue: 220000 },
  { month: "Oct", revenue: 275000 },
  { month: "Nov", revenue: 310000 },
  { month: "Dec", revenue: 425000 },
  { month: "Jan", revenue: 380000 },
]

const bookingsByPackage = [
  { name: "Candlelight Dinner Premium", bookings: 45, revenue: 314955, percentage: 32 },
  { name: "Romantic Proposal Setup", bookings: 28, revenue: 363972, percentage: 26 },
  { name: "Anniversary Special", bookings: 35, revenue: 314965, percentage: 22 },
  { name: "Birthday Bash", bookings: 22, revenue: 131978, percentage: 12 },
  { name: "Candlelight Dinner Basic", bookings: 18, revenue: 71982, percentage: 8 },
]

const leadSourceAnalytics = [
  { source: "Instagram", leads: 120, conversions: 48, rate: 40, color: "bg-pink-500" },
  { source: "Google", leads: 85, conversions: 28, rate: 33, color: "bg-blue-500" },
  { source: "Facebook", leads: 65, conversions: 18, rate: 28, color: "bg-indigo-500" },
  { source: "Referral", leads: 45, conversions: 22, rate: 49, color: "bg-emerald-500" },
  { source: "Walk-in", leads: 30, conversions: 15, rate: 50, color: "bg-amber-500" },
  { source: "WhatsApp", leads: 55, conversions: 20, rate: 36, color: "bg-green-500" },
]

const outletPerformance = [
  { 
    outlet: "Surat", 
    bookings: 98, 
    revenue: 785000, 
    avgBookingValue: 8010,
    occupancy: 78,
    topPackage: "Candlelight Dinner Premium"
  },
  { 
    outlet: "Vadodara", 
    bookings: 50, 
    revenue: 412000, 
    avgBookingValue: 8240,
    occupancy: 65,
    topPackage: "Romantic Proposal Setup"
  },
]

const staffPerformance = [
  { name: "Rajesh Kumar", role: "Manager", bookings: 45, revenue: 382500, rating: 4.8 },
  { name: "Priya Sharma", role: "Manager", bookings: 38, revenue: 312000, rating: 4.6 },
  { name: "Agent 1", role: "Call Center", bookings: 32, revenue: 256000, rating: 4.5 },
  { name: "Agent 2", role: "Call Center", bookings: 28, revenue: 224000, rating: 4.3 },
]

const occasionBreakdown = [
  { occasion: "Anniversary", icon: Heart, bookings: 52, percentage: 35, color: "text-pink-500" },
  { occasion: "Birthday", icon: Cake, bookings: 38, percentage: 26, color: "text-purple-500" },
  { occasion: "Proposal", icon: Gift, bookings: 28, percentage: 19, color: "text-red-500" },
  { occasion: "Date Night", icon: Star, bookings: 18, percentage: 12, color: "text-amber-500" },
  { occasion: "Other", icon: Sparkles, bookings: 12, percentage: 8, color: "text-blue-500" },
]

const timeSlotPerformance = [
  { slot: "4:00 PM - 5:30 PM", bookings: 18, occupancy: 45 },
  { slot: "5:30 PM - 7:00 PM", bookings: 28, occupancy: 70 },
  { slot: "7:00 PM - 8:30 PM", bookings: 38, occupancy: 95 },
  { slot: "8:30 PM - 10:00 PM", bookings: 42, occupancy: 100 },
  { slot: "10:00 PM - 11:30 PM", bookings: 22, occupancy: 55 },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d")
  const [selectedOutlet, setSelectedOutlet] = useState("all")

  // Summary stats
  const totalRevenue = 1197000
  const totalBookings = 148
  const avgBookingValue = Math.round(totalRevenue / totalBookings)
  const conversionRate = 37
  const repeatCustomerRate = 28

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Track performance, revenue, and insights across your outlets
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>
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
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalRevenue/100000).toFixed(1)}L</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +22% from last period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +18% from last period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Booking Value</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{avgBookingValue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +5% from last period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <div className="flex items-center text-xs text-emerald-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +3% from last period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repeat Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{repeatCustomerRate}%</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              -2% from last period
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Trend */}
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Revenue Trend
            </CardTitle>
            <CardDescription>Monthly revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueByMonth.map((item, index) => {
                const maxRevenue = Math.max(...revenueByMonth.map(r => r.revenue))
                const percentage = (item.revenue / maxRevenue) * 100
                const isCurrentMonth = index === revenueByMonth.length - 1
                
                return (
                  <div key={item.month} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium">{item.month}</div>
                    <div className="flex-1">
                      <div className="h-8 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isCurrentMonth ? 'bg-primary' : 'bg-primary/60'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-24 text-right font-medium">
                      ₹{(item.revenue/1000).toFixed(0)}k
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Occasion Breakdown */}
        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Bookings by Occasion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {occasionBreakdown.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.occasion} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center`}>
                      <Icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{item.occasion}</span>
                        <span className="text-sm text-muted-foreground">{item.bookings}</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                    <div className="w-12 text-right text-sm font-medium">
                      {item.percentage}%
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="packages">
        <TabsList>
          <TabsTrigger value="packages">By Package</TabsTrigger>
          <TabsTrigger value="sources">Lead Sources</TabsTrigger>
          <TabsTrigger value="outlets">Outlets</TabsTrigger>
          <TabsTrigger value="slots">Time Slots</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>

        {/* Package Performance */}
        <TabsContent value="packages" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Package Performance</CardTitle>
              <CardDescription>Revenue and booking breakdown by experience package</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package</TableHead>
                    <TableHead className="text-center">Bookings</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-center">Share</TableHead>
                    <TableHead className="w-[200px]">Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingsByPackage.map((pkg) => (
                    <TableRow key={pkg.name}>
                      <TableCell className="font-medium">{pkg.name}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{pkg.bookings}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ₹{pkg.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">{pkg.percentage}%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={pkg.percentage} className="h-2 flex-1" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lead Sources */}
        <TabsContent value="sources" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Source Analysis</CardTitle>
              <CardDescription>Conversion rates by lead acquisition channel</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-center">Total Leads</TableHead>
                    <TableHead className="text-center">Conversions</TableHead>
                    <TableHead className="text-center">Conversion Rate</TableHead>
                    <TableHead className="w-[200px]">Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leadSourceAnalytics.map((source) => (
                    <TableRow key={source.source}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${source.color}`} />
                          <span className="font-medium">{source.source}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{source.leads}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{source.conversions}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant="outline" 
                          className={source.rate >= 40 ? "text-emerald-600 border-emerald-600" : ""}
                        >
                          {source.rate}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Progress value={source.rate} className="h-2" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Outlet Performance */}
        <TabsContent value="outlets" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {outletPerformance.map((outlet) => (
              <Card key={outlet.outlet}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {outlet.outlet}
                    </CardTitle>
                    <Badge variant="outline">{outlet.occupancy}% occupancy</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{outlet.bookings}</p>
                      <p className="text-xs text-muted-foreground">Bookings</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">₹{(outlet.revenue/1000).toFixed(0)}k</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">₹{outlet.avgBookingValue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Avg. Value</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Occupancy Rate</p>
                    <Progress value={outlet.occupancy} className="h-3" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Top Package:</span>
                    <Badge variant="secondary">{outlet.topPackage}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Time Slot Analysis */}
        <TabsContent value="slots" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Time Slot Performance
              </CardTitle>
              <CardDescription>Booking distribution and occupancy by time slot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeSlotPerformance.map((slot) => (
                  <div key={slot.slot} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-40 font-medium text-sm">{slot.slot}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-muted-foreground">Occupancy</span>
                        <span className="text-sm font-medium">{slot.occupancy}%</span>
                      </div>
                      <Progress 
                        value={slot.occupancy} 
                        className={`h-3 ${slot.occupancy === 100 ? '[&>div]:bg-emerald-500' : slot.occupancy >= 80 ? '[&>div]:bg-amber-500' : ''}`}
                      />
                    </div>
                    <div className="text-center w-24">
                      <p className="text-xl font-bold">{slot.bookings}</p>
                      <p className="text-xs text-muted-foreground">bookings</p>
                    </div>
                    {slot.occupancy === 100 && (
                      <Badge className="bg-emerald-500">Sold Out</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Staff Performance */}
        <TabsContent value="staff" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Performance</CardTitle>
              <CardDescription>Individual performance metrics for team members</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-center">Bookings</TableHead>
                    <TableHead className="text-right">Revenue Generated</TableHead>
                    <TableHead className="text-center">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffPerformance.map((staff, index) => (
                    <TableRow key={staff.name}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {index === 0 && <span className="text-amber-500">🏆</span>}
                          <span className="font-medium">{staff.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{staff.role}</Badge>
                      </TableCell>
                      <TableCell className="text-center">{staff.bookings}</TableCell>
                      <TableCell className="text-right font-medium">
                        ₹{staff.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{staff.rating}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Insights */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Top Insight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              <strong>Proposal packages</strong> have the highest average order value at ₹12,999+. 
              Consider promoting this during peak proposal seasons (Feb, Dec).
            </p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-amber-700 dark:text-amber-300 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Opportunity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              <strong>4:00-5:30 PM slot</strong> has only 45% occupancy. 
              Consider offering "Happy Hour" discounts to boost afternoon bookings.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Action Item
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              <strong>Referral</strong> channel has 49% conversion rate! 
              Launch a referral program to incentivize existing customers.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
