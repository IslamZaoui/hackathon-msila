import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import AppointmentsList from "./appointments-list"

// Types for our appointments
export type Appointment = {
    id: string
    patientId: string
    patientName: string
    patientImage: string
    date: string
    time: string
    status: "pending" | "accepted" | "rejected"
    phoneNumber: string
}

// Server component to fetch appointments
export default async function AppointmentsPage() {
    // Fetch appointments from API
    const appointments = await fetchAppointments()

    // Group appointments by status
    const pendingAppointments = appointments.filter((appointment) => appointment.status === "pending")

    const handledAppointments = appointments.filter(
        (appointment) => appointment.status === "accepted" || appointment.status === "rejected",
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

// Mock function to fetch appointments
async function fetchAppointments(): Promise<Appointment[]> {
    // In a real app, this would be an API call
    return [
        {
            id: "1",
            patientId: "p1",
            patientName: "John Doe",
            patientImage: "/placeholder.svg?height=40&width=40",
            date: "2025-05-01",
            time: "09:00 AM",
            status: "pending",
            phoneNumber: "+1 (555) 123-4567",
        },
        {
            id: "2",
            patientId: "p2",
            patientName: "Jane Smith",
            patientImage: "/placeholder.svg?height=40&width=40",
            date: "2025-05-02",
            time: "10:30 AM",
            status: "accepted",
            phoneNumber: "+1 (555) 987-6543",
        },
        {
            id: "3",
            patientId: "p3",
            patientName: "Robert Johnson",
            patientImage: "/placeholder.svg?height=40&width=40",
            date: "2025-05-03",
            time: "02:15 PM",
            status: "rejected",
            phoneNumber: "+1 (555) 456-7890",
        },
        {
            id: "4",
            patientId: "p4",
            patientName: "Emily Davis",
            patientImage: "/placeholder.svg?height=40&width=40",
            date: "2025-05-04",
            time: "11:45 AM",
            status: "pending",
            phoneNumber: "+1 (555) 234-5678",
        },
    ]
}
