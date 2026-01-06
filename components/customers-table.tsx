"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Customer {
  id: string
  name: string
  email: string | null
  phone: string | null
  total_visits: number
  loyalty_points: number
  created_at: string
}

export function CustomersTable() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("customers").select("*").order("created_at", { ascending: false })

    if (!error && data) {
      setCustomers(data)
    }
    setIsLoading(false)
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>View and search customer information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading customers...</div>
          ) : filteredCustomers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? "No customers found matching your search" : "No customers found"}
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left text-sm font-medium">Name</th>
                      <th className="p-3 text-left text-sm font-medium">Contact</th>
                      <th className="p-3 text-left text-sm font-medium">Visits</th>
                      <th className="p-3 text-left text-sm font-medium">Loyalty Points</th>
                      <th className="p-3 text-left text-sm font-medium">Member Since</th>
                      <th className="p-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b last:border-0">
                        <td className="p-3 font-medium">{customer.name}</td>
                        <td className="p-3 text-sm">
                          <div className="flex flex-col gap-1">
                            {customer.email && <span className="text-muted-foreground">{customer.email}</span>}
                            {customer.phone && <span className="text-muted-foreground">{customer.phone}</span>}
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="secondary">{customer.total_visits} visits</Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="bg-accent/10 text-accent-foreground">
                            {customer.loyalty_points} pts
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {new Date(customer.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/protected/customers/${customer.id}`}>View Details</Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
