"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Calendar, FileText } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Appointment } from "@prisma/client"

interface PatientConsultationsProps {
    appointments: (Appointment & {
        prescription: {
            prescriptionMedication: {
                id: string
                medication: string
                duration: string
                dosage: string
                instructions: string
            }[]
        } | null
        Analysis: {
            analysisResult: {
                id: string
                name: string
                result: string
            }[]
        } | null
    })[]
}

export default function PatientConsultations({ appointments }: PatientConsultationsProps) {
    const [expandedAppointments, setExpandedAppointments] = useState<Set<string>>(new Set())

    const toggleAppointment = (id: string) => {
        setExpandedAppointments((prev) => {
            const next = new Set(prev)
            if (next.has(id)) {
                next.delete(id)
            } else {
                next.add(id)
            }
            return next
        })
    }

    if (appointments.length === 0) {
        return <p className="text-center text-muted-foreground py-8">No appointments found.</p>
    }

    return (
        <div className="space-y-4">
            {appointments.map((appointment) => (
                <Card key={appointment.id}>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span className="font-medium">{formatDate(appointment.date.toLocaleDateString())}</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleAppointment(appointment.id)}
                            >
                                {expandedAppointments.has(appointment.id) ? (
                                    <ChevronUp className="h-4 w-4" />
                                ) : (
                                    <ChevronDown className="h-4 w-4" />
                                )}
                            </Button>
                        </div>

                        {expandedAppointments.has(appointment.id) && (
                            <div className="mt-4 space-y-4">
                                {appointment.description && (
                                    <div className="flex items-start gap-2">
                                        <FileText className="h-4 w-4 mt-0.5" />
                                        <p className="text-sm">{appointment.description}</p>
                                    </div>
                                )}

                                {appointment.prescription && (
                                    <div className="space-y-2">
                                        <h4 className="font-medium text-sm">Prescription</h4>
                                        {appointment.prescription.prescriptionMedication.map((med) => (
                                            <div key={med.id} className="text-sm pl-6">
                                                <p className="font-medium">{med.medication}</p>
                                                <p className="text-muted-foreground">Dosage: {med.dosage}</p>
                                                <p className="text-muted-foreground">Duration: {med.duration}</p>
                                                <p className="text-muted-foreground">Instructions: {med.instructions}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {appointment.Analysis && (
                                    <div className="space-y-2">
                                        <h4 className="font-medium text-sm">Analysis Results</h4>
                                        {appointment.Analysis.analysisResult.map((result) => (
                                            <div key={result.id} className="text-sm pl-6">
                                                <p className="font-medium">{result.name}</p>
                                                <p className="text-muted-foreground">Result: {result.result}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
