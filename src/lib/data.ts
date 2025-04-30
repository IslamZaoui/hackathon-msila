import type { Patient, Appointment, Visit, Prescription } from "./types"

// Mock data functions that would normally fetch from an API or database
export async function getPatientData(): Promise<Patient> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id: "p1",
    name: "John Doe",
    gender: "Male",
    age: 35,
    bloodType: "O+",
    profilePicture: "/placeholder.svg?height=96&width=96",
  }
}

export async function getPatientAppointments(): Promise<Appointment[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return [
    {
      id: "a1",
      doctorName: "Dr. Sarah Johnson",
      dateTime: "2023-05-15T10:30:00",
      status: "accepted",
      clinicName: "City Medical Center",
    },
    {
      id: "a2",
      doctorName: "Dr. Michael Chen",
      dateTime: "2023-05-20T14:00:00",
      status: "pending",
      clinicName: "Wellness Clinic",
    },
    {
      id: "a3",
      doctorName: "Dr. Emily Rodriguez",
      dateTime: "2023-05-10T09:15:00",
      status: "rejected",
      clinicName: "Family Health Practice",
    },
    {
      id: "a4",
      doctorName: "Dr. James Wilson",
      dateTime: "2023-05-25T11:00:00",
      status: "pending",
      clinicName: "Cardiology Specialists",
    },
  ]
}

export async function getPatientVisits(): Promise<Visit[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  return [
    {
      id: "v1",
      doctorName: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      visitDate: "2023-04-10T09:30:00",
      report:
        "Patient presented with symptoms of seasonal allergies. Prescribed antihistamines and advised to avoid known allergens. Follow-up in two weeks if symptoms persist. Blood pressure was normal at 120/80. No other concerns noted during the examination.",
    },
    {
      id: "v2",
      doctorName: "Dr. Robert Thompson",
      specialty: "Cardiology",
      visitDate: "2023-03-15T14:00:00",
      report:
        "Routine cardiac checkup. ECG shows normal sinus rhythm. Blood pressure slightly elevated at 135/85. Recommended continued medication and increased physical activity. Diet modifications discussed. Patient reports occasional chest discomfort after strenuous activity. Scheduled stress test for next visit. Advised to monitor and record any episodes of discomfort.",
    },
    {
      id: "v3",
      doctorName: "Dr. Lisa Martinez",
      specialty: "Dermatology",
      visitDate: "2023-02-20T11:30:00",
      report:
        "Patient consulted for persistent rash on forearms. Appears to be contact dermatitis. Prescribed topical corticosteroid cream to be applied twice daily. Advised to identify and avoid potential allergens. Skin biopsy not deemed necessary at this time. Recommended fragrance-free soaps and detergents. Follow-up in three weeks to assess improvement. Patient was advised to take photos if the condition worsens before the follow-up appointment.",
    },
  ]
}

export async function getPatientPrescriptions(): Promise<Prescription[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  return [
    {
      id: "p1",
      visitDate: "2023-04-10T09:30:00",
      specialty: "General Medicine",
      medications: [
        {
          name: "Loratadine",
          dosage: "10mg",
          duration: "30 days",
          instructions: "Take one tablet daily in the morning",
        },
        {
          name: "Fluticasone Nasal Spray",
          dosage: "50mcg per spray",
          duration: "30 days",
          instructions: "Use 2 sprays in each nostril once daily",
        },
      ],
    },
    {
      id: "p2",
      visitDate: "2023-03-15T14:00:00",
      specialty: "Cardiology",
      medications: [
        {
          name: "Lisinopril",
          dosage: "10mg",
          duration: "90 days",
          instructions: "Take one tablet daily with food",
        },
        {
          name: "Aspirin",
          dosage: "81mg",
          duration: "90 days",
          instructions: "Take one tablet daily with food",
        },
      ],
    },
    {
      id: "p3",
      visitDate: "2023-02-20T11:30:00",
      specialty: "Dermatology",
      medications: [
        {
          name: "Hydrocortisone Cream",
          dosage: "1%",
          duration: "14 days",
          instructions: "Apply a thin layer to affected areas twice daily",
        },
        {
          name: "Cetirizine",
          dosage: "10mg",
          duration: "14 days",
          instructions: "Take one tablet daily at bedtime if itching is severe",
        },
      ],
    },
  ]
}
