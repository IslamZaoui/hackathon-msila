export interface Patient {
  id: string
  name: string
  gender: string
  age: number
  bloodType: string
  profilePicture: string
}

export interface Appointment {
  id: string
  doctorName: string
  dateTime: string
  status: "pending" | "accepted" | "rejected"
  clinicName: string
}

export interface Visit {
  id: string
  doctorName: string
  specialty: string
  visitDate: string
  report: string
}

export interface Medication {
  name: string
  dosage: string
  duration: string
  instructions: string
}

export interface Prescription {
  id: string
  visitDate: string
  specialty: string
  medications: Medication[]
}
