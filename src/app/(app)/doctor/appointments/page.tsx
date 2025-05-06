import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentsList from "./appointments-list";
import { getDoctorAppointments } from "@/actions/doctor/doctor-appointment.actions";

export default async function AppointmentsPage() {
  const appointments = await getDoctorAppointments();
  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "pending"
  );
  const handledAppointments = appointments.filter(
    (appointment) => appointment.status === "completed" || appointment.status === "rejected"
  );

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending Appointments</TabsTrigger>
          <TabsTrigger value="handled">Handled Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <AppointmentsList appointments={pendingAppointments} showActions={true} />
        </TabsContent>

        <TabsContent value="handled">
          <AppointmentsList appointments={handledAppointments} showActions={false} />
        </TabsContent>
      </Tabs>
    </div>
  );
}