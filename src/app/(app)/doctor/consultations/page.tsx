import ConsultationForm from "./consultation-form"

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
    searchParams,
}: {
    searchParams: { patientId?: string }
}) {
    // If patientId is provided, fetch existing consultation data
    const patientId = searchParams.patientId
    let consultationData: Consultation | null = null

    if (patientId) {
        consultationData = await fetchConsultationData(patientId)
    }

    return (
        <div className="container py-6">
            <h1 className="text-3xl font-bold mb-6">New Consultation</h1>
            <ConsultationForm initialData={consultationData} />
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
