import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Pill } from "lucide-react"
import PatientConsultations from "./patient-consultations"
import type { Patient } from "../page"
import type { Consultation } from "../../consultations/page"

// Server component to fetch patient details and consultations
export default async function PatientDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  // Fetch patient details
  const patient = await fetchPatientDetails(params.id)

  if (!patient) {
    notFound()
  }

  // Fetch patient consultations
  const consultations = await fetchPatientConsultations(params.id)

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Patient Details</h1>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Image
                src={patient.image || "/placeholder.svg"}
                alt={patient.name}
                width={120}
                height={120}
                className="rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold mb-1">{patient.name}</h2>
              <p className="text-muted-foreground mb-4">Patient ID: {patient.id}</p>

              <div className="grid grid-cols-2 gap-4 w-full text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Age</p>
                  <p className="font-medium">{patient.age} years</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Gender</p>
                  <p className="font-medium">{patient.gender}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-muted-foreground">Blood Type</p>
                  <p className="font-medium">{patient.bloodType}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="consultations">
              <TabsList className="mb-4">
                <TabsTrigger value="consultations">Consultations</TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              </TabsList>

              <TabsContent value="consultations">
                <Suspense
                  fallback={
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  }
                >
                  <PatientConsultations consultations={consultations} />
                </Suspense>
              </TabsContent>

              <TabsContent value="prescriptions">
                <div className="space-y-4">
                  {consultations.flatMap((consultation) =>
                    consultation.prescriptions.map((prescription) => (
                      <Card key={prescription.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Pill className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <h4 className="font-medium">{prescription.medicationName}</h4>
                              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                <p>
                                  <span className="text-muted-foreground">Dosage:</span> {prescription.dosage}
                                </p>
                                <p>
                                  <span className="text-muted-foreground">Duration:</span> {prescription.duration}
                                </p>
                                <p className="col-span-2">
                                  <span className="text-muted-foreground">Instructions:</span>{" "}
                                  {prescription.instructions}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )),
                  )}

                  {consultations.flatMap((c) => c.prescriptions).length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No prescriptions found.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Mock function to fetch patient details
async function fetchPatientDetails(id: string): Promise<Patient | null> {
  // In a real app, this would be an API call
  const patients = [
    {
      id: "p1",
      name: "John Doe",
      image: "/placeholder.svg?height=120&width=120",
      age: 42,
      gender: "Male",
      bloodType: "O+",
    },
    {
      id: "p2",
      name: "Jane Smith",
      image: "/placeholder.svg?height=120&width=120",
      age: 35,
      gender: "Female",
      bloodType: "A-",
    },
  ]

  return patients.find((p) => p.id === id) || null
}

// Mock function to fetch patient consultations
async function fetchPatientConsultations(patientId: string): Promise<Consultation[]> {
  // In a real app, this would be an API call
  if (patientId === "p1") {
    return [
      {
        id: "c1",
        patientId: "p1",
        report: "Patient presented with symptoms of seasonal allergies. Prescribed antihistamine.",
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
      },
      {
        id: "c2",
        patientId: "p1",
        report: "Follow-up visit. Allergy symptoms have improved. Continue current medication.",
        price: "100",
        prescriptions: [
          {
            id: "rx2",
            medicationName: "Cetirizine",
            duration: "60 days",
            dosage: "10mg",
            instructions: "Take once daily in the morning.",
          },
        ],
      },
    ]
  }

  return []
}
