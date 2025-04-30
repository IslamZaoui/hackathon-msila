"use client"
import { Navbar } from "@/components/navbar"
import { SearchBar } from "@/components/search-bar"
import { DoctorList } from "@/components/doctor-list"
import { Pagination } from "@/components/pagination"
import type { Doctor } from "@/components/doctor-card"

// Mock function to simulate fetching doctors from an API
async function getDoctors(page = 1): Promise<{
  doctors: Doctor[]
  totalPages: number
  currentPage: number
}> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data
  const mockDoctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Ahmed Benali",
      specialty: "Cardiologist",
      photo: "/placeholder.svg?height=300&width=400",
      clinicName: "Heart Care Clinic",
      address: "123 Medical St, Algiers",
      phone: "+213 555 123 456",
    },
    {
      id: "2",
      name: "Dr. Fatima Zahra",
      specialty: "Dermatologist",
      photo: "/placeholder.svg?height=300&width=400",
      clinicName: "Skin Health Center",
      address: "45 Health Ave, Oran",
      phone: "+213 555 789 012",
    },
    {
      id: "3",
      name: "Dr. Karim Hadj",
      specialty: "Pediatrician",
      photo: "/placeholder.svg?height=300&width=400",
      clinicName: "Children's Wellness Clinic",
      address: "78 Care Blvd, Constantine",
      phone: "+213 555 345 678",
    },
    {
      id: "4",
      name: "Dr. Amina Taleb",
      specialty: "Neurologist",
      photo: "/placeholder.svg?height=300&width=400",
      clinicName: "Brain & Nerve Center",
      address: "90 Medical Center, Annaba",
      phone: "+213 555 901 234",
    },
    {
      id: "5",
      name: "Dr. Youcef Mansouri",
      specialty: "Orthopedic Surgeon",
      photo: "/placeholder.svg?height=300&width=400",
      clinicName: "Bone & Joint Specialists",
      address: "34 Health Park, Blida",
      phone: "+213 555 567 890",
    },
    {
      id: "6",
      name: "Dr. Leila Bouaziz",
      specialty: "Ophthalmologist",
      photo: "/placeholder.svg?height=300&width=400",
      clinicName: "Vision Care Center",
      address: "56 Eye St, Setif",
      phone: "+213 555 234 567",
    },
    {
      id: "7",
      name: "Dr. Rachid Benmoussa",
      specialty: "Dentist",
      photo: "/placeholder.svg?height=300&width=400",
      clinicName: "Smile Dental Clinic",
      address: "12 Tooth Ave, Batna",
      phone: "+213 555 678 901",
    },
    {
      id: "8",
      name: "Dr. Samira Khelifi",
      specialty: "Gynecologist",
      photo: "/placeholder.svg?height=300&width=400",
      clinicName: "Women's Health Center",
      address: "67 Care St, Djelfa",
      phone: "+213 555 890 123",
    },
  ]

  return {
    doctors: mockDoctors,
    totalPages: 3,
    currentPage: page,
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1
  const { doctors, totalPages, currentPage } = await getDoctors(page)

  return (
    <main>
      <Navbar />
      <section className="bg-muted py-16">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Find Trusted Doctors in Algeria</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with the best healthcare professionals across Algeria. Book appointments online and get the care
              you deserve.
            </p>
          </div>
          <SearchBar />
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Available Doctors</h2>
          <DoctorList doctors={doctors} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              // This will be handled by the client component
              // and will update the URL with the new page parameter
              window.location.href = `/?page=${page}`
            }}
          />
        </div>
      </section>
    </main>
  )
}
