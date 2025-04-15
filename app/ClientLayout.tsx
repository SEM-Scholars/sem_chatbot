"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutGrid,
  Settings,
  Users,
  SettingsIcon as Functions,
  Layers,
  Eye,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Menu,
  X,
} from "lucide-react"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [historyCollapsed, setHistoryCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Check if screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // Auto-collapse sidebar on mobile
      if (mobile && !sidebarCollapsed) {
        setSidebarCollapsed(true)
      }

      // Auto-collapse history on smaller screens
      if (window.innerWidth < 1024 && !historyCollapsed) {
        setHistoryCollapsed(true)
      }

      // Close mobile menu when resizing to desktop
      if (!mobile && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [sidebarCollapsed, historyCollapsed, mobileMenuOpen])

  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div
          className={cn(
            "border-r bg-muted/10 transition-all duration-300 z-10 flex flex-col",
            sidebarCollapsed ? "w-16" : "w-64",
          )}
        >
          <div className="p-4 border-b flex items-center justify-between h-16 shrink-0">
            <div className={cn("flex items-center gap-2", sidebarCollapsed && "justify-center")}>
              <div className="h-6 w-6 rounded-full bg-primary" />
              {!sidebarCollapsed && <span className="font-semibold">SEM Scholars</span>}
            </div>
          </div>
          <ScrollArea className="flex-grow">
            <div className="space-y-4 p-4">
              <nav className="space-y-2">
                <Button
                  variant="ghost"
                  className={cn("w-full", sidebarCollapsed ? "justify-center px-0" : "justify-start")}
                >
                  <LayoutGrid className={cn("h-4 w-4", !sidebarCollapsed && "mr-2")} />
                  {!sidebarCollapsed && "Tasks"}
                </Button>
                <Button
                  variant="ghost"
                  className={cn("w-full", sidebarCollapsed ? "justify-center px-0" : "justify-start")}
                >
                  <Functions className={cn("h-4 w-4", !sidebarCollapsed && "mr-2")} />
                  {!sidebarCollapsed && "Functions"}
                </Button>
                <Button
                  variant="ghost"
                  className={cn("w-full", sidebarCollapsed ? "justify-center px-0" : "justify-start")}
                >
                  <Layers className={cn("h-4 w-4", !sidebarCollapsed && "mr-2")} />
                  {!sidebarCollapsed && "Integrations"}
                </Button>
                <Button
                  variant="ghost"
                  className={cn("w-full", sidebarCollapsed ? "justify-center px-0" : "justify-start")}
                >
                  <Users className={cn("h-4 w-4", !sidebarCollapsed && "mr-2")} />
                  {!sidebarCollapsed && "Users"}
                </Button>
                <Button
                  variant="ghost"
                  className={cn("w-full", sidebarCollapsed ? "justify-center px-0" : "justify-start")}
                >
                  <Settings className={cn("h-4 w-4", !sidebarCollapsed && "mr-2")} />
                  {!sidebarCollapsed && "Settings"}
                </Button>
              </nav>
              <div className="pt-4 border-t">
                <Button
                  variant="ghost"
                  className={cn("w-full", sidebarCollapsed ? "justify-center px-0" : "justify-start")}
                >
                  <Eye className={cn("h-4 w-4", !sidebarCollapsed && "mr-2")} />
                  {!sidebarCollapsed && "Live preview"}
                </Button>
                <Button
                  variant="ghost"
                  className={cn("w-full", sidebarCollapsed ? "justify-center px-0" : "justify-start")}
                >
                  <BarChart2 className={cn("h-4 w-4", !sidebarCollapsed && "mr-2")} />
                  {!sidebarCollapsed && "Performance"}
                </Button>
              </div>
            </div>
          </ScrollArea>

          {/* Desktop User section at bottom */}
          <div className="p-4 border-t shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn("w-full h-auto py-2", sidebarCollapsed ? "justify-center px-0" : "justify-start")}
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">JD</AvatarFallback>
                  </Avatar>
                  {!sidebarCollapsed && (
                    <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-lg" side="right" align="end" sideOffset={4}>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-lg">JD</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck className="mr-2 h-4 w-4" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {/* Mobile Menu (Hamburger) */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between h-16 shrink-0">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary" />
              <span className="font-semibold">SEM Scholars</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <ScrollArea className="flex-grow">
            <div className="space-y-4 p-4">
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  Tasks
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Functions className="h-4 w-4 mr-2" />
                  Functions
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Layers className="h-4 w-4 mr-2" />
                  Integrations
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </nav>
              <div className="pt-4 border-t">
                <Button variant="ghost" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Live preview
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Performance
                </Button>
              </div>
            </div>
          </ScrollArea>

          {/* Mobile User section at bottom */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Sparkles className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <BadgeCheck className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              {isMobile ? (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-md"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-md"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
              )}
            </div>
            {!isMobile && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-md"
                  onClick={() => setHistoryCollapsed(!historyCollapsed)}
                >
                  {historyCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </header>
          {children}
        </div>

        {/* Right Panel - Conversation History (desktop only) */}
        {!isMobile && !historyCollapsed && (
          <div className="border-l w-80 shrink-0 flex flex-col overflow-hidden">
            <div className="h-16 border-b px-4 flex items-center justify-between shrink-0">
              <h2 className="font-medium">Conversation history</h2>
            </div>
            <ScrollArea className="flex-grow">
              <div className="p-4 space-y-4">
                {/* Sample conversation history items */}
                {["Customer inquiry", "Product support", "Billing question"].map((title, i) => (
                  <div key={i} className="p-3 bg-muted/50 rounded-lg flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium">{title}</h3>
                      <p className="text-xs text-muted-foreground">Today, {i + 1}:30 PM</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  )
}

