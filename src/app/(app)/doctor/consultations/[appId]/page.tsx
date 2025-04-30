import { redirect } from "next/navigation"
import ConsultationForm from "./consultation-form"
import { getDoctorAppointments } from "@/actions/doctor/doctor-appointment.actions"

// Types for our consultation data
export type Consultation = {
    id?: string
    patientId?: string
    report: string
    price: string
    prescriptions: Prescription[]
}

export type Prescription = {
    id: string
    medicationName: string
    duration: string
    dosage: string
    instructions: string
}

// Server component to fetch consultation data if needed
export default async function ConsultationsPage({
    params,
}: {
    params: { appId: string }
}) {
    // Get all appointments to validate the ID
    const appointments = await getDoctorAppointments()
    const appointment = appointments.find(a => a.id === params.appId)

    // If appointment not found or not pending, redirect to appointments page
    if (!appointment || appointment.status !== "pending") {
        redirect("/doctor/appointments")
    }

    return (
        <div className="container py-6">
            <h1 className="text-3xl font-bold mb-6">New Consultation</h1>
            <ConsultationForm 
                appointmentId={params.appId}
                initialData={{
                    report: "",
                    price: "",
                    prescriptions: []
                }}
            />
        </div>
    )
}

// Mock function to fetch consultation data
async function fetchConsultationData(patientId: string): Promise<Consultation | null> {
    // In a real app, this would be an API call
    // For demo purposes, return null or mock data
    if (patientId === "p1") {
        return {
            id: "c1",
            patientId: "p1",
            report: "Patient presented with symptoms of seasonal allergies.",
            price: "150",
            prescriptions: [
                {
                    id: "rx1",
                    medicationName: "Cetirizine",
                    duration: "30 days",
                    dosage: "10mg",
                    instructions: "Take once daily in the morning.",
                },
            ],
        }
    }

    return null
}
