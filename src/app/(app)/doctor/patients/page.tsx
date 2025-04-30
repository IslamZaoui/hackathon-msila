import { Suspense } from "react"
import PatientsList from "./patients-list"
import { Loader2 } from "lucide-react"

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
    const patients = await fetchPatients()

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
async function fetchPatients(): Promise<Patient[]> {
    // In a real app, this would be an API call
    return [
        {
            id: "p1",
            name: "John Doe",
            image: "/placeholder.svg?height=80&width=80",
            age: 42,
            gender: "Male",
            bloodType: "O+",
        },
        {
            id: "p2",
            name: "Jane Smith",
            image: "/placeholder.svg?height=80&width=80",
            age: 35,
            gender: "Female",
            bloodType: "A-",
        },
        {
            id: "p3",
            name: "Robert Johnson",
            image: "/placeholder.svg?height=80&width=80",
            age: 58,
            gender: "Male",
            bloodType: "B+",
        },
        {
            id: "p4",
            name: "Emily Davis",
            image: "/placeholder.svg?height=80&width=80",
            age: 29,
            gender: "Female",
            bloodType: "AB+",
        },
        {
            id: "p5",
            name: "Michael Wilson",
            image: "/placeholder.svg?height=80&width=80",
            age: 47,
            gender: "Male",
            bloodType: "O-",
        },
        {
            id: "p6",
            name: "Sarah Brown",
            image: "/placeholder.svg?height=80&width=80",
            age: 31,
            gender: "Female",
            bloodType: "A+",
        },
    ]
}
