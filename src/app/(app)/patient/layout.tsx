"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Toaster } from "@/components/ui/sonner"
import { PatientNavbar } from "@/components/patient-navbar"
import { PatientProfile } from "@/components/patient-profile"
import { getUserAction, logoutAction } from "@/actions/auth.action"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [patient, setPatient] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchPatient = async () => {
      const userData = await getUserAction()
      if (!userData || userData.role !== "patient") {
        router.push("/signin")
        return
      }
      setPatient(userData)
    }
    fetchPatient()
  }, [router])

  const handleLogout = async () => {
    await logoutAction()
    router.push("/signin")
  }

  if (!patient) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <PatientNavbar onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-6">
        <PatientProfile patient={patient} />
        <div className="mt-6">{children}</div>
      </main>
      <Toaster />
    </div>
  )
}
