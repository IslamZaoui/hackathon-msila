"use client"

import * as React from "react"
import { Suspense, useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Pill, Sparkles } from "lucide-react"
import PatientConsultations from "./patient-consultations"
import { getDoctorPatientById } from "@/actions/doctor/patient.actions"
import { getDoctorPatientAppointments } from "@/actions/doctor/doctor-appointment.actions"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { analysisPatientRecord } from "@/actions/doctor/patient-record-analysis.actions"
import { Textarea } from "@/components/ui/textarea"
import prisma from "@/lib/prisma"
import { AppointmentStatus } from "@prisma/client"

interface Medication {
  id: string
  medication: string
  dosage: string
  duration: string
  instructions: string
}

interface AnalysisResult {
  id: string
  name: string
  result: string
}

interface Prescription {
  id: string
  prescriptionMedication: Medication[]
}

interface Analysis {
  id: string
  analysisResult: AnalysisResult[]
}

interface Appointment {
  id: string
  createdAt: Date
  updatedAt: Date
  patientId: string
  doctorId: string
  date: Date
  status: AppointmentStatus
  price: number | null
  description: string | null
  prescription: Prescription | null
  Analysis: Analysis | null
}

interface PatientDetailsPageProps {
  params: Promise<{ id: string }>
}

export default function PatientDetailsPage({ params }: PatientDetailsPageProps) {
  const resolvedParams = React.use(params)
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [patient, setPatient] = useState<any>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  // Fetch data on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientData, appointmentsData] = await Promise.all([
          getDoctorPatientById(resolvedParams.id),
          getDoctorPatientAppointments(resolvedParams.id)
        ])
        
        if (!patientData) {
          notFound()
        }
        
        setPatient(patientData)
        setAppointments(appointmentsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    
    fetchData()
  }, [resolvedParams.id])

  const handleAnalysis = async () => {
    setIsLoading(true)
    try {
      const result = await analysisPatientRecord(resolvedParams.id, question)
      setResponse(result)
    } catch (error) {
      console.error("Error analyzing patient record:", error)
      setResponse("An error occurred while analyzing the patient record.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseDialog = () => {
    if (!isLoading) {
      setIsOpen(false)
      setQuestion("")
      setResponse("")
    }
  }

  if (!patient) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="w-full flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Patient Details</h1>
        <Button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Ask AI
        </Button>
      </div>

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
                            {appointment.prescription.prescriptionMedication.map((med: Medication) => (
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
                            {appointment.Analysis.analysisResult.map((result: AnalysisResult) => (
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

      <AlertDialog open={isOpen} onOpenChange={(open) => {
        if (!open && !isLoading) {
          handleCloseDialog()
        }
      }}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>AI Patient Analysis</AlertDialogTitle>
            <AlertDialogDescription>
              Ask any question about the patient's medical history, prescriptions, or analysis results.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Enter your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px]"
            />
            
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Analyzing...</span>
              </div>
            ) : response ? (
              <div className="rounded-lg bg-muted p-4">
                <h4 className="font-medium mb-2">AI Response:</h4>
                <p className="text-sm whitespace-pre-wrap">{response}</p>
              </div>
            ) : null}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Close</AlertDialogCancel>
            <Button 
              onClick={handleAnalysis}
              disabled={!question.trim() || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
