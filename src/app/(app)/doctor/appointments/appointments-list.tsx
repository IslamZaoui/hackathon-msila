"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { type Appointment } from "@/actions/doctor/doctor-appointment.actions"
import { toast } from "sonner"
import { rejectAppointment } from "@/actions/doctor/doctor-appointment.actions"

interface AppointmentsListProps {
    appointments: Appointment[]
    showActions: boolean
}

export default function AppointmentsList({ appointments, showActions }: AppointmentsListProps) {
    const router = useRouter()
    const [localAppointments, setLocalAppointments] = useState<Appointment[]>(appointments)

    const handleReject = async (id: string) => {
        try {
            await rejectAppointment(id)
            setLocalAppointments(
                localAppointments.map((appointment) =>
                    appointment.id === id ? { ...appointment, status: "rejected" } : appointment,
                ),
            )
            toast.success("Appointment rejected successfully")
        } catch (error) {
            console.error("Error rejecting appointment:", error)
            toast.error("Failed to reject appointment")
        }
    }

    const handleAccept = (id: string) => {
        router.push(`/doctor/consultations/${id}`)
    }

    if (localAppointments.length === 0) {
        return <p className="text-center text-muted-foreground py-8">No appointments found.</p>
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {localAppointments.map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                    <span className="text-lg font-medium">
                                        {appointment.patient.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-medium">{appointment.patient.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(appointment.date).toLocaleDateString()} at{" "}
                                        {new Date(appointment.date).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-3">
                                <Badge
                                    variant={
                                        appointment.status === "completed"
                                            ? "default"
                                            : appointment.status === "rejected"
                                                ? "destructive"
                                                : "outline"
                                    }
                                >
                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </Badge>
                                <span className="text-sm">{appointment.patient.phone}</span>
                            </div>

                            {showActions && appointment.status === "pending" && (
                                <div className="flex gap-2 mt-4">
                                    <Button 
                                        className="flex-1" 
                                        onClick={() => handleAccept(appointment.id)}
                                    >
                                        <Check className="mr-2 h-4 w-4" /> Accept
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => handleReject(appointment.id)}
                                    >
                                        <X className="mr-2 h-4 w-4" /> Reject
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
