"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Coffee, 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Package,
  Receipt,
  Settings,
  BarChart3,
  MessageCircle,
  UserPlus,
  Menu,
  ChevronDown,
  MapPin,
  Clock
} from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const sidebarItems = [
  { name: "Dashboard", href: "/protected/dashboard", icon: LayoutDashboard },
  { name: "Leads & Enquiries", href: "/protected/leads", icon: UserPlus },
  { name: "Bookings", href: "/protected/bookings", icon: ClipboardList },
  { name: "Customers", href: "/protected/customers", icon: Users },
  { name: "Packages", href: "/protected/packages", icon: Package },
  { name: "Invoices", href: "/protected/invoices", icon: Receipt },
  { name: "Marketing", href: "/protected/marketing", icon: MessageCircle },
  { name: "Analytics", href: "/protected/analytics", icon: BarChart3 },
]

const settingsItems = [
  { name: "General Settings", href: "/protected/settings" },
  { name: "Outlets", href: "/protected/settings/outlets" },
  { name: "Time Slots", href: "/protected/settings/slots" },
  { name: "Tables & Zones", href: "/protected/settings/tables" },
  { name: "Templates", href: "/protected/settings/templates" },
]

export function CRMSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(pathname.startsWith("/protected/settings"))

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/protected" className="flex items-center gap-3">
          <Coffee className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-primary tracking-tight">Friends Factory</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href === "/protected/dashboard" && pathname === "/protected")
          return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        )})}

        {/* Settings with submenu */}
        <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <div className="flex items-center gap-3">
              <Settings className="h-4 w-4" />
              Settings
            </div>
            <ChevronDown className={cn("h-4 w-4 transition-transform", settingsOpen && "rotate-180")} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 pt-1 space-y-1">
            {settingsItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </nav>

      <div className="border-t p-4">
        <div className="rounded-lg bg-primary/5 p-3">
          <p className="text-xs text-muted-foreground">Quick Search</p>
          <p className="text-xs text-muted-foreground mt-1">Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">⌘K</kbd> to search</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r md:block">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed left-4 top-3 z-[60] md:hidden" aria-label="Toggle Menu">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
