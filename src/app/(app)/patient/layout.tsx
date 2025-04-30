import type React from "react"
import { Toaster } from "@/components/ui/sonner"
import { PatientNavbar } from "@/components/patient-navbar"
import { PatientProfile } from "@/components/patient-profile"
import { getPatientData } from "@/lib/data"

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch patient data server-side
  const patientData = await getPatientData()

  return (
    <div className="min-h-screen bg-background">
      <PatientNavbar />
      <main className="container mx-auto px-4 py-6">
        <PatientProfile patient={patientData} />
        <div className="mt-6">{children}</div>
      </main>
      <Toaster />
    </div>
  )
}
