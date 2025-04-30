"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import type { Appointment } from "./page"

interface AppointmentsListProps {
    appointments: Appointment[]
    showActions: boolean
}

export default function AppointmentsList({ appointments, showActions }: AppointmentsListProps) {
    const [localAppointments, setLocalAppointments] = useState<Appointment[]>(appointments)

    const handleStatusChange = (id: string, newStatus: "accepted" | "rejected") => {
        setLocalAppointments(
            localAppointments.map((appointment) =>
                appointment.id === id ? { ...appointment, status: newStatus } : appointment,
            ),
        )
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
                                <Image
                                    src={appointment.patientImage || "/placeholder.svg"}
                                    alt={appointment.patientName}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                                <div>
                                    <h3 className="font-medium">{appointment.patientName}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {appointment.date} at {appointment.time}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-3">
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
                                <span className="text-sm">{appointment.phoneNumber}</span>
                            </div>

                            {showActions && appointment.status === "pending" && (
                                <div className="flex gap-2 mt-4">
                                    <Button className="flex-1" onClick={() => handleStatusChange(appointment.id, "accepted")}>
                                        <Check className="mr-2 h-4 w-4" /> Accept
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => handleStatusChange(appointment.id, "rejected")}
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
