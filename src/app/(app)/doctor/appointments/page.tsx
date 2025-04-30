import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import AppointmentsList from "./appointments-list"
import { getDoctorAppointments, type Appointment } from "@/actions/doctor/doctor-appointment.actions"

// Server component to fetch appointments
export default async function AppointmentsPage() {
    const appointments = await getDoctorAppointments()
    const pendingAppointments = appointments.filter((appointment) => appointment.status === "pending")

    const handledAppointments = appointments.filter(
        (appointment) => appointment.status === "completed" || appointment.status === "rejected",
    )

    return (
        <div className="container py-6">
            <h1 className="text-3xl font-bold mb-6">Appointments</h1>

            <Tabs defaultValue="pending" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="pending">Pending Appointments</TabsTrigger>
                    <TabsTrigger value="handled">Handled Appointments</TabsTrigger>
                </TabsList>

                <TabsContent value="pending">
                    <Suspense
                        fallback={
                            <div className="flex justify-center">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        }
                    >
                        <AppointmentsList appointments={pendingAppointments} showActions={true} />
                    </Suspense>
                </TabsContent>

                <TabsContent value="handled">
                    <Suspense
                        fallback={
                            <div className="flex justify-center">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        }
                    >
                        <AppointmentsList appointments={handledAppointments} showActions={false} />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </div>
    )
}