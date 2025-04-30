import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { DoctorProfile } from "./doctor-profile"
import type { TimeSlot } from "@/components/time-slot-picker"

// Mock function to simulate fetching doctor data from an API
async function getDoctorById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data
  const doctors = [
    {
      id: "1",
      name: "Dr. Ahmed Benali",
      specialty: "Cardiologist",
      photo: "/placeholder.svg?height=300&width=400",
      clinicName: "Heart Care Clinic",
      address: "123 Medical St, Algiers",
      phone: "+213 555 123 456",
      experience: 15,
      fee: "3000 DZD",
      rating: 97,
      reviews: 2400,
      about:
        "Dr. Ahmed Benali is a board-certified cardiologist with over 15 years of experience in treating heart conditions. He specializes in preventive cardiology and heart failure management.",
    },
    {
      id: "2",
      name: "Dr. Fatima Zahra",
      specialty: "Dermatologist",
      photo: "/placeholder.svg?height=300&width=400",
      clinicName: "Skin Health Center",
      address: "45 Health Ave, Oran",
      phone: "+213 555 789 012",
      experience: 10,
      fee: "2500 DZD",
      rating: 95,
      reviews: 1800,
      about:
        "Dr. Fatima Zahra is a dermatologist specializing in medical and cosmetic dermatology. She has 10 years of experience treating various skin conditions and performing minimally invasive cosmetic procedures.",
    },
    {
      id: "3",
      name: "Dr. Karim Hadj",
      specialty: "Pediatrician",
      photo: "/placeholder.svg?height=300&width=400",
      clinicName: "Children's Wellness Clinic",
      address: "78 Care Blvd, Constantine",
      phone: "+213 555 345 678",
      experience: 12,
      fee: "2000 DZD",
      rating: 98,
      reviews: 3100,
      about:
        "Dr. Karim Hadj is a pediatrician with 12 years of experience in child healthcare. He specializes in pediatric development and preventive care for children of all ages.",
    },
  ]

  const doctor = doctors.find((doc) => doc.id === id)

  if (!doctor) {
    return null
  }

  return doctor
}

// Mock function to simulate fetching available time slots
async function getAvailableTimeSlots(): Promise<TimeSlot[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Mock data
  return [
    { id: "m1", time: "09:00", period: "morning", available: true },
    { id: "m2", time: "09:30", period: "morning", available: true },
    { id: "m3", time: "10:00", period: "morning", available: false },
    { id: "m4", time: "10:30", period: "morning", available: true },
    { id: "m5", time: "11:00", period: "morning", available: true },
    { id: "m6", time: "11:30", period: "morning", available: false },

    { id: "a1", time: "13:00", period: "afternoon", available: true },
    { id: "a2", time: "13:30", period: "afternoon", available: false },
    { id: "a3", time: "14:00", period: "afternoon", available: true },
    { id: "a4", time: "14:30", period: "afternoon", available: true },
    { id: "a5", time: "15:00", period: "afternoon", available: false },
    { id: "a6", time: "15:30", period: "afternoon", available: true },

    { id: "e1", time: "17:00", period: "evening", available: true },
    { id: "e2", time: "17:30", period: "evening", available: true },
    { id: "e3", time: "18:00", period: "evening", available: false },
    { id: "e4", time: "18:30", period: "evening", available: true },
    { id: "e5", time: "19:00", period: "evening", available: true },
  ]
}

export default async function DoctorPage({
  params,
}: {
  params: { id: string }
}) {
  const doctor = await getDoctorById(params.id)

  if (!doctor) {
    notFound()
  }

  const timeSlots = await getAvailableTimeSlots()

  return (
    <main>
      <Navbar />
      <div className="container py-8">
        <div className="mb-4">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to doctors
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="sticky top-6">
              <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                <Image src={doctor.photo || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
              </div>
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold">{doctor.name}</h1>
                  <p className="text-muted-foreground">{doctor.specialty}</p>
                </div>
                <div>
                  <p className="font-medium">{doctor.clinicName}</p>
                  <p className="text-sm text-muted-foreground">{doctor.address}</p>
                  <p className="text-sm text-muted-foreground">{doctor.phone}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="#booking">
                    <Button className="w-full">Book Clinic Visit</Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    Contact Clinic
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <Suspense fallback={<div>Loading doctor profile...</div>}>
              <DoctorProfile doctor={doctor} timeSlots={timeSlots} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
