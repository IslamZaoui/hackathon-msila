"use client"

import type React from "react"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import type { Consultation, Prescription } from "./page"

interface ConsultationFormProps {
    initialData: Consultation | null
}

export default function ConsultationForm({ initialData }: ConsultationFormProps) {
    const [formData, setFormData] = useState<Consultation>(
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real app, you would submit the form data to your API
        console.log("Submitting consultation:", formData)
        // Reset form or redirect
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
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="text"
                                placeholder="Enter consultation price"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Prescriptions</h2>
                    <Button type="button" onClick={handleAddPrescription} variant="outline">
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
                                />
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 text-destructive"
                                onClick={() => handleRemovePrescription(prescription.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex gap-4">
                <Button type="submit">Save Consultation</Button>
                <Button type="button" variant="outline">
                    Cancel
                </Button>
            </div>
        </form>
    )
}
