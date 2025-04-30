"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PatientNavbarProps {
  onLogout: () => Promise<void>
}

export function PatientNavbar({ onLogout }: PatientNavbarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    { href: "/patient/appointments", label: "Appointments" },
    { href: "/patient/visits", label: "Visits" },
    { href: "/patient/prescriptions", label: "Prescriptions" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 flex items-center md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        <div className="mr-4 hidden md:flex">
          <Link href="/patient/appointments" className="text-lg font-semibold">
            Patient Dashboard
          </Link>
        </div>
        <div className="hidden flex-1 items-center space-x-4 md:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto">
          <Button variant="ghost" size="sm" onClick={onLogout} className="hidden md:flex">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="container pb-3 md:hidden">
          <div className="flex flex-col space-y-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href ? "text-foreground" : "text-muted-foreground",
                )}
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <Button variant="ghost" size="sm" onClick={onLogout} className="justify-start px-0">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
