"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Star,
  Clock,
  Users,
  IndianRupee,
  Edit,
  Trash2,
  Eye,
  Package,
  Sparkles
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mock data
const mockPackages = [
  {
    id: "1",
    name: "Classic Candlelight Dinner",
    short_description: "Intimate dinner with candles, roses, and special ambience",
    base_price: 2499,
    max_people: 2,
    duration_minutes: 120,
    experience_type: "candlelight",
    is_active: true,
    is_highlighted: true,
    bookings_count: 45,
    inclusions: ["Decorated table", "2 Mocktails", "3-course meal", "Background music", "Rose petals"],
  },
  {
    id: "2",
    name: "Premium Rooftop Experience",
    short_description: "Exclusive rooftop setup with premium décor and photographer",
    base_price: 4999,
    max_people: 2,
    duration_minutes: 150,
    experience_type: "candlelight",
    is_active: true,
    is_highlighted: true,
    bookings_count: 32,
    inclusions: ["Private rooftop", "Premium décor", "Photographer (30 mins)", "4-course meal", "Champagne mocktails", "Fairy lights"],
  },
  {
    id: "3",
    name: "Birthday Celebration",
    short_description: "Special birthday setup with cake, balloons, and decorations",
    base_price: 3499,
    max_people: 4,
    duration_minutes: 120,
    experience_type: "birthday",
    is_active: true,
    is_highlighted: false,
    bookings_count: 28,
    inclusions: ["Birthday décor", "Cake (500g)", "Balloon arch", "4 Mocktails", "3-course meal", "Birthday song"],
  },
  {
    id: "4",
    name: "Anniversary Special",
    short_description: "Celebrate your love story with roses, cake, and memories",
    base_price: 3999,
    max_people: 2,
    duration_minutes: 120,
    experience_type: "anniversary",
    is_active: true,
    is_highlighted: true,
    bookings_count: 22,
    inclusions: ["Rose bouquet", "Cake (500g)", "Photo frame", "2 Mocktails", "3-course meal", "Couple game"],
  },
  {
    id: "5",
    name: "Proposal Setup",
    short_description: "The perfect setting to pop the question",
    base_price: 5999,
    max_people: 2,
    duration_minutes: 180,
    experience_type: "proposal",
    is_active: true,
    is_highlighted: true,
    bookings_count: 15,
    inclusions: ["Premium décor", "Fairy lights tunnel", "Rose path", "Hidden photographer", "Ring holder setup", "Champagne", "4-course meal"],
  },
  {
    id: "6",
    name: "Private Cabana",
    short_description: "Exclusive private space for intimate celebrations",
    base_price: 6999,
    max_people: 4,
    duration_minutes: 180,
    experience_type: "private_celebration",
    is_active: true,
    is_highlighted: false,
    bookings_count: 12,
    inclusions: ["Private cabana", "Customizable décor", "Personal butler", "4-course meal", "4 Premium mocktails", "Music system access"],
  },
]

const mockAddOns = [
  { id: "1", name: "Rose Bouquet", price: 599, type: "decor", is_active: true, bookings: 89 },
  { id: "2", name: "Premium Cake (1kg)", price: 899, type: "food", is_active: true, bookings: 76 },
  { id: "3", name: "Flower Path Entry", price: 799, type: "decor", is_active: true, bookings: 45 },
  { id: "4", name: "Live Musician (30 mins)", price: 1999, type: "service", is_active: true, bookings: 23 },
  { id: "5", name: "Professional Photographer", price: 1499, type: "service", is_active: true, bookings: 56 },
  { id: "6", name: "Extra 30 Minutes", price: 499, type: "time", is_active: true, bookings: 34 },
  { id: "7", name: "Balloon Decoration", price: 699, type: "decor", is_active: true, bookings: 67 },
  { id: "8", name: "Special Mocktails (2)", price: 399, type: "food", is_active: true, bookings: 92 },
  { id: "9", name: "Fog Entry", price: 599, type: "decor", is_active: true, bookings: 28 },
  { id: "10", name: "Personalized Letter", price: 299, type: "service", is_active: true, bookings: 41 },
]

const experienceEmoji: Record<string, string> = {
  candlelight: "🕯️",
  birthday: "🎂",
  anniversary: "💑",
  proposal: "💍",
  private_celebration: "🎉",
}

const addOnTypeColors: Record<string, string> = {
  decor: "bg-pink-100 text-pink-800",
  food: "bg-orange-100 text-orange-800",
  service: "bg-blue-100 text-blue-800",
  time: "bg-green-100 text-green-800",
}

export default function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [packages] = useState(mockPackages)
  const [addOns] = useState(mockAddOns)

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredAddOns = addOns.filter(addon =>
    addon.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Packages & Add-ons</h1>
          <p className="text-muted-foreground">Manage your experience packages and add-on services</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Package
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search packages or add-ons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <Tabs defaultValue="packages">
        <TabsList>
          <TabsTrigger value="packages">
            <Package className="mr-2 h-4 w-4" />
            Packages ({packages.length})
          </TabsTrigger>
          <TabsTrigger value="addons">
            <Sparkles className="mr-2 h-4 w-4" />
            Add-ons ({addOns.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="packages" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className={pkg.is_highlighted ? "border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{experienceEmoji[pkg.experience_type]}</span>
                      {pkg.is_highlighted && (
                        <Badge variant="default" className="bg-primary">
                          <Star className="mr-1 h-3 w-3" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Package
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4" />
                          {pkg.is_highlighted ? "Remove from Featured" : "Mark as Featured"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.short_description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {pkg.duration_minutes} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Max {pkg.max_people}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {pkg.inclusions.slice(0, 4).map((item, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                    {pkg.inclusions.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{pkg.inclusions.length - 4} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-sm text-muted-foreground">
                      {pkg.bookings_count} bookings
                    </div>
                    <div className="text-xl font-bold flex items-center">
                      <IndianRupee className="h-4 w-4" />
                      {pkg.base_price.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Switch checked={pkg.is_active} />
                      <span className="text-sm text-muted-foreground">
                        {pkg.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="addons" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Add-on Services</CardTitle>
                <CardDescription>Extra services that can be added to any package</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Add-on Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAddOns.map((addon) => (
                    <TableRow key={addon.id}>
                      <TableCell className="font-medium">{addon.name}</TableCell>
                      <TableCell>
                        <Badge className={addOnTypeColors[addon.type]}>
                          {addon.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center">
                          <IndianRupee className="h-3 w-3" />
                          {addon.price}
                        </span>
                      </TableCell>
                      <TableCell>{addon.bookings}</TableCell>
                      <TableCell>
                        <Switch checked={addon.is_active} />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
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
      </Tabs>
    </div>
  )
}
