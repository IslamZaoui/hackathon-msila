import { Navbar } from "@/components/navbar"
import { SearchBar } from "@/components/search-bar"
import { DoctorList } from "@/components/doctor-list"
import { getAllDoctors } from "@/actions/doctor/user.actions"
import type { DoctorUser } from "@/actions/auth.action"

export default async function Home() {
  const doctors = await getAllDoctors() as DoctorUser[]

  return (
    <main>
      <Navbar />
      <section className="bg-muted py-16">
        <div className="">
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
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">Available Doctors</h2>
          <DoctorList doctors={doctors} />
        </div>
      </section>
    </main>
  )
}
