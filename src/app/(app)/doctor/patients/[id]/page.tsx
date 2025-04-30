import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Pill } from "lucide-react"
import PatientConsultations from "./patient-consultations"
import { getDoctorPatientById } from "@/actions/doctor/patient.actions"
import { getDoctorPatientAppointments } from "@/actions/doctor/doctor-appointment.actions"

// Server component to fetch patient details and consultations
export default async function PatientDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  // Fetch patient details
  const patient = await getDoctorPatientById(params.id)

  if (!patient) {
    notFound()
  }

  // Fetch patient appointments
  const appointments = await getDoctorPatientAppointments(params.id)

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Patient Details</h1>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                <span className="text-2xl font-medium">
                  {patient.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-1">{patient.name}</h2>
              <p className="text-muted-foreground mb-4">Patient ID: {patient.id}</p>

              <div className="grid grid-cols-2 gap-4 w-full text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Age</p>
                  <p className="font-medium">
                    {new Date().getFullYear() - new Date(patient.birthDate).getFullYear()} years
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Gender</p>
                  <p className="font-medium">{patient.gender}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-muted-foreground">Blood Type</p>
                  <p className="font-medium">{patient.bloodType}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-muted-foreground">Height</p>
                  <p className="font-medium">{patient.height} cm</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-muted-foreground">Weight</p>
                  <p className="font-medium">{patient.weight} kg</p>
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
            <Tabs defaultValue="appointments">
              <TabsList className="mb-4">
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="appointments">
                <Suspense
                  fallback={
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  }
                >
                  <PatientConsultations appointments={appointments} />
                </Suspense>
              </TabsContent>

              <TabsContent value="prescriptions">
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    appointment.prescription && (
                      <Card key={appointment.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Pill className="h-4 w-4" />
                            <h3 className="font-medium">Prescription from {new Date(appointment.date).toLocaleDateString()}</h3>
                          </div>
                          <div className="space-y-2">
                            {appointment.prescription.prescriptionMedication.map((med) => (
                              <div key={med.id} className="text-sm">
                                <p className="font-medium">{med.medication}</p>
                                <p className="text-muted-foreground">Dosage: {med.dosage}</p>
                                <p className="text-muted-foreground">Duration: {med.duration}</p>
                                <p className="text-muted-foreground">Instructions: {med.instructions}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analysis">
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    appointment.Analysis && (
                      <Card key={appointment.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">Analysis from {new Date(appointment.date).toLocaleDateString()}</h3>
                          </div>
                          <div className="space-y-2">
                            {appointment.Analysis.analysisResult.map((result) => (
                              <div key={result.id} className="text-sm">
                                <p className="font-medium">{result.name}</p>
                                <p className="text-muted-foreground">Result: {result.result}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
