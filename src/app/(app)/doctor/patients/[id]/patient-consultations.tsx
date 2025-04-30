"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Calendar, FileText } from "lucide-react"
import type { Consultation } from "../../consultations/page"

interface PatientConsultationsProps {
    consultations: Consultation[]
}

export default function PatientConsultations({ consultations }: PatientConsultationsProps) {
    const [expandedConsultation, setExpandedConsultation] = useState<string | null>(null)

    const toggleConsultation = (id: string) => {
        setExpandedConsultation(expandedConsultation === id ? null : id)
    }

    if (consultations.length === 0) {
        return <p className="text-center text-muted-foreground py-8">No consultations found.</p>
    }

    return (
        <div className="space-y-4">
            {consultations.map((consultation) => (
                <Card key={consultation.id} className="overflow-hidden">
                    <CardContent className="p-0">
                        <div
                            className="p-4 cursor-pointer flex justify-between items-center"
                            onClick={() => toggleConsultation(consultation.id!)}
                        >
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <h4 className="font-medium">Consultation {consultation.id}</h4>
                                    <p className="text-sm text-muted-foreground">Price: ${consultation.price}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon">
                                {expandedConsultation === consultation.id ? (
                                    <ChevronUp className="h-5 w-5" />
                                ) : (
                                    <ChevronDown className="h-5 w-5" />
                                )}
                            </Button>
                        </div>

                        {expandedConsultation === consultation.id && (
                            <div className="p-4 pt-0 border-t">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <h5 className="font-medium">Report</h5>
                                            <p className="text-sm mt-1">{consultation.report}</p>
                                        </div>
                                    </div>

                                    {consultation.prescriptions.length > 0 && (
                                        <div>
                                            <h5 className="font-medium mb-2">Prescriptions</h5>
                                            <div className="space-y-2">
                                                {consultation.prescriptions.map((prescription) => (
                                                    <div key={prescription.id} className="bg-muted p-3 rounded-md text-sm">
                                                        <p className="font-medium">{prescription.medicationName}</p>
                                                        <div className="grid grid-cols-2 gap-2 mt-1">
                                                            <p>
                                                                <span className="text-muted-foreground">Dosage:</span> {prescription.dosage}
                                                            </p>
                                                            <p>
                                                                <span className="text-muted-foreground">Duration:</span> {prescription.duration}
                                                            </p>
                                                            <p className="col-span-2">
                                                                <span className="text-muted-foreground">Instructions:</span> {prescription.instructions}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
