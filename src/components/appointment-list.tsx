import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Appointment } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface AppointmentListProps {
  appointments: Appointment[]
}

export function AppointmentList({ appointments }: AppointmentListProps) {
  if (appointments.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
        <p className="text-sm text-muted-foreground">No appointments found</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {appointments.map((appointment) => (
        <Card key={appointment.id}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{appointment.doctorName}</h3>
                <Badge
                  variant={
                    appointment.status === "accepted"
                      ? "default"
                      : appointment.status === "rejected"
                        ? "destructive"
                        : "outline"
                  }
                >
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>
                  <span className="font-medium">Date:</span> {formatDate(appointment.dateTime)}
                </p>
                <p>
                  <span className="font-medium">Time:</span>{" "}
                  {new Date(appointment.dateTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  <span className="font-medium">Clinic:</span> {appointment.clinicName}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
