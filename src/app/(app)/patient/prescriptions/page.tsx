import { getPatientPrescriptions } from "@/actions/patient/patient-appointments.actions"
import { format } from "date-fns"
import { Calendar, Pill, User } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function PatientPrescriptionsPage() {
  const prescriptions = await getPatientPrescriptions()

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">My Prescriptions</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Prescription</span>
                <Badge variant="outline">
                  {format(new Date(prescription.date), "MMM d, yyyy")}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Dr. {prescription.doctor.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {format(new Date(prescription.date), "EEEE, MMMM d, yyyy")}
                  </span>
                </div>
                {prescription.prescriptionMedication && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Pill className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Medications:</span>
                    </div>
                    <ul className="ml-6 list-disc space-y-1">
                      {prescription.prescriptionMedication.map((med) => (
                        <li key={med.id} className="text-sm">
                          {med.name} - {med.dosage}
                        </li>
                      ))}
                    </ul>
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
