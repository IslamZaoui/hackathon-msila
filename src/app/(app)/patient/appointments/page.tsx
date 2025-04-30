import { getPatientAppointments } from "@/actions/patient/patient-appointments.actions"
import { format } from "date-fns"
import { Calendar, Clock, User } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function PatientAppointmentsPage() {
  const appointments = await getPatientAppointments()

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">My Appointments</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Appointment</span>
                <Badge variant="outline">
                  {format(new Date(appointment.date), "MMM d, yyyy")}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Dr. {appointment.doctor.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {format(new Date(appointment.date), "EEEE, MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {format(new Date(appointment.date), "h:mm a")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
