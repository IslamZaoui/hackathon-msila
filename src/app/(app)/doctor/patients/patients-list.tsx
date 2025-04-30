"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import { type DoctorPatient } from "@/actions/doctor/patient.actions"
import { formatDate } from "@/lib/utils"

interface PatientsListProps {
    patients: DoctorPatient[]
}

export default function PatientsList({ patients }: PatientsListProps) {
    const router = useRouter()

    if (patients.length === 0) {
        return <p className="text-center text-muted-foreground py-8">No patients found.</p>
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {patients.map((patient) => (
                <Card key={patient.id} className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                    <span className="text-lg font-medium">
                                        {patient.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-medium">{patient.name}</h3>
                                    <p className="text-sm text-muted-foreground">{patient.email}</p>
                                </div>
                            </div>

                            <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>Birth Date: {formatDate(patient.birthDate)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>Age: {new Date().getFullYear() - new Date(patient.birthDate).getFullYear()} years</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-3">
                                <Badge variant="outline">{patient.gender}</Badge>
                                <Badge variant="outline">{patient.bloodType}</Badge>
                            </div>

                            {patient.lastAppointment && (
                                <div className="text-sm text-muted-foreground mb-3">
                                    Last visit: {formatDate(patient.lastAppointment.date)}
                                </div>
                            )}

                            <Button 
                                className="w-full" 
                                onClick={() => router.push(`/doctor/patients/${patient.id}`)}
                            >
                                View Details
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
