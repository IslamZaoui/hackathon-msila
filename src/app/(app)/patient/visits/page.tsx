import { getPatientVisits } from "@/actions/patient/patient-appointments.actions"
import { format } from "date-fns"
import { Calendar, FileText, Pill, User } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Doctor {
  id: string
  name: string
  email: string
  phone: string | null
  country: string | null
  specialization: string | null
}

interface Prescription {
  id: string
  appointmentId: string
  createdAt: Date
  updatedAt: Date
}

interface Analysis {
  id: string
  appointmentId: string
  createdAt: Date
  updatedAt: Date
}

interface Visit {
  id: string
  date: Date
  status: string
  doctor: Doctor
  prescription: Prescription | null
  Analysis: Analysis | null
}

export default async function PatientVisitsPage() {
  const visits = await getPatientVisits() as Visit[]

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">My Medical Visits</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visits.map((visit) => (
          <Card key={visit.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Visit</span>
                <Badge variant="outline">
                  {format(new Date(visit.date), "MMM d, yyyy")}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Dr. {visit.doctor.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {format(new Date(visit.date), "EEEE, MMMM d, yyyy")}
                  </span>
                </div>
                {visit.prescription && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Pill className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Prescription</span>
                    </div>
                    <div className="ml-6 text-sm">
                      Prescription ID: {visit.prescription.id}
                    </div>
                  </div>
                )}
                {visit.Analysis && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Analysis</span>
                    </div>
                    <div className="ml-6 text-sm">
                      Analysis ID: {visit.Analysis.id}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
