import { DoctorCard, type Doctor } from "@/components/doctor-card"

interface DoctorListProps {
  doctors: Doctor[]
}

export function DoctorList({ doctors }: DoctorListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  )
}
