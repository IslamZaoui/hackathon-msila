import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPatientAppointments } from "@/lib/data"
import { AppointmentList } from "@/components/appointment-list"

export default async function AppointmentsPage() {
  // Fetch appointments data server-side
  const appointments = await getPatientAppointments()

  // Filter appointments by status
  const pendingAppointments = appointments.filter((appointment) => appointment.status === "pending")
  const acceptedAppointments = appointments.filter((appointment) => appointment.status === "accepted")
  const rejectedAppointments = appointments.filter((appointment) => appointment.status === "rejected")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
      </div>
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending ({pendingAppointments.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({acceptedAppointments.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedAppointments.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-6">
          <AppointmentList appointments={pendingAppointments} />
        </TabsContent>
        <TabsContent value="accepted" className="mt-6">
          <AppointmentList appointments={acceptedAppointments} />
        </TabsContent>
        <TabsContent value="rejected" className="mt-6">
          <AppointmentList appointments={rejectedAppointments} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
