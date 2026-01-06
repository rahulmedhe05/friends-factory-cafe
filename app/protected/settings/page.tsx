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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { 
  Building2, 
  Clock, 
  Users, 
  Bell, 
  Shield, 
  FileText, 
  Plus,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Settings2,
  Save,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Percent,
  IndianRupee,
  Copy,
  RefreshCcw
} from "lucide-react"

// Mock Data
const mockOutlets = [
  {
    id: "OUT001",
    name: "Friends Factory - Surat",
    city: "Surat",
    address: "123 VIP Road, Vesu, Surat - 395007",
    phone: "+91 98765 43210",
    email: "surat@friendsfactory.cafe",
    manager: "Rajesh Kumar",
    status: "active",
    tables: 8,
    slots_per_day: 6,
    opening_time: "16:00",
    closing_time: "23:00",
  },
  {
    id: "OUT002",
    name: "Friends Factory - Vadodara",
    city: "Vadodara",
    address: "456 Alkapuri, Vadodara - 390007",
    phone: "+91 87654 32109",
    email: "vadodara@friendsfactory.cafe",
    manager: "Priya Sharma",
    status: "active",
    tables: 6,
    slots_per_day: 6,
    opening_time: "16:00",
    closing_time: "23:00",
  },
]

const mockTimeSlots = [
  { id: 1, name: "Afternoon Tea", start: "16:00", end: "17:30", active: true },
  { id: 2, name: "Early Evening", start: "17:30", end: "19:00", active: true },
  { id: 3, name: "Sunset Special", start: "19:00", end: "20:30", active: true },
  { id: 4, name: "Dinner Prime", start: "20:30", end: "22:00", active: true },
  { id: 5, name: "Late Night", start: "22:00", end: "23:30", active: false },
]

const mockUsers = [
  { id: 1, name: "Admin User", email: "admin@friendsfactory.cafe", role: "admin", outlet: "All", status: "active" },
  { id: 2, name: "Rajesh Kumar", email: "rajesh@friendsfactory.cafe", role: "manager", outlet: "Surat", status: "active" },
  { id: 3, name: "Priya Sharma", email: "priya@friendsfactory.cafe", role: "manager", outlet: "Vadodara", status: "active" },
  { id: 4, name: "Call Center Agent", email: "agent1@friendsfactory.cafe", role: "agent", outlet: "All", status: "active" },
]

const mockNotificationTemplates = [
  { id: 1, name: "Booking Confirmation", type: "whatsapp", trigger: "booking_confirmed", active: true },
  { id: 2, name: "Payment Reminder", type: "whatsapp", trigger: "payment_pending", active: true },
  { id: 3, name: "Day Before Reminder", type: "whatsapp", trigger: "1_day_before", active: true },
  { id: 4, name: "Feedback Request", type: "whatsapp", trigger: "after_visit", active: true },
  { id: 5, name: "Anniversary Wish", type: "whatsapp", trigger: "anniversary", active: true },
  { id: 6, name: "Birthday Wish", type: "whatsapp", trigger: "birthday", active: true },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("outlets")
  const [showAddOutlet, setShowAddOutlet] = useState(false)
  const [showAddUser, setShowAddUser] = useState(false)
  const [showAddSlot, setShowAddSlot] = useState(false)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure outlets, time slots, users, and system preferences
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="outlets" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Outlets
          </TabsTrigger>
          <TabsTrigger value="slots" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Time Slots
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users & Roles
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="policies" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Policies
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings2 className="h-4 w-4" />
            General
          </TabsTrigger>
        </TabsList>

        {/* Outlets Tab */}
        <TabsContent value="outlets" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Manage Outlets</h2>
            <Dialog open={showAddOutlet} onOpenChange={setShowAddOutlet}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Outlet
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New Outlet</DialogTitle>
                  <DialogDescription>Add a new cafe outlet location</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Outlet Name</Label>
                    <Input placeholder="Friends Factory - City" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>City</Label>
                      <Input placeholder="City name" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Manager</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select manager" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Assign later</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Address</Label>
                    <Textarea placeholder="Full address" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Phone</Label>
                      <Input placeholder="+91 98765 43210" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Email</Label>
                      <Input placeholder="outlet@friendsfactory.cafe" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Number of Tables</Label>
                      <Input type="number" placeholder="8" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Slots per Day</Label>
                      <Input type="number" placeholder="6" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Opening Time</Label>
                      <Input type="time" defaultValue="16:00" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Closing Time</Label>
                      <Input type="time" defaultValue="23:00" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddOutlet(false)}>Cancel</Button>
                  <Button onClick={() => setShowAddOutlet(false)}>Add Outlet</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {mockOutlets.map((outlet) => (
              <Card key={outlet.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{outlet.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {outlet.city}
                      </CardDescription>
                    </div>
                    <Badge variant={outlet.status === "active" ? "default" : "secondary"}>
                      {outlet.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">{outlet.address}</div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {outlet.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {outlet.email.split('@')[0]}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{outlet.tables}</p>
                      <p className="text-xs text-muted-foreground">Tables</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{outlet.slots_per_day}</p>
                      <p className="text-xs text-muted-foreground">Slots/Day</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{outlet.opening_time}</p>
                      <p className="text-sm font-medium">- {outlet.closing_time}</p>
                      <p className="text-xs text-muted-foreground">Hours</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Manager:</span> {outlet.manager}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Time Slots Tab */}
        <TabsContent value="slots" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Time Slot Configuration</h2>
            <Dialog open={showAddSlot} onOpenChange={setShowAddSlot}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Time Slot
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Time Slot</DialogTitle>
                  <DialogDescription>Create a new booking time slot</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Slot Name</Label>
                    <Input placeholder="e.g., Evening Special" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Start Time</Label>
                      <Input type="time" />
                    </div>
                    <div className="grid gap-2">
                      <Label>End Time</Label>
                      <Input type="time" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddSlot(false)}>Cancel</Button>
                  <Button onClick={() => setShowAddSlot(false)}>Add Slot</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Slot Name</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTimeSlots.map((slot) => {
                    const start = new Date(`2024-01-01 ${slot.start}`)
                    const end = new Date(`2024-01-01 ${slot.end}`)
                    const duration = (end.getTime() - start.getTime()) / (1000 * 60)
                    
                    return (
                      <TableRow key={slot.id}>
                        <TableCell className="font-medium">{slot.name}</TableCell>
                        <TableCell>{slot.start}</TableCell>
                        <TableCell>{slot.end}</TableCell>
                        <TableCell>{duration} mins</TableCell>
                        <TableCell className="text-center">
                          <Switch checked={slot.active} />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Slot Pricing Rules</CardTitle>
              <CardDescription>Configure pricing variations by time slot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Weekend Premium</p>
                  <p className="text-sm text-muted-foreground">Fri, Sat, Sun slots</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    <Percent className="h-3 w-3 mr-1" />
                    +20%
                  </Badge>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Dinner Prime Premium</p>
                  <p className="text-sm text-muted-foreground">8:30 PM - 10:00 PM</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    <Percent className="h-3 w-3 mr-1" />
                    +10%
                  </Badge>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">User Management</h2>
            <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Create a new user account</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Full Name</Label>
                    <Input placeholder="Enter name" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="user@friendsfactory.cafe" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="agent">Agent</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Outlet Access</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select outlet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Outlets</SelectItem>
                          <SelectItem value="surat">Surat</SelectItem>
                          <SelectItem value="vadodara">Vadodara</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddUser(false)}>Cancel</Button>
                  <Button onClick={() => setShowAddUser(false)}>Add User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Outlet Access</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.outlet}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={user.status === "active" ? "default" : "secondary"} className="bg-emerald-500">
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Role Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { role: "Admin", permissions: ["Full Access", "Settings", "Users", "Reports"] },
                  { role: "Manager", permissions: ["Bookings", "Customers", "Reports", "Staff"] },
                  { role: "Agent", permissions: ["Leads", "Bookings", "Customers", "Payments"] },
                  { role: "Staff", permissions: ["View Bookings", "Check-in", "Operations"] },
                ].map((item) => (
                  <div key={item.role} className="p-3 border rounded-lg">
                    <p className="font-medium mb-2">{item.role}</p>
                    <div className="space-y-1">
                      {item.permissions.map((perm) => (
                        <div key={perm} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          {perm}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Notification Templates</h2>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Template
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Trigger</TableHead>
                    <TableHead className="text-center">Active</TableHead>
                    <TableHead className="w-24"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockNotificationTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {template.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{template.trigger}</TableCell>
                      <TableCell className="text-center">
                        <Switch checked={template.active} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">WhatsApp Business API</CardTitle>
                <CardDescription>Configure your WhatsApp Business integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Connection Status</p>
                      <p className="text-xs text-muted-foreground">Last synced 5 mins ago</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500">Connected</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Email Settings</CardTitle>
                <CardDescription>Configure email notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">SMTP Status</p>
                      <p className="text-xs text-muted-foreground">noreply@friendsfactory.cafe</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500">Active</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings2 className="h-4 w-4 mr-2" />
                  Configure SMTP
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Policies Tab */}
        <TabsContent value="policies" className="mt-4 space-y-4">
          <h2 className="text-lg font-semibold">Business Policies</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" />
                  Payment Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Full Payment Required</p>
                    <p className="text-sm text-muted-foreground">100% advance to confirm booking</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="grid gap-2">
                  <Label>Minimum Advance (%)</Label>
                  <Select defaultValue="100">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50%</SelectItem>
                      <SelectItem value="75">75%</SelectItem>
                      <SelectItem value="100">100%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4" />
                  Cancellation Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>48+ hours before</span>
                    <Badge variant="outline">100% refund</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>24-48 hours before</span>
                    <Badge variant="outline">50% refund</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Less than 24 hours</span>
                    <Badge variant="outline">No refund</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Edit Policy
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Booking Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label>Minimum advance booking</Label>
                    <Select defaultValue="2">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Maximum advance booking</Label>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  Tax Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label>GST Rate</Label>
                    <Select defaultValue="18">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="12">12%</SelectItem>
                        <SelectItem value="18">18%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Prices inclusive of tax</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* General Tab */}
        <TabsContent value="general" className="mt-4 space-y-4">
          <h2 className="text-lg font-semibold">General Settings</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Business Name</Label>
                  <Input defaultValue="Friends Factory Cafe" />
                </div>
                <div className="grid gap-2">
                  <Label>GSTIN</Label>
                  <Input defaultValue="24AABCT1234F1ZH" />
                </div>
                <div className="grid gap-2">
                  <Label>Support Email</Label>
                  <Input defaultValue="support@friendsfactory.cafe" />
                </div>
                <div className="grid gap-2">
                  <Label>Support Phone</Label>
                  <Input defaultValue="+91 98765 00000" />
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Integrations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                      <Globe className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Website Widget</p>
                      <p className="text-xs text-muted-foreground">Embed booking form</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#E1306C">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Instagram</p>
                      <p className="text-xs text-muted-foreground">Lead tracking</p>
                    </div>
                  </div>
                  <Badge variant="outline">Connect</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#4285F4">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Google Analytics</p>
                      <p className="text-xs text-muted-foreground">Track conversions</p>
                    </div>
                  </div>
                  <Badge variant="outline">Connect</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
