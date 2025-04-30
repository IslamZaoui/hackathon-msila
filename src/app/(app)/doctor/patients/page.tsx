import { Suspense } from "react"
import PatientsList from "./patients-list"
import { Loader2 } from "lucide-react"
import { getDoctorPatients } from "@/actions/doctor/patient.actions"

// Types for our patient data
export type Patient = {
    id: string
    name: string
    image: string
    age: number
    gender: "Male" | "Female" | "Other" 
    bloodType: string
}

// Server component to fetch patients
export default async function PatientsPage() {
    // Fetch patients from API
    const patients = await getDoctorPatients()

    return (
        <div className="container py-6">
            <h1 className="text-3xl font-bold mb-6">My Patients</h1>

            <Suspense
                fallback={
                    <div className="flex justify-center">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                }
            >
                <PatientsList patients={patients} />
            </Suspense>
        </div>
    )
}

// Mock function to fetch patients
