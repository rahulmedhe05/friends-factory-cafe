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
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  Search, 
  Plus, 
  FileText,
  Download,
  Send,
  Printer,
  Eye,
  MoreVertical,
  IndianRupee,
  CreditCard,
  Wallet,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Receipt,
  TrendingUp,
  Calendar,
  Filter,
  RefreshCcw,
  ExternalLink,
  Copy,
  Phone,
  Building
} from "lucide-react"
import Link from "next/link"

// Mock Invoice Data
const mockInvoices = [
  {
    id: "INV-2024-001",
    booking_id: "BK001",
    customer_name: "Rahul Sharma",
    customer_phone: "+91 98765 43210",
    outlet: "Surat",
    date: "2024-01-18",
    due_date: "2024-01-18",
    package: "Candlelight Dinner Premium",
    add_ons: ["Rose Decoration", "Live Guitar"],
    subtotal: 6999,
    add_ons_total: 2500,
    discount: 500,
    gst: 1620,
    total: 10619,
    paid: 10619,
    balance: 0,
    status: "paid",
    payment_method: "UPI",
  },
  {
    id: "INV-2024-002",
    booking_id: "BK002",
    customer_name: "Priya Patel",
    customer_phone: "+91 87654 32109",
    outlet: "Vadodara",
    date: "2024-01-17",
    due_date: "2024-01-17",
    package: "Romantic Proposal Setup",
    add_ons: ["Photographer 1hr", "Custom Cake"],
    subtotal: 12999,
    add_ons_total: 4500,
    discount: 0,
    gst: 3150,
    total: 20649,
    paid: 20649,
    balance: 0,
    status: "paid",
    payment_method: "Card",
  },
  {
    id: "INV-2024-003",
    booking_id: "BK003",
    customer_name: "Amit Verma",
    customer_phone: "+91 76543 21098",
    outlet: "Surat",
    date: "2024-01-19",
    due_date: "2024-01-19",
    package: "Anniversary Special",
    add_ons: ["Balloon Decoration"],
    subtotal: 8999,
    add_ons_total: 1500,
    discount: 1000,
    gst: 1710,
    total: 11209,
    paid: 5000,
    balance: 6209,
    status: "partial",
    payment_method: "Cash",
  },
  {
    id: "INV-2024-004",
    booking_id: "BK004",
    customer_name: "Kavya Mehta",
    customer_phone: "+91 65432 10987",
    outlet: "Surat",
    date: "2024-01-20",
    due_date: "2024-01-20",
    package: "Birthday Bash",
    add_ons: ["Custom Cake", "Party Props"],
    subtotal: 5999,
    add_ons_total: 2000,
    discount: 0,
    gst: 1440,
    total: 9439,
    paid: 0,
    balance: 9439,
    status: "pending",
    payment_method: null,
  },
  {
    id: "INV-2024-005",
    booking_id: "BK005",
    customer_name: "Vikram Singh",
    customer_phone: "+91 54321 09876",
    outlet: "Vadodara",
    date: "2024-01-16",
    due_date: "2024-01-16",
    package: "Romantic Proposal Setup",
    add_ons: ["Rose Decoration", "Photographer 1hr", "Ring Box Setup"],
    subtotal: 12999,
    add_ons_total: 5800,
    discount: 1500,
    gst: 3114,
    total: 20413,
    paid: 20413,
    balance: 0,
    status: "paid",
    payment_method: "UPI",
  },
  {
    id: "INV-2024-006",
    booking_id: null,
    customer_name: "Walk-in Guest",
    customer_phone: "+91 99999 88888",
    outlet: "Surat",
    date: "2024-01-15",
    due_date: "2024-01-15",
    package: "Candlelight Dinner Basic",
    add_ons: [],
    subtotal: 3999,
    add_ons_total: 0,
    discount: 0,
    gst: 720,
    total: 4719,
    paid: 4719,
    balance: 0,
    status: "paid",
    payment_method: "Cash",
  },
]

// Mock Payment Transactions
const mockPayments = [
  {
    id: "PAY001",
    invoice_id: "INV-2024-001",
    customer_name: "Rahul Sharma",
    amount: 10619,
    method: "UPI",
    reference: "UPI/234567890123",
    date: "2024-01-18",
    time: "14:30",
    status: "success",
    outlet: "Surat",
  },
  {
    id: "PAY002",
    invoice_id: "INV-2024-002",
    customer_name: "Priya Patel",
    amount: 20649,
    method: "Card",
    reference: "HDFC****4523",
    date: "2024-01-17",
    time: "16:45",
    status: "success",
    outlet: "Vadodara",
  },
  {
    id: "PAY003",
    invoice_id: "INV-2024-003",
    customer_name: "Amit Verma",
    amount: 5000,
    method: "Cash",
    reference: "CASH-001",
    date: "2024-01-19",
    time: "11:00",
    status: "success",
    outlet: "Surat",
  },
  {
    id: "PAY004",
    invoice_id: "INV-2024-005",
    customer_name: "Vikram Singh",
    amount: 20413,
    method: "UPI",
    reference: "UPI/345678901234",
    date: "2024-01-16",
    time: "18:20",
    status: "success",
    outlet: "Vadodara",
  },
  {
    id: "PAY005",
    invoice_id: "INV-2024-006",
    customer_name: "Walk-in Guest",
    amount: 4719,
    method: "Cash",
    reference: "CASH-002",
    date: "2024-01-15",
    time: "20:00",
    status: "success",
    outlet: "Surat",
  },
]

const statusConfig = {
  paid: { label: "Paid", color: "bg-emerald-500 text-white", icon: CheckCircle2 },
  partial: { label: "Partial", color: "bg-amber-500 text-white", icon: Clock },
  pending: { label: "Pending", color: "bg-red-500 text-white", icon: AlertCircle },
  cancelled: { label: "Cancelled", color: "bg-gray-500 text-white", icon: XCircle },
  refunded: { label: "Refunded", color: "bg-purple-500 text-white", icon: RefreshCcw },
}

const paymentMethodIcons: Record<string, any> = {
  "UPI": Wallet,
  "Card": CreditCard,
  "Cash": IndianRupee,
}

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [outletFilter, setOutletFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("invoices")
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<typeof mockInvoices[0] | null>(null)

  // Filter invoices
  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer_phone.includes(searchQuery)
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    const matchesOutlet = outletFilter === "all" || invoice.outlet === outletFilter
    
    return matchesSearch && matchesStatus && matchesOutlet
  })

  // Filter payments
  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = 
      payment.invoice_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesOutlet = outletFilter === "all" || payment.outlet === outletFilter
    
    return matchesSearch && matchesOutlet
  })

  // Stats
  const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.paid, 0)
  const pendingAmount = mockInvoices.reduce((sum, inv) => sum + inv.balance, 0)
  const paidInvoices = mockInvoices.filter(inv => inv.status === "paid").length
  const pendingInvoices = mockInvoices.filter(inv => inv.status === "pending" || inv.status === "partial").length

  const openPaymentDialog = (invoice: typeof mockInvoices[0]) => {
    setSelectedInvoice(invoice)
    setShowPaymentDialog(true)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Invoices & Payments</h1>
          <p className="text-muted-foreground">
            Manage billing, collect payments, and track revenue
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">₹{pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              To be collected
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidInvoices}</div>
            <p className="text-xs text-muted-foreground">
              Fully paid
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingInvoices}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting payment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Payments
            </TabsTrigger>
          </TabsList>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-[200px]"
              />
            </div>
            {activeTab === "invoices" && (
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            )}
            <Select value={outletFilter} onValueChange={setOutletFilter}>
              <SelectTrigger className="w-[130px]">
                <Building className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Outlet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Outlets</SelectItem>
                <SelectItem value="Surat">Surat</SelectItem>
                <SelectItem value="Vadodara">Vadodara</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead className="hidden md:table-cell">Customer</TableHead>
                    <TableHead className="hidden lg:table-cell">Package</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right hidden sm:table-cell">Paid</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => {
                    const StatusIcon = statusConfig[invoice.status as keyof typeof statusConfig].icon
                    const PaymentIcon = invoice.payment_method ? paymentMethodIcons[invoice.payment_method] : null
                    
                    return (
                      <TableRow key={invoice.id} className="group">
                        <TableCell>
                          <div>
                            <p className="font-mono font-medium">{invoice.id}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(invoice.date).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div>
                            <p className="font-medium">{invoice.customer_name}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {invoice.customer_phone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div>
                            <p className="text-sm">{invoice.package}</p>
                            {invoice.add_ons.length > 0 && (
                              <p className="text-xs text-muted-foreground">
                                +{invoice.add_ons.length} add-on{invoice.add_ons.length > 1 ? 's' : ''}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <p className="font-bold">₹{invoice.total.toLocaleString()}</p>
                          {invoice.discount > 0 && (
                            <p className="text-xs text-emerald-600">-₹{invoice.discount} disc</p>
                          )}
                        </TableCell>
                        <TableCell className="text-right hidden sm:table-cell">
                          <div className="flex items-center justify-end gap-1">
                            {PaymentIcon && <PaymentIcon className="h-3 w-3 text-muted-foreground" />}
                            <span className={invoice.status === "paid" ? "text-emerald-600" : ""}>
                              ₹{invoice.paid.toLocaleString()}
                            </span>
                          </div>
                          {invoice.balance > 0 && (
                            <p className="text-xs text-red-500">₹{invoice.balance} due</p>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={statusConfig[invoice.status as keyof typeof statusConfig].color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig[invoice.status as keyof typeof statusConfig].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="h-4 w-4 mr-2" />
                                Print
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Send className="h-4 w-4 mr-2" />
                                Send to Customer
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Link
                              </DropdownMenuItem>
                              {(invoice.status === "pending" || invoice.status === "partial") && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-emerald-600"
                                    onClick={() => openPaymentDialog(invoice)}
                                  >
                                    <IndianRupee className="h-4 w-4 mr-2" />
                                    Record Payment
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead className="hidden md:table-cell">Customer</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="hidden lg:table-cell">Reference</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => {
                    const PaymentIcon = paymentMethodIcons[payment.method]
                    
                    return (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div>
                            <p className="font-mono text-sm">{payment.id}</p>
                            <p className="text-xs text-muted-foreground">
                              {payment.date} at {payment.time}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link 
                            href="#" 
                            className="font-mono text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            {payment.invoice_id}
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {payment.customer_name}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <PaymentIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{payment.method}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-bold text-emerald-600">
                          ₹{payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {payment.reference}
                          </code>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-emerald-500 text-white">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Success
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Record Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Record a payment for invoice {selectedInvoice?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4 py-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Customer</span>
                  <span className="font-medium">{selectedInvoice.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Invoice Total</span>
                  <span className="font-medium">₹{selectedInvoice.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Already Paid</span>
                  <span className="text-emerald-600">₹{selectedInvoice.paid.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Balance Due</span>
                  <span className="font-bold text-red-600">₹{selectedInvoice.balance.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Payment Amount</Label>
                  <Input 
                    type="number" 
                    placeholder={selectedInvoice.balance.toString()}
                    defaultValue={selectedInvoice.balance}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Payment Method</Label>
                  <Select defaultValue="upi">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upi">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-4 w-4" />
                          UPI
                        </div>
                      </SelectItem>
                      <SelectItem value="card">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Card
                        </div>
                      </SelectItem>
                      <SelectItem value="cash">
                        <div className="flex items-center gap-2">
                          <IndianRupee className="h-4 w-4" />
                          Cash
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Reference Number</Label>
                  <Input placeholder="Transaction ID or reference" />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowPaymentDialog(false)}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Preview Card (Quick Stats) */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment Methods Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { method: "UPI", amount: 51445, percentage: 63 },
                { method: "Cash", amount: 14938, percentage: 18 },
                { method: "Card", amount: 20649, percentage: 25 },
              ].map((item) => (
                <div key={item.method} className="flex items-center gap-4">
                  <div className="w-20 flex items-center gap-2">
                    {item.method === "UPI" && <Wallet className="h-4 w-4" />}
                    {item.method === "Cash" && <IndianRupee className="h-4 w-4" />}
                    {item.method === "Card" && <CreditCard className="h-4 w-4" />}
                    <span className="text-sm">{item.method}</span>
                  </div>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2" 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-24 text-right">
                    ₹{item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPayments.slice(0, 4).map((payment) => (
                <div key={payment.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{payment.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{payment.date} • {payment.method}</p>
                  </div>
                  <span className="text-sm font-bold text-emerald-600">
                    +₹{payment.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
