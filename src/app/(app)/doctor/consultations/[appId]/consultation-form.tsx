"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { createReport } from "@/actions/doctor/doctor-appointment.actions"

interface ConsultationFormProps {
    appointmentId: string
    initialData?: {
        report: string
        price: string
        prescriptions: Prescription[]
    }
}

interface Prescription {
    id: string
    medicationName: string
    duration: string
    dosage: string
    instructions: string
}

export default function ConsultationForm({ appointmentId, initialData }: ConsultationFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState(
        initialData || {
            report: "",
            price: "",
            prescriptions: [],
        },
    )

    const handleAddPrescription = () => {
        const newPrescription: Prescription = {
            id: uuidv4(),
            medicationName: "",
            duration: "",
            dosage: "",
            instructions: "",
        }

        setFormData({
            ...formData,
            prescriptions: [...formData.prescriptions, newPrescription],
        })
    }

    const handleRemovePrescription = (id: string) => {
        setFormData({
            ...formData,
            prescriptions: formData.prescriptions.filter((p) => p.id !== id),
        })
    }

    const handlePrescriptionChange = (id: string, field: keyof Prescription, value: string) => {
        setFormData({
            ...formData,
            prescriptions: formData.prescriptions.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Validate price is a number
            const price = parseFloat(formData.price)
            if (isNaN(price)) {
                toast.error("Please enter a valid price")
                return
            }

            // Prepare medications data
            const medications = formData.prescriptions.map(p => ({
                medication: p.medicationName,
                duration: p.duration,
                dosage: p.dosage,
                instructions: p.instructions
            }))

            // Submit the report
            await createReport({
                appointmentId,
                price,
                description: formData.report,
                medications: medications.length > 0 ? medications : undefined
            })

            toast.success("Consultation saved successfully")
            router.push("/doctor/appointments")
        } catch (error) {
            console.error("Error saving consultation:", error)
            toast.error("Failed to save consultation")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="report">Report</Label>
                            <Textarea
                                id="report"
                                placeholder="Enter consultation report"
                                rows={5}
                                value={formData.report}
                                onChange={(e) => setFormData({ ...formData, report: e.target.value })}
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                placeholder="Enter consultation price"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                                disabled={isSubmitting}
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Prescriptions</h2>
                    <Button 
                        type="button" 
                        onClick={handleAddPrescription} 
                        variant="outline"
                        disabled={isSubmitting}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Prescription
                    </Button>
                </div>

                {formData.prescriptions.map((prescription, index) => (
                    <Card key={prescription.id} className="relative">
                        <CardContent className="pt-6 grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor={`medication-${index}`}>Medication Name</Label>
                                <Input
                                    id={`medication-${index}`}
                                    placeholder="Enter medication name"
                                    value={prescription.medicationName}
                                    onChange={(e) => handlePrescriptionChange(prescription.id, "medicationName", e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor={`duration-${index}`}>Duration</Label>
                                <Input
                                    id={`duration-${index}`}
                                    placeholder="Enter duration (e.g., 7 days)"
                                    value={prescription.duration}
                                    onChange={(e) => handlePrescriptionChange(prescription.id, "duration", e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor={`dosage-${index}`}>Dosage</Label>
                                <Input
                                    id={`dosage-${index}`}
                                    placeholder="Enter dosage (e.g., 10mg)"
                                    value={prescription.dosage}
                                    onChange={(e) => handlePrescriptionChange(prescription.id, "dosage", e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor={`instructions-${index}`}>Instructions</Label>
                                <Textarea
                                    id={`instructions-${index}`}
                                    placeholder="Enter instructions"
                                    value={prescription.instructions}
                                    onChange={(e) => handlePrescriptionChange(prescription.id, "instructions", e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 text-destructive"
                                onClick={() => handleRemovePrescription(prescription.id)}
                                disabled={isSubmitting}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Consultation"}
                </Button>
                <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => router.push("/doctor/appointments")}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
            </div>
        </form>
    )
}
