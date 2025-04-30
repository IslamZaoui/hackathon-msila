import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { DoctorProfile } from "./doctor-profile"
import { getDoctorById } from "@/actions/doctor/user.actions"
import type { DoctorUser } from "@/actions/auth.action"

export default async function DoctorPage({
  params,
}: {
  params: { id: string }
}) {
  const doctor = await getDoctorById(params.id)

  if (!doctor) {
    notFound()
  }

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
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <span className="text-6xl font-medium">
                    {doctor.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold">{doctor.name}</h1>
                  <p className="text-muted-foreground">{doctor.specialization}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{doctor.country}</p>
                  <p className="text-sm text-muted-foreground">{doctor.phone}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href="#booking">
                    <Button className="w-full">Book Appointment</Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    Contact Doctor
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <Suspense fallback={<div>Loading doctor profile...</div>}>
              <DoctorProfile doctor={doctor} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
